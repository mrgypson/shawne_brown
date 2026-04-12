import { defineCliConfig } from 'sanity/cli';

/**
 * Hosted Studio URL: https://<studioHost>.sanity.studio
 * Must be lowercase (a–z, 0–9, hyphens). Uppercase crashes the deploy prompt in some CLI versions.
 */
export default defineCliConfig({
	api: {
		projectId: 'yrca4rxr',
		dataset: 'production',
	},
	studioHost: 'shawne-brown',
});
