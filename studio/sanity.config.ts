import { HelpCircleIcon } from '@sanity/icons';
import { defineConfig } from 'sanity';
import { presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';
import HelpGuide from './components/HelpGuide';
import { schemaTypes } from './schemaTypes';

const ABOUT_PAGE_DOC_ID = 'aboutPage';
const WORK_PAGE_DOC_ID = 'workPage';

/** Deployed Astro site (Vercel). Presentation `initial` must be this origin, not `/api/preview/enable`. */
const BROWN_ASTRO_SITE_ORIGIN = 'https://shawne-brown.vercel.app';

/** Optional: `studio/.env` → `SANITY_STUDIO_PREVIEW_URL=http://localhost:4321` when running Astro locally. */
const studioPreviewUrlRaw =
	(process.env.SANITY_STUDIO_PREVIEW_URL ?? '').trim() || BROWN_ASTRO_SITE_ORIGIN;
const studioPreviewUrl = studioPreviewUrlRaw.replace(/\/$/, '');
if (/\/api\/preview\/enable\b/i.test(studioPreviewUrl)) {
	throw new Error(
		'SANITY_STUDIO_PREVIEW_URL must be your Astro site origin (e.g. https://shawne-brown.vercel.app), not /api/preview/enable. Presentation calls that route automatically.',
	);
}

const defaultAllowOrigins = `${BROWN_ASTRO_SITE_ORIGIN},https://*.vercel.app`;
const presentationAllowOrigins = [
	'http://localhost:*',
	'http://127.0.0.1:*',
	...(process.env.SANITY_STUDIO_ALLOW_ORIGINS?.trim()
		? process.env.SANITY_STUDIO_ALLOW_ORIGINS.split(',')
		: defaultAllowOrigins.split(',')),
]
	.map((s) => s.trim())
	.filter(Boolean);

export default defineConfig({
	name: 'default',
	title: 'Brown',
	projectId: 'yrca4rxr',
	dataset: 'production',
	plugins: [
		presentationTool({
			previewUrl: {
				initial: studioPreviewUrl,
				previewMode: {
					enable: '/api/preview/enable',
					disable: '/api/preview/disable',
				},
			},
			allowOrigins: presentationAllowOrigins,
		}),
		structureTool({
			structure: (S) =>
				S.list()
					.title('Content')
					.items([
						S.listItem()
							.title('About & Contact')
							.id('singleton-aboutPage')
							.child(
								S.document().schemaType('aboutPage').documentId(ABOUT_PAGE_DOC_ID),
							),
						S.listItem()
							.title('Work page')
							.id('singleton-workPage')
							.child(
								S.document().schemaType('workPage').documentId(WORK_PAGE_DOC_ID),
							),
						...S.documentTypeListItems().filter(
							(listItem) => !['aboutPage', 'workPage'].includes(listItem.getId() ?? ''),
						),
					]),
		}),
	],
	/**
	 * Custom top-nav tool: a read-only "How to use this site" page for editors.
	 * Lives in `studio/components/HelpGuide.tsx`; mirrors `docs/CLIENT_GUIDE.md`.
	 */
	tools: (prev) => [
		...prev,
		{
			name: 'guide',
			title: 'Guide',
			icon: HelpCircleIcon,
			component: HelpGuide,
		},
	],
	schema: {
		types: schemaTypes,
	},
});
