import type { SiteSettings } from '../../types/siteSettings';
import { getSanityQueryClient } from './client';
import { mapSanitySiteSettings, type SanitySiteSettingsDoc } from './mapSanitySiteSettings';
import { siteSettingsQuery } from './queries';

export async function fetchSiteSettingsFromSanity(options?: {
	preview?: boolean;
}): Promise<SiteSettings> {
	const preview = options?.preview ?? false;
	const client = getSanityQueryClient({ preview });
	const doc = await client.fetch<SanitySiteSettingsDoc | null>(siteSettingsQuery);
	return mapSanitySiteSettings(doc);
}
