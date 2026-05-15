import type { Project } from '../types/project';

/**
 * Slugs that appear first on the home grid and in the Work menu (newest → oldest).
 * Keys must match Sanity `slug.current`. `the-neuhoff-project` covers the local mock Neuhoff slug.
 */
const PRIORITY_SLUG_RANK: Readonly<Record<string, number>> = {
	'evening-land-music-city': 0,
	shiloh: 1,
	'see-the-elephant': 2,
	'neuhoff-archive': 3,
	'the-neuhoff-project': 3,
};

function priorityIndex(slug: string): number {
	const rank = PRIORITY_SLUG_RANK[slug];
	return rank === undefined ? Number.POSITIVE_INFINITY : rank;
}

function compareTitle(a: string, b: string): number {
	return a.localeCompare(b, undefined, { sensitivity: 'base' });
}

/**
 * Stable site-wide project order: priority slugs first, then others by Sanity sort order and title.
 */
export function sortProjectsForDisplay(projects: Project[]): Project[] {
	return [...projects].sort((a, b) => {
		const pa = priorityIndex(a.slug);
		const pb = priorityIndex(b.slug);
		if (pa !== pb) return pa - pb;

		const oa = a.sortOrder ?? 999;
		const ob = b.sortOrder ?? 999;
		if (oa !== ob) return oa - ob;

		return compareTitle(a.title, b.title);
	});
}
