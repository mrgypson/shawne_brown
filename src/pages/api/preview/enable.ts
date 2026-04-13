import { validatePreviewUrl } from '@sanity/preview-url-secret';
import type { APIRoute } from 'astro';
import { getSanityClient } from '../../../lib/sanity/client';

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

	if (!import.meta.env.SANITY_READ_TOKEN) {
		return new Response('Configure SANITY_READ_TOKEN for Presentation preview.', { status: 500 });
	}

	const result = await validatePreviewUrl(getSanityClient(), url.toString());
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
