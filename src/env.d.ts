/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly SANITY_PROJECT_ID?: string;
	readonly SANITY_DATASET?: string;
	readonly SANITY_API_VERSION?: string;
	/** Optional; use for private datasets or draft perspective. */
	readonly SANITY_READ_TOKEN?: string;
	/** Set to `true` to use local mock projects (no Sanity request). */
	readonly SANITY_USE_MOCK?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
