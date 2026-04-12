import type { AboutContent } from '../../types/about';
import { getSanityClient } from './client';
import { mapSanityAbout, type SanityAboutDoc } from './mapSanityAbout';
import { aboutPageQuery } from './queries';

export async function fetchAboutFromSanity(): Promise<AboutContent> {
	const client = getSanityClient();
	const doc = await client.fetch<SanityAboutDoc | null>(aboutPageQuery);
	if (!doc) {
		throw new Error('No aboutPage document found (expected id "aboutPage")');
	}
	return mapSanityAbout(doc);
}
