import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
	name: 'default',
	title: 'Brown',
	projectId: 'yrca4rxr',
	dataset: 'production',
	plugins: [structureTool()],
	schema: {
		types: schemaTypes,
	},
});
