import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

const ABOUT_PAGE_DOC_ID = 'aboutPage';

export default defineConfig({
	name: 'default',
	title: 'Brown',
	projectId: 'yrca4rxr',
	dataset: 'production',
	plugins: [
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
