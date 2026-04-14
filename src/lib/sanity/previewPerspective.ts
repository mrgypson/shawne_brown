import {
	perspectiveCookieName,
	urlSearchParamPreviewPerspective,
} from '@sanity/preview-url-secret/constants';
import type { AstroCookies } from 'astro';

/**
 * When Presentation's preview session is active, the iframe URL includes
 * `sanity-preview-perspective=published` or draft-style values. Server fetches must
 * respect that toggle; otherwise "published" still shows draft content.
 */
export function shouldUseDraftPerspective(
	previewSessionActive: boolean,
	url: URL,
	cookies: AstroCookies,
): boolean {
	if (!previewSessionActive) return false;
	const raw =
		url.searchParams.get(urlSearchParamPreviewPerspective) ??
		cookies.get(perspectiveCookieName)?.value ??
		'';
	const v = raw.trim().toLowerCase();
	if (v === 'published') return false;
	return true;
}
