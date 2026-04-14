import { defineMiddleware } from 'astro:middleware';
import { shouldUseDraftPerspective } from './lib/sanity/previewPerspective';

/**
 * Preview mode is enabled by `/api/preview/enable` (Presentation or legacy secret).
 * Draft fetches still require `SANITY_READ_TOKEN` on the server.
 * Presentation's published/draft toggle sets `sanity-preview-perspective` on the iframe URL.
 */
export const onRequest = defineMiddleware(async (context, next) => {
	const cookieOk = context.cookies.get('sanity-preview')?.value === '1';
	context.locals.sanityPreview = cookieOk;
	context.locals.sanityDraftPerspective = shouldUseDraftPerspective(
		cookieOk,
		context.url,
		context.cookies,
	);
	return next();
});
