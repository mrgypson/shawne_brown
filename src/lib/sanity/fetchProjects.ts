import type { Project } from '../../types/project';
import { getSanityQueryClient } from './client';
import { mapSanityProject } from './mapSanityProject';
import { projectBySlugQuery, projectsQuery } from './queries';
import type { SanityProjectDoc } from './mapSanityProject';

export async function fetchProjectsFromSanity(options?: { preview?: boolean }): Promise<Project[]> {
	const preview = options?.preview ?? false;
	const client = getSanityQueryClient({ preview });
	const docs = await client.fetch<SanityProjectDoc[]>(projectsQuery);
	return docs.map(mapSanityProject);
}

export async function fetchProjectBySlugFromSanity(
	slug: string,
	options: { preview: boolean },
): Promise<Project | undefined> {
	const client = getSanityQueryClient({ preview: options.preview });
	const doc = await client.fetch<SanityProjectDoc | null>(projectBySlugQuery, { slug });
	if (!doc) {
		return undefined;
	}
	return mapSanityProject(doc);
}
