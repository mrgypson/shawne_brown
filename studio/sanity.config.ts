import { defineConfig } from 'sanity';
import { presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

const ABOUT_PAGE_DOC_ID = 'aboutPage';

const studioPreviewUrl = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:4321';

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
