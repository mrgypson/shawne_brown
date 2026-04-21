import { defineField, defineType } from 'sanity';

export const homePage = defineType({
	name: 'homePage',
	title: 'Home page',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			description: 'Heading shown above the portfolio grid on the home page. Leave blank to hide.',
		}),
		defineField({
			name: 'showTitle',
			title: 'Show title',
			type: 'boolean',
			initialValue: true,
			description: 'Toggle off to hide the title without deleting the text.',
		}),
		defineField({
			name: 'subheading',
			title: 'Subheading',
			type: 'text',
			rows: 2,
			description: 'Short line of copy below the title.',
		}),
		defineField({
			name: 'showSubheading',
			title: 'Show subheading',
			type: 'boolean',
			initialValue: true,
			description: 'Toggle off to hide the subheading without deleting the text.',
		}),
	],
	preview: {
		prepare() {
			return { title: 'Home page' };
		},
	},
});
