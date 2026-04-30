import { defineCliConfig } from 'sanity/cli';

/**
 * Hosted Studio URL: https://<studioHost>.sanity.studio
 * Must be lowercase (a–z, 0–9, hyphens). Uppercase crashes the deploy prompt in some CLI versions.
 */
export default defineCliConfig({
	api: {
		projectId: process.env.SANITY_PROJECT_ID ?? 'yrca4rxr',
		dataset: process.env.SANITY_DATASET ?? 'production',
	},
	studioHost: process.env.SANITY_STUDIO_HOST ?? 'shawne-brown',
	deployment: {
		appId: 'ror8i9k79ost1e2xhgg4sfps',
	},
});
