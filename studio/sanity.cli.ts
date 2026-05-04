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
	studioHost: process.env.SANITY_STUDIO_HOST ?? 'photography-site',
	/**
	 * Hosted Studio app id (printed by `sanity deploy` after first successful deploy).
	 *
	 * Important: this value is tied to a specific hosted Studio deployment. If you deploy this
	 * same `studio/` package to a different Sanity project, update/remove this `appId` or deploys
	 * can fail with “Cannot find app…”.
	 *
	 * Shawne / Brown only: paired with defaults above (`yrca4rxr`, `photography-site`). Do not
	 * reuse for project `1ogerp1o` or `hbmuir-studio` — that Studio is deployed from the hbmuir repo.
	 */
	deployment: {
		appId: 'j4rddzzt1pkbnu1joorgyl2u',
	},
});
