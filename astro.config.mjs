// @ts-check
import vercel from '@astrojs/vercel';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://shawne-brown-git-main-mrgypsons-projects.vercel.app',
	adapter: vercel(),
	devToolbar: {
		enabled: false,
	},
});
