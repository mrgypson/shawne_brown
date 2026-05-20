import type { SiteSettings } from '../../types/siteSettings';

const siteFromAstro = import.meta.env.SITE?.replace(/\/$/, '') ?? '';

/**
 * Site-wide fallback values. `baseUrl` follows `site` in `astro.config.mjs` (`import.meta.env.SITE`).
 */
export const siteConfig = {
	siteName: 'Shawne Brown',
	tagline: 'Fine art photography by Shawne Brown',
	defaultTitle: 'Shawne Brown — Fine Art Photographer',
	defaultDescription:
		'Fine art photography by Shawne Brown — contemplative series on place and light for gallery, museum, and collection contexts, including The Neuhoff Project.',
	contactEmail: 'cshawnebrown@gmail.com',
	twitterHandle: '@shawne',
	logoUrl: undefined,
	faviconUrl: '/favicon.svg',
	defaultOgImageUrl: undefined,
	baseUrl: siteFromAstro || 'http://localhost:4321',
} satisfies SiteSettings & { baseUrl: string };
