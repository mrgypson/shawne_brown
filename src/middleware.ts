import { defineMiddleware } from 'astro:middleware';

/**
 * Preview mode is enabled by `/api/preview/enable` (Presentation or legacy secret).
 * Draft fetches still require `SANITY_READ_TOKEN` on the server.
 */
export const onRequest = defineMiddleware(async (context, next) => {
	const cookieOk = context.cookies.get('sanity-preview')?.value === '1';
	context.locals.sanityPreview = cookieOk;
	return next();
});
