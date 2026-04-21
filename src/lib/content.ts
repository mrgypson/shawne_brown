import { aboutContent } from '../data/mock/about';
import { mockProjects } from '../data/mock/projects';
import { workPageContent } from '../data/mock/workPage';
import type { AboutContent } from '../types/about';
import type { Project } from '../types/project';
import type { WorkPageContent } from '../types/workPage';
import { fetchAboutFromSanity } from './sanity/fetchAbout';
import { fetchProjectBySlugFromSanity, fetchProjectsFromSanity } from './sanity/fetchProjects';
import { fetchWorkPageFromSanity } from './sanity/fetchWorkPage';

export type ContentFetchOptions = {
	/** When true, uses preview API perspective (drafts). Requires `SANITY_READ_TOKEN`. */
	preview?: boolean;
};

/**
 * All projects (order = display order on Work index).
 * Uses Sanity when configured; set `SANITY_USE_MOCK=true` to force mock data.
 */
export async function getProjects(options?: ContentFetchOptions): Promise<Project[]> {
	if (import.meta.env.SANITY_USE_MOCK === 'true') {
		return mockProjects;
	}
	try {
		return await fetchProjectsFromSanity({ preview: options?.preview });
	} catch (err) {
		console.warn('[content] Sanity fetch failed; using mock projects.', err);
		return mockProjects;
	}
}

export async function getProjectBySlug(slug: string, options?: ContentFetchOptions): Promise<Project | undefined> {
	if (import.meta.env.SANITY_USE_MOCK === 'true') {
		return mockProjects.find((p) => p.slug === slug);
	}
	const preview = options?.preview ?? false;
	try {
		return await fetchProjectBySlugFromSanity(slug, { preview });
	} catch (err) {
		console.warn('[content] Sanity fetch failed for project slug.', err);
		return mockProjects.find((p) => p.slug === slug);
	}
}

/**
 * About + contact copy. Uses Sanity when configured; set `SANITY_USE_MOCK=true` to force mock data.
 */
export async function getAbout(options?: ContentFetchOptions): Promise<AboutContent> {
	if (import.meta.env.SANITY_USE_MOCK === 'true') {
		return aboutContent;
	}
	try {
		return await fetchAboutFromSanity({ preview: options?.preview });
	} catch (err) {
		console.warn('[content] Sanity fetch failed; using mock about.', err);
		return aboutContent;
	}
}

/**
 * Work page singleton (title + subheading, each optional with show/hide toggles).
 * Uses Sanity when configured; set `SANITY_USE_MOCK=true` to force mock data.
 */
export async function getWorkPage(options?: ContentFetchOptions): Promise<WorkPageContent> {
	if (import.meta.env.SANITY_USE_MOCK === 'true') {
		return workPageContent;
	}
	try {
		return await fetchWorkPageFromSanity({ preview: options?.preview });
	} catch (err) {
		console.warn('[content] Sanity fetch failed; using mock work page.', err);
		return workPageContent;
	}
}
