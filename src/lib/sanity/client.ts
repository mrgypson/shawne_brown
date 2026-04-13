import { createClient, type SanityClient } from '@sanity/client';
import {
	SANITY_API_VERSION_DEFAULT,
	SANITY_DATASET_DEFAULT,
	SANITY_PROJECT_ID_DEFAULT,
} from './constants';

function getProjectId(): string {
	return import.meta.env.SANITY_PROJECT_ID ?? SANITY_PROJECT_ID_DEFAULT;
}

function getDataset(): string {
	return import.meta.env.SANITY_DATASET ?? SANITY_DATASET_DEFAULT;
}

function getApiVersion(): string {
	return import.meta.env.SANITY_API_VERSION ?? SANITY_API_VERSION_DEFAULT;
}

function useCdn(): boolean {
	return import.meta.env.SANITY_USE_CDN !== 'false';
}

/**
 * Sanity read token from `.env`. Vite loads `SANITY_READ_TOKEN` into `process.env` but does not
 * expose non-`PUBLIC_` / non-`VITE_` keys on `import.meta.env`, so prefer `process.env` on the server.
 */
export function getSanityReadToken(): string | undefined {
	const raw =
		(typeof process !== 'undefined' && process.env.SANITY_READ_TOKEN) ||
		import.meta.env.SANITY_READ_TOKEN;
	const trimmed = typeof raw === 'string' ? raw.trim() : '';
	return trimmed || undefined;
}

let client: SanityClient | null = null;
let clientTokenCache: string | undefined;

export function getSanityClient(): SanityClient {
	const token = getSanityReadToken();
	if (!client || clientTokenCache !== token) {
		clientTokenCache = token;
		client = createClient({
			projectId: getProjectId(),
			dataset: getDataset(),
			apiVersion: getApiVersion(),
			useCdn: useCdn(),
			...(token ? { token } : {}),
		});
	}
	return client;
}

/**
 * Published CDN/API client (default). For draft overlay, use {@link getSanityQueryClient} with `preview: true`.
 */
export function getSanityQueryClient(options: { preview: boolean }): SanityClient {
	if (!options.preview) {
		return getSanityClient();
	}
	const token = getSanityReadToken();
	if (!token) {
		throw new Error('SANITY_READ_TOKEN is required for draft preview');
	}
	return createClient({
		projectId: getProjectId(),
		dataset: getDataset(),
		apiVersion: getApiVersion(),
		useCdn: false,
		token,
		perspective: 'previewDrafts',
	});
}

export function getSanityProjectDetails(): { projectId: string; dataset: string } {
	return { projectId: getProjectId(), dataset: getDataset() };
}
