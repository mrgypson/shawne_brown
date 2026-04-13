import { validatePreviewUrl } from '@sanity/preview-url-secret';
import type { APIRoute } from 'astro';
import { getSanityClient, getSanityReadToken } from '../../../lib/sanity/client';

export const prerender = false;

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
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
		return new Response('Configure SANITY_READ_TOKEN for Presentation preview.', { status: 500 });
	}

	let result;
	try {
		result = await validatePreviewUrl(getSanityClient(), url.toString());
	} catch (err: unknown) {
		const msg = err instanceof Error ? err.message : String(err);
		const status =
			err && typeof err === 'object' && 'response' in err
				? (err as { response?: { statusCode?: number } }).response?.statusCode
				: undefined;
		const isUnauthorized =
			status === 401 ||
			msg.includes('401') ||
			msg.includes('Unauthorized') ||
			msg.includes('Session not found');
		if (isUnauthorized) {
			return new Response(
				'Sanity rejected this API token (401). Create a token under this project: Sanity Manage → Project (Brown) → API → Tokens → Viewer (or Editor). Do not use organization-only deploy tokens. Match SANITY_PROJECT_ID=yrca4rxr and SANITY_DATASET=production in .env if you override them.',
				{ status: 502, headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
			);
		}
		throw err;
	}

	if (!result.isValid) {
		return new Response('Invalid preview URL', { status: 401 });
	}

	cookies.set('sanity-preview', '1', {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		maxAge: 60 * 60 * 8,
		secure: import.meta.env.PROD,
	});

	return redirect(result.redirectTo ?? '/');
};
