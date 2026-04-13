import type { AboutContent } from '../../types/about';
import { getSanityQueryClient } from './client';
import { mapSanityAbout, type SanityAboutDoc } from './mapSanityAbout';
import { aboutPageQuery } from './queries';

export async function fetchAboutFromSanity(options?: { preview?: boolean }): Promise<AboutContent> {
	const preview = options?.preview ?? false;
	const client = getSanityQueryClient({ preview });
	const doc = await client.fetch<SanityAboutDoc | null>(aboutPageQuery);
	if (!doc) {
		throw new Error('No aboutPage document found (expected id "aboutPage")');
	}
	return mapSanityAbout(doc);
}
