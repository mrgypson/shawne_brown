// @ts-check
import vercel from '@astrojs/vercel';
import { defineConfig } from 'astro/config';

const siteUrl = (process.env.SITE_URL ?? 'http://localhost:4321').replace(/\/$/, '');

// https://astro.build/config
export default defineConfig({
	site: siteUrl,
	adapter: vercel(),
	devToolbar: {
		enabled: false,
	},
});
