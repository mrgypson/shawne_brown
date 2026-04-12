import type { Project } from '../../types/project';
import { getSanityClient } from './client';
import { mapSanityProject } from './mapSanityProject';
import { projectsQuery } from './queries';
import type { SanityProjectDoc } from './mapSanityProject';

export async function fetchProjectsFromSanity(): Promise<Project[]> {
	const client = getSanityClient();
	const docs = await client.fetch<SanityProjectDoc[]>(projectsQuery);
	return docs.map(mapSanityProject);
}
