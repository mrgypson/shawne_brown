import { validatePreviewUrl } from '@sanity/preview-url-secret';
import { urlSearchParamPreviewSecret } from '@sanity/preview-url-secret/constants';
import type { APIRoute } from 'astro';
import { getSanityClient, getSanityReadToken } from '../../../lib/sanity/client';

export const prerender = false;

/** Hosted Studio (`*.sanity.studio`) embeds the site in a cross-site iframe; `Lax` drops the session there. */
function previewSessionCookieOptions() {
	if (import.meta.env.PROD) {
		return {
			path: '/' as const,
			httpOnly: true,
			sameSite: 'none' as const,
			secure: true,
			maxAge: 60 * 60 * 8,
		};
	}
	return {
		path: '/' as const,
		httpOnly: true,
		sameSite: 'lax' as const,
		secure: false,
		maxAge: 60 * 60 * 8,
	};
}

function getSanityHttpStatus(err: unknown): number | undefined {
	if (!err || typeof err !== 'object') return undefined;
	const e = err as Record<string, unknown>;
	if (typeof e.statusCode === 'number') return e.statusCode;
	const res = e.response as { statusCode?: number } | undefined;
	if (res && typeof res.statusCode === 'number') return res.statusCode;
	return undefined;
}

function isUnauthorizedError(err: unknown): boolean {
	const status = getSanityHttpStatus(err);
	const msg = err instanceof Error ? err.message : String(err);
	return (
		status === 401 ||
		status === 403 ||
		msg.includes('401') ||
		msg.includes('403') ||
		msg.includes('Unauthorized') ||
		msg.includes('Forbidden') ||
		msg.includes('Session not found')
	);
}

/**
 * Sanity returns a path + search + hash. Keep it on the current origin.
 * `redirectTo` can be "" — `??` would not fall back, so coerce empty to `/`.
 */
function normalizeRedirectTarget(requestUrl: URL, redirectTo: string | undefined): string {
	const raw = redirectTo?.trim() ? redirectTo : '/';
	try {
		const resolved = new URL(raw, requestUrl.origin);
		if (resolved.origin !== requestUrl.origin) {
			return '/';
		}
		return `${resolved.pathname}${resolved.search}${resolved.hash}` || '/';
	} catch {
		return '/';
	}
}

/** Absolute URL for `Location` (Presentation iframe + some proxies handle this more reliably than path-only). */
function absoluteRedirectUrl(requestUrl: URL, redirectTo: string | undefined): string {
	const path = normalizeRedirectTarget(requestUrl, redirectTo);
	return new URL(path, requestUrl.origin).href;
}

/**
 * Vercel + Astro can throw or drop cookies when mixing `cookies.set()` with `Response.redirect()`.
 * One `Set-Cookie` line is enough for the preview session flag.
 */
function previewSessionSetCookieHeader(): string {
	const o = previewSessionCookieOptions();
	const same = o.sameSite === 'none' ? 'None' : 'Lax';
	const parts = [`sanity-preview=1`, `Path=${o.path}`, `HttpOnly`, `Max-Age=${o.maxAge}`, `SameSite=${same}`];
	if (o.secure) parts.push('Secure');
	return parts.join('; ');
}

function redirectWithPreviewCookie(requestUrl: URL, redirectTo: string | undefined): Response {
	const headers = new Headers();
	headers.set('Location', absoluteRedirectUrl(requestUrl, redirectTo));
	headers.append('Set-Cookie', previewSessionSetCookieHeader());
	return new Response(null, { status: 302, headers });
}

export const GET: APIRoute = async ({ url }) => {
	try {
		const legacySecret = import.meta.env.SANITY_PREVIEW_SECRET;
		const legacyToken = url.searchParams.get('secret');
		const redirectTo = url.searchParams.get('redirect') ?? '/';
		const legacyOk = Boolean(legacySecret && legacyToken === legacySecret);
		const hasStudioPreviewSecret = url.searchParams.has(urlSearchParamPreviewSecret);

		/** Opening this path in the iframe without Studio-issued params usually means preview URL was mis-set to this API path instead of the site origin. */
		if (!legacyOk && !hasStudioPreviewSecret && !legacyToken) {
			return new Response(
				[
					'Missing preview credentials on this URL.',
					'',
					'Fix: set SANITY_STUDIO_PREVIEW_URL to your Astro site origin (e.g. https://portfolio.example), not /api/preview/enable.',
					'Sanity Presentation will call this route with a sanity-preview-secret query param automatically.',
				].join('\n'),
				{
					status: 400,
					headers: { 'Content-Type': 'text/plain; charset=utf-8' },
				},
			);
		}

		if (legacySecret && legacyToken === legacySecret) {
			return redirectWithPreviewCookie(url, redirectTo);
		}

		if (!getSanityReadToken()) {
			return new Response('Configure SANITY_READ_TOKEN for Presentation preview.', {
				status: 503,
				headers: { 'Content-Type': 'text/plain; charset=utf-8' },
			});
		}

		let result;
		try {
			result = await validatePreviewUrl(getSanityClient(), url.toString());
		} catch (err: unknown) {
			if (isUnauthorizedError(err)) {
				return new Response(
					'Sanity rejected this API token (401/403). Use a Viewer or Editor token for the configured SANITY_PROJECT_ID and SANITY_DATASET in SANITY_READ_TOKEN. Deploy tokens or tokens for another project will fail.',
					{ status: 502, headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
				);
			}
			const status = getSanityHttpStatus(err);
			if (status !== undefined && status >= 500) {
				return new Response(
					`Sanity API error (${status}) while validating the preview secret. Retry in a moment; if it persists, check status.sanity.io and your network.`,
					{ status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
				);
			}
			const detail = err instanceof Error ? err.message : String(err);
			return new Response(`Preview enable failed: ${detail}`, {
				status: 500,
				headers: { 'Content-Type': 'text/plain; charset=utf-8' },
			});
		}

		if (!result.isValid) {
			return new Response(
				'Invalid or expired preview URL. Close Presentation and reopen it, or publish from Studio and try again.',
				{ status: 401, headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
			);
		}

		return redirectWithPreviewCookie(url, result.redirectTo);
	} catch (err: unknown) {
		const detail = err instanceof Error ? err.message : String(err);
		return new Response(`Preview enable failed: ${detail}`, {
			status: 500,
			headers: { 'Content-Type': 'text/plain; charset=utf-8' },
		});
	}
};
