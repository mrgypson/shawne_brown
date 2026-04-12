import { aboutContent } from '../data/mock/about';
import { mockProjects } from '../data/mock/projects';
import type { AboutContent } from '../types/about';
import type { Project } from '../types/project';
import { fetchProjectsFromSanity } from './sanity/fetchProjects';

/**
 * All projects (order = display order on Work index).
 * Uses Sanity when configured; set `SANITY_USE_MOCK=true` to force mock data.
 */
export async function getProjects(): Promise<Project[]> {
	if (import.meta.env.SANITY_USE_MOCK === 'true') {
		return mockProjects;
	}
	try {
		return await fetchProjectsFromSanity();
	} catch (err) {
		console.warn('[content] Sanity fetch failed; using mock projects.', err);
		return mockProjects;
	}
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
	const projects = await getProjects();
	return projects.find((p) => p.slug === slug);
}

export function getAbout(): AboutContent {
	return aboutContent;
}
