import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import { PLACEHOLDER_IMAGE_SRC } from './constants';
import { getSanityProjectDetails } from './client';

const builder = createImageUrlBuilder(getSanityProjectDetails());

/**
 * Builds a CDN URL for a Sanity image field, or the local placeholder.
 */
export function urlForImage(source: SanityImageSource | null | undefined): string {
	if (!source || typeof source !== 'object' || !('asset' in source) || !source.asset) {
		return PLACEHOLDER_IMAGE_SRC;
	}
	return builder.image(source).width(2400).quality(85).auto('format').url();
}
