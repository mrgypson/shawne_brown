import type { SiteSettings } from '../../types/siteSettings';

const siteFromAstro = import.meta.env.SITE?.replace(/\/$/, '') ?? '';

/**
 * Site-wide fallback values. `baseUrl` follows `site` in `astro.config.mjs` (`import.meta.env.SITE`).
 */
export const siteConfig = {
	siteName: 'Photographer Name',
	tagline: 'Fine art photography',
	defaultTitle: 'Photographer Name',
	defaultDescription:
		'Fine art photography — contemporary photographic work for gallery, museum, and collection contexts.',
	contactEmail: 'studio@example.com',
	logoUrl: undefined,
	faviconUrl: '/favicon.svg',
	defaultOgImageUrl: undefined,
	baseUrl: siteFromAstro || 'http://localhost:4321',
} satisfies SiteSettings & { baseUrl: string };
