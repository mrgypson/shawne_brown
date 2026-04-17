const siteFromAstro = import.meta.env.SITE?.replace(/\/$/, '') ?? '';

/**
 * Site-wide defaults. `baseUrl` follows `site` in `astro.config.mjs` (`import.meta.env.SITE`).
 */
export const siteConfig = {
	siteTitle: 'Shawne Brown',
	defaultDescription:
		'Fine art photography by Shawne Brown — contemporary photographic work for gallery, museum, and collection contexts.',
	baseUrl: siteFromAstro || 'https://shawne-brown.vercel.app',
} as const;
