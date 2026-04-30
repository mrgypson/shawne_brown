import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
	name: 'siteSettings',
	title: 'Site settings',
	type: 'document',
	fields: [
		defineField({
			name: 'siteName',
			title: 'Site name',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'tagline',
			title: 'Tagline',
			type: 'text',
			rows: 2,
		}),
		defineField({
			name: 'defaultTitle',
			title: 'Default SEO title',
			type: 'string',
		}),
		defineField({
			name: 'defaultDescription',
			title: 'Default SEO description',
			type: 'text',
			rows: 3,
		}),
		defineField({
			name: 'contactEmail',
			title: 'Public contact email',
			type: 'string',
		}),
		defineField({
			name: 'logo',
			title: 'Logo',
			type: 'image',
			options: { hotspot: true },
		}),
		defineField({
			name: 'favicon',
			title: 'Favicon',
			type: 'image',
			options: { hotspot: true },
		}),
		defineField({
			name: 'defaultOgImage',
			title: 'Default Open Graph image',
			type: 'image',
			options: { hotspot: true },
		}),
	],
	preview: {
		select: { title: 'siteName' },
		prepare({ title }) {
			return { title: title || 'Site settings' };
		},
	},
});
