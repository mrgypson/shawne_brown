import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import { PLACEHOLDER_IMAGE_SRC } from './constants';
import { getSanityProjectDetails } from './client';

const builder = createImageUrlBuilder(getSanityProjectDetails());

/** Work index / home: smaller cover thumbs. */
export const SANITY_IMAGE_MAX_WIDTH_COVER = 960;
/** Project gallery: full column width on large screens. */
export const SANITY_IMAGE_MAX_WIDTH_GALLERY = 2400;

export type UrlForImageOptions = {
	/** Max width in pixels (Sanity CDN resize). */
	maxWidth?: number;
};

/**
 * Builds a CDN URL for a Sanity image field, or the local placeholder.
 */
export function urlForImage(
	source: SanityImageSource | null | undefined,
	options?: UrlForImageOptions,
): string {
	if (!source || typeof source !== 'object' || !('asset' in source) || !source.asset) {
		return PLACEHOLDER_IMAGE_SRC;
	}
	const w = options?.maxWidth ?? SANITY_IMAGE_MAX_WIDTH_GALLERY;
	return builder.image(source).width(w).quality(85).auto('format').url();
}
