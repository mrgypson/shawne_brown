import { aboutContent } from '../data/mock/about';
import { siteConfig } from '../data/mock/site';
import { homePageContent } from '../data/mock/homePage';
import { mockProjects } from '../data/mock/projects';
import type { AboutContent } from '../types/about';
import type { HomePageContent } from '../types/homePage';
import type { Project } from '../types/project';
import type { SiteSettings } from '../types/siteSettings';
import { fetchAboutFromSanity } from './sanity/fetchAbout';
import { fetchHomePageFromSanity } from './sanity/fetchHomePage';
import { fetchProjectBySlugFromSanity, fetchProjectsFromSanity } from './sanity/fetchProjects';
import { fetchSiteSettingsFromSanity } from './sanity/fetchSiteSettings';

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
 * Home page singleton (title + subheading, each optional with show/hide toggles).
 * Uses Sanity when configured; set `SANITY_USE_MOCK=true` to force mock data.
 */
export async function getHomePage(options?: ContentFetchOptions): Promise<HomePageContent> {
	if (import.meta.env.SANITY_USE_MOCK === 'true') {
		return homePageContent;
	}
	try {
		return await fetchHomePageFromSanity({ preview: options?.preview });
	} catch (err) {
		console.warn('[content] Sanity fetch failed; using mock home page.', err);
		return homePageContent;
	}
}

/**
 * Site-level branding + SEO defaults. Uses Sanity when configured; set `SANITY_USE_MOCK=true` to force mock data.
 */
export async function getSiteSettings(options?: ContentFetchOptions): Promise<SiteSettings> {
	if (import.meta.env.SANITY_USE_MOCK === 'true') {
		return siteConfig;
	}
	try {
		return await fetchSiteSettingsFromSanity({ preview: options?.preview });
	} catch (err) {
		console.warn('[content] Sanity fetch failed; using mock site settings.', err);
		return siteConfig;
	}
}
