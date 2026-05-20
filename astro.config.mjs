// @ts-check
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import { defineConfig } from 'astro/config';
import { buildSitemapCustomPages } from './src/lib/seo/buildSitemapCustomPages.ts';

const siteUrl = (process.env.SITE_URL ?? 'http://localhost:4321').replace(/\/$/, '');
const sitemapCustomPages = await buildSitemapCustomPages(siteUrl);

// https://astro.build/config
export default defineConfig({
	site: siteUrl,
	adapter: vercel(),
	devToolbar: {
		enabled: false,
	},
	integrations: [
		sitemap({
			customPages: sitemapCustomPages,
			filter: (page) => {
				const path = new URL(page).pathname.replace(/\/$/, '') || '/';
				return !path.startsWith('/api') && path !== '/contact';
			},
		}),
	],
});
