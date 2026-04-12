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

let client: SanityClient | null = null;

export function getSanityClient(): SanityClient {
	if (!client) {
		const token = import.meta.env.SANITY_READ_TOKEN;
		client = createClient({
			projectId: getProjectId(),
			dataset: getDataset(),
			apiVersion: getApiVersion(),
			useCdn: true,
			...(token ? { token } : {}),
		});
	}
	return client;
}

export function getSanityProjectDetails(): { projectId: string; dataset: string } {
	return { projectId: getProjectId(), dataset: getDataset() };
}
