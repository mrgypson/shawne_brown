import { validatePreviewUrl } from '@sanity/preview-url-secret';
import type { APIRoute } from 'astro';
import { getSanityClient, getSanityReadToken } from '../../../lib/sanity/client';

export const prerender = false;

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
		msg.includes('401') ||
		msg.includes('Unauthorized') ||
		msg.includes('Session not found')
	);
}

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
	try {
		const legacySecret = import.meta.env.SANITY_PREVIEW_SECRET;
		const legacyToken = url.searchParams.get('secret');
		const redirectTo = url.searchParams.get('redirect') ?? '/';

		if (legacySecret && legacyToken === legacySecret) {
			cookies.set('sanity-preview', '1', {
				path: '/',
				httpOnly: true,
				sameSite: 'lax',
				maxAge: 60 * 60 * 8,
				secure: import.meta.env.PROD,
			});
			return redirect(redirectTo);
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
					'Sanity rejected this API token (401). Create a token under this project: Sanity Manage → Project (Brown) → API → Tokens → Viewer (or Editor). Do not use organization-only deploy tokens. Match SANITY_PROJECT_ID=yrca4rxr and SANITY_DATASET=production in .env if you override them.',
					{ status: 502, headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
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

		cookies.set('sanity-preview', '1', {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			maxAge: 60 * 60 * 8,
			secure: import.meta.env.PROD,
		});

		return redirect(result.redirectTo ?? '/');
	} catch (err: unknown) {
		const detail = err instanceof Error ? err.message : String(err);
		return new Response(`Preview enable failed: ${detail}`, {
			status: 500,
			headers: { 'Content-Type': 'text/plain; charset=utf-8' },
		});
	}
};
