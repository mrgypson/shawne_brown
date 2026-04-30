import { HelpCircleIcon } from '@sanity/icons';
import { defineConfig } from 'sanity';
import { presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';
import HelpGuide from './components/HelpGuide';
import { schemaTypes } from './schemaTypes';

const ABOUT_PAGE_DOC_ID = 'aboutPage';
const HOME_PAGE_DOC_ID = 'homePage';
const SITE_SETTINGS_DOC_ID = 'siteSettings';

const STUDIO_TITLE = (process.env.SANITY_STUDIO_TITLE ?? 'Photography Site Studio').trim();
const SITE_ORIGIN_DEFAULT = (process.env.SANITY_SITE_ORIGIN_DEFAULT ?? 'http://localhost:4321').trim();
const FALLBACK_ALLOW_ORIGINS = (
	process.env.SANITY_STUDIO_ALLOW_ORIGINS_DEFAULT ??
	`${SITE_ORIGIN_DEFAULT},https://*.vercel.app`
).trim();
const SANITY_PROJECT_ID = (process.env.SANITY_PROJECT_ID ?? 'yrca4rxr').trim();
const SANITY_DATASET = (process.env.SANITY_DATASET ?? 'production').trim();

/** Optional: `studio/.env` → `SANITY_STUDIO_PREVIEW_URL=http://localhost:4321` when running Astro locally. */
const studioPreviewUrlRaw =
	(process.env.SANITY_STUDIO_PREVIEW_URL ?? '').trim() || SITE_ORIGIN_DEFAULT;
const studioPreviewUrl = studioPreviewUrlRaw.replace(/\/$/, '');
if (/\/api\/preview\/enable\b/i.test(studioPreviewUrl)) {
	throw new Error(
		'SANITY_STUDIO_PREVIEW_URL must be your Astro site origin (e.g. https://portfolio.example), not /api/preview/enable. Presentation calls that route automatically.',
	);
}

const presentationAllowOrigins = [
	'http://localhost:*',
	'http://127.0.0.1:*',
	...(process.env.SANITY_STUDIO_ALLOW_ORIGINS?.trim()
		? process.env.SANITY_STUDIO_ALLOW_ORIGINS.split(',')
		: FALLBACK_ALLOW_ORIGINS.split(',')),
]
	.map((s) => s.trim())
	.filter(Boolean);

export default defineConfig({
	name: 'default',
	title: STUDIO_TITLE,
	projectId: SANITY_PROJECT_ID,
	dataset: SANITY_DATASET,
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
							.title('Home page')
							.id('singleton-homePage')
							.child(
								S.document().schemaType('homePage').documentId(HOME_PAGE_DOC_ID),
							),
						S.listItem()
							.title('Site settings')
							.id('singleton-siteSettings')
							.child(
								S.document()
									.schemaType('siteSettings')
									.documentId(SITE_SETTINGS_DOC_ID),
							),
						...S.documentTypeListItems().filter(
							(listItem) =>
								!['aboutPage', 'homePage', 'siteSettings'].includes(
									listItem.getId() ?? '',
								),
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
