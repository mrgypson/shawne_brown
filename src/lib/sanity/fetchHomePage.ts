import type { HomePageContent } from '../../types/homePage';
import { getSanityQueryClient } from './client';
import { mapSanityHomePage, type SanityHomePageDoc } from './mapSanityHomePage';
import { homePageQuery } from './queries';

export async function fetchHomePageFromSanity(options?: { preview?: boolean }): Promise<HomePageContent> {
	const preview = options?.preview ?? false;
	const client = getSanityQueryClient({ preview });
	const doc = await client.fetch<SanityHomePageDoc | null>(homePageQuery);
	return mapSanityHomePage(doc);
}
