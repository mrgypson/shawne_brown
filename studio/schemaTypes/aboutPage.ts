import { defineArrayMember, defineField, defineType } from 'sanity';

export const aboutPage = defineType({
	name: 'aboutPage',
	title: 'About & Contact',
	type: 'document',
	fields: [
		defineField({
			name: 'bio',
			title: 'Biography',
			type: 'text',
			rows: 5,
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'statement',
			title: 'Artist statement',
			type: 'text',
			rows: 8,
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'exhibitions',
			title: 'Exhibitions & publications (list)',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'object',
					name: 'exhibitionEntry',
					fields: [
						defineField({
							name: 'year',
							title: 'Year',
							type: 'string',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: 'detail',
							title: 'Detail',
							type: 'text',
							rows: 2,
							validation: (Rule) => Rule.required(),
						}),
					],
					preview: {
						select: { year: 'year', detail: 'detail' },
						prepare({ year, detail }) {
							return {
								title: year as string,
								subtitle: detail as string | undefined,
							};
						},
					},
				}),
			],
		}),
		defineField({
			name: 'publicationsNote',
			title: 'Publications note',
			type: 'text',
			rows: 2,
			description: 'Optional note below the exhibitions list.',
		}),
		defineField({
			name: 'contact',
			title: 'Contact',
			type: 'object',
			fields: [
				defineField({
					name: 'email',
					title: 'Email',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					name: 'location',
					title: 'Location',
					type: 'string',
				}),
				defineField({
					name: 'instagram',
					title: 'Instagram',
					type: 'string',
					description: 'e.g. @handle or full label',
				}),
				defineField({
					name: 'website',
					title: 'Website',
					type: 'url',
				}),
			],
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'contactPageLede',
			title: 'Contact page — intro',
			type: 'text',
			rows: 3,
			description: 'Opening paragraph on the Contact page only.',
		}),
		defineField({
			name: 'contactInquiryHeading',
			title: 'Contact page — inquiry section title',
			type: 'string',
		}),
		defineField({
			name: 'contactInquiryDisclaimer',
			title: 'Contact page — inquiry disclaimer',
			type: 'text',
			rows: 3,
			description: 'Note under the inquiry section title (e.g. form not connected).',
		}),
	],
	preview: {
		prepare() {
			return { title: 'About & Contact' };
		},
	},
});
