/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly SANITY_PROJECT_ID?: string;
	readonly SANITY_DATASET?: string;
	readonly SANITY_API_VERSION?: string;
	/** Optional; use for private datasets or draft perspective. */
	readonly SANITY_READ_TOKEN?: string;
	/** Set to `false` so build-time fetches bypass the Sanity CDN. */
	readonly SANITY_USE_CDN?: string;
	/** Legacy manual preview: must match query `secret` on `/api/preview/enable`. */
	readonly SANITY_PREVIEW_SECRET?: string;
	/** Set to `true` to use local mock projects (no Sanity request). */
	readonly SANITY_USE_MOCK?: string;
	/** Resend API key (server-only). Inquiry emails are sent to `aboutPage.contact.email` from Sanity. */
	readonly RESEND_API_KEY?: string;
	/** Verified sender, e.g. `Studio Team <mail@yourdomain.com>`. */
	readonly RESEND_FROM_EMAIL?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare namespace App {
	interface Locals {
		/** True after a successful `/api/preview/enable` (cookie set). */
		sanityPreview?: boolean;
		/**
		 * In a preview session: use Content Lake `previewDrafts` for GROQ (`true`), or `published` when
		 * Presentation sets `sanity-preview-perspective=published` (`false`).
		 */
		sanityDraftPerspective?: boolean;
	}
}
