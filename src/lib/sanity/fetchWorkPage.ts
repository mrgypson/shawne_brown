import type { WorkPageContent } from '../../types/workPage';
import { getSanityQueryClient } from './client';
import { mapSanityWorkPage, type SanityWorkPageDoc } from './mapSanityWorkPage';
import { workPageQuery } from './queries';

export async function fetchWorkPageFromSanity(options?: { preview?: boolean }): Promise<WorkPageContent> {
	const preview = options?.preview ?? false;
	const client = getSanityQueryClient({ preview });
	const doc = await client.fetch<SanityWorkPageDoc | null>(workPageQuery);
	return mapSanityWorkPage(doc);
}
