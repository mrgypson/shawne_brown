import { getProjects } from '../content';

/**
 * Full URLs for SSR routes to include in the XML sitemap (home, about, each project).
 */
export async function buildSitemapCustomPages(siteUrl: string): Promise<string[]> {
	const base = siteUrl.replace(/\/$/, '');
	const projects = await getProjects();
	const paths = ['/', '/about', ...projects.map((p) => `/work/${p.slug}`)];
	return paths.map((path) => new URL(path, `${base}/`).href);
}
