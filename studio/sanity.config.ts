import { defineConfig } from 'sanity';
import { presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

const ABOUT_PAGE_DOC_ID = 'aboutPage';

const studioPreviewUrl = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:4321';

const presentationAllowOrigins = [
	'http://localhost:*',
	'http://127.0.0.1:*',
	...(process.env.SANITY_STUDIO_ALLOW_ORIGINS ?? '')
		.split(',')
		.map((s) => s.trim())
		.filter(Boolean),
];

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
						...S.documentTypeListItems().filter(
							(listItem) => listItem.getId() !== 'aboutPage',
						),
					]),
		}),
	],
	schema: {
		types: schemaTypes,
	},
});
