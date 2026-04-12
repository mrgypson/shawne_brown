import { defineArrayMember, defineField, defineType } from 'sanity';

/** Shared 0–4 scale for gallery spacing (mapped to site CSS space tokens). */
const gallerySpacingList = [
	{ title: '0 — none', value: 0 },
	{ title: '1 — tight', value: 1 },
	{ title: '2 — medium', value: 2 },
	{ title: '3 — generous', value: 3 },
	{ title: '4 — maximum', value: 4 },
] as const;

const printSalesFields = [
	defineField({
		name: 'printNumber',
		title: 'Print #',
		type: 'string',
	}),
	defineField({
		name: 'availability',
		title: 'Availability',
		type: 'string',
		options: {
			list: [
				{ title: 'Available', value: 'available' },
				{ title: 'Reserved', value: 'reserved' },
				{ title: 'Sold', value: 'sold' },
				{ title: 'NFS', value: 'nfs' },
			],
			layout: 'radio',
		},
	}),
	defineField({
		name: 'price',
		title: 'Price',
		type: 'string',
		description: 'e.g. $1,200 — omit when sold/NFS',
	}),
	defineField({
		name: 'sizeOptions',
		title: 'Size options',
		type: 'array',
		of: [{ type: 'string' }],
	}),
	defineField({
		name: 'framedOption',
		title: 'Framing available',
		type: 'boolean',
	}),
	defineField({
		name: 'inquiryOrPurchase',
		title: 'Inquiry / purchase',
		type: 'string',
		options: {
			list: [
				{ title: 'Inquiry', value: 'inquiry' },
				{ title: 'Purchase interest', value: 'purchase' },
				{ title: 'None', value: 'none' },
			],
			layout: 'radio',
		},
	}),
];

export const project = defineType({
	name: 'project',
	title: 'Project',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: { source: 'title', maxLength: 96 },
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'order',
			title: 'Sort order',
			type: 'number',
			description: 'Lower numbers appear first on the Work page.',
			initialValue: 0,
		}),
		defineField({
			name: 'yearLabel',
			title: 'Year / span',
			type: 'string',
			description: 'e.g. 2021 or 2018–2020',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'kind',
			title: 'Project type',
			type: 'string',
			options: {
				list: [
					{ title: 'Standard', value: 'standard' },
					{ title: 'Neuhoff (print sales fields)', value: 'neuhoff' },
				],
				layout: 'radio',
			},
			initialValue: 'standard',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'shortDescription',
			title: 'Short description',
			type: 'text',
			rows: 3,
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'longDescription',
			title: 'Long description',
			type: 'text',
			rows: 6,
		}),
		defineField({
			name: 'coverImage',
			title: 'Cover image',
			type: 'image',
			options: { hotspot: true },
			fields: [
				defineField({
					name: 'alt',
					type: 'string',
					title: 'Alternative text',
					validation: (Rule) => Rule.required(),
				}),
			],
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'images',
			title: 'Gallery',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'object',
					name: 'galleryImage',
					fields: [
						defineField({
							name: 'image',
							title: 'Image',
							type: 'image',
							options: { hotspot: true },
							fields: [
								defineField({
									name: 'alt',
									type: 'string',
									title: 'Alternative text',
									validation: (Rule) => Rule.required(),
								}),
							],
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: 'caption',
							title: 'Caption',
							type: 'string',
						}),
						defineField({
							name: 'spaceAbove',
							title: 'Space above image',
							type: 'number',
							description: 'Extra margin above this image (stacked with the previous image’s space below).',
							options: { list: [...gallerySpacingList] },
							initialValue: 0,
							validation: (Rule) => Rule.min(0).max(4).integer(),
						}),
						defineField({
							name: 'spaceBelow',
							title: 'Space below image',
							type: 'number',
							description: 'Margin below this block (image, caption, and optional print details).',
							options: { list: [...gallerySpacingList] },
							initialValue: 3,
							validation: (Rule) => Rule.min(0).max(4).integer(),
						}),
						defineField({
							name: 'insetLeft',
							title: 'Inset left',
							type: 'number',
							description:
								'Padding on the left narrows the image inside the column without changing page width.',
							options: { list: [...gallerySpacingList] },
							initialValue: 0,
							validation: (Rule) => Rule.min(0).max(4).integer(),
						}),
						defineField({
							name: 'insetRight',
							title: 'Inset right',
							type: 'number',
							description:
								'Padding on the right narrows the image inside the column without changing page width.',
							options: { list: [...gallerySpacingList] },
							initialValue: 0,
							validation: (Rule) => Rule.min(0).max(4).integer(),
						}),
						defineField({
							name: 'printNumber',
							title: 'Edition / print #',
							type: 'string',
						}),
						defineField({
							name: 'printSales',
							title: 'Print sales (Neuhoff)',
							type: 'object',
							fields: printSalesFields,
							options: { collapsible: true, collapsed: true },
						}),
					],
					preview: {
						select: {
							media: 'image',
							title: 'caption',
							subtitle: 'printNumber',
						},
					},
				}),
			],
		}),
	],
	preview: {
		select: {
			title: 'title',
			media: 'coverImage',
			year: 'yearLabel',
		},
		prepare({ title, media, year }) {
			return { title: title as string, subtitle: year as string | undefined, media };
		},
	},
});
