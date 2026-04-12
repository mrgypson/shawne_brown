import type { NeuhoffImage, PrintAvailability, PrintSalesMetadata } from '../../types/neuhoff';
import type { GalleryImage, GallerySpacingStep, Project, ProjectKind } from '../../types/project';
import { urlForImage } from './image';

type SanityPrintSales = {
	printNumber?: string;
	availability?: PrintAvailability;
	price?: string;
	sizeOptions?: string[];
	framedOption?: boolean;
	inquiryOrPurchase?: 'inquiry' | 'purchase' | 'none';
};

type SanityGalleryRow = {
	image?: Parameters<typeof urlForImage>[0];
	caption?: string | null;
	printNumber?: string | null;
	printSales?: SanityPrintSales | null;
	spaceAbove?: number | null;
	spaceBelow?: number | null;
	insetLeft?: number | null;
	insetRight?: number | null;
	/** Legacy single inset; used when insetLeft/insetRight are absent. */
	insetHorizontal?: number | null;
};

const DEFAULT_SPACE_ABOVE: GallerySpacingStep = 0;
const DEFAULT_SPACE_BELOW: GallerySpacingStep = 3;
const DEFAULT_INSET: GallerySpacingStep = 0;

function toSpacingStep(value: number | null | undefined, fallback: GallerySpacingStep): GallerySpacingStep {
	if (typeof value !== 'number' || Number.isNaN(value)) return fallback;
	const rounded = Math.round(value);
	return Math.min(4, Math.max(0, rounded)) as GallerySpacingStep;
}

export type SanityProjectDoc = {
	_id: string;
	title: string;
	slug: string;
	yearLabel: string;
	shortDescription: string;
	longDescription?: string | null;
	kind?: string | null;
	coverImage?: Parameters<typeof urlForImage>[0];
	images?: SanityGalleryRow[] | null;
};

function mapPrintSales(raw: SanityPrintSales | null | undefined): PrintSalesMetadata | undefined {
	if (!raw || typeof raw !== 'object') return undefined;
	const meta: PrintSalesMetadata = {};
	if (raw.printNumber) meta.printNumber = raw.printNumber;
	if (raw.availability) meta.availability = raw.availability;
	if (raw.price) meta.price = raw.price;
	if (raw.sizeOptions?.length) meta.sizeOptions = raw.sizeOptions;
	if (typeof raw.framedOption === 'boolean') meta.framedOption = raw.framedOption;
	if (raw.inquiryOrPurchase) meta.inquiryOrPurchase = raw.inquiryOrPurchase;
	return Object.keys(meta).length > 0 ? meta : undefined;
}

function mapGalleryRow(row: SanityGalleryRow, kind: ProjectKind): GalleryImage | NeuhoffImage {
	const src = urlForImage(row.image ?? null);
	const alt =
		row.image && typeof row.image === 'object' && 'alt' in row.image && typeof row.image.alt === 'string'
			? row.image.alt
			: '';

	const base: GalleryImage = {
		src,
		alt,
		caption: row.caption?.trim() || undefined,
		printNumber: row.printNumber?.trim() || undefined,
		spaceAbove: toSpacingStep(row.spaceAbove, DEFAULT_SPACE_ABOVE),
		spaceBelow: toSpacingStep(row.spaceBelow, DEFAULT_SPACE_BELOW),
		insetLeft: toSpacingStep(row.insetLeft ?? row.insetHorizontal, DEFAULT_INSET),
		insetRight: toSpacingStep(row.insetRight ?? row.insetHorizontal, DEFAULT_INSET),
	};

	if (kind === 'neuhoff') {
		const printSales = mapPrintSales(row.printSales ?? undefined);
		const neuhoff: NeuhoffImage = printSales ? { ...base, printSales } : { ...base };
		return neuhoff;
	}

	return base;
}

export function mapSanityProject(doc: SanityProjectDoc): Project {
	const kind: ProjectKind = doc.kind === 'neuhoff' ? 'neuhoff' : 'standard';
	const coverImage = {
		src: urlForImage(doc.coverImage ?? null),
		alt:
			doc.coverImage &&
			typeof doc.coverImage === 'object' &&
			'alt' in doc.coverImage &&
			typeof doc.coverImage.alt === 'string'
				? doc.coverImage.alt
				: '',
	};

	const rows = doc.images ?? [];
	const images = rows.map((row) => mapGalleryRow(row, kind));

	const base = {
		title: doc.title,
		slug: doc.slug,
		yearLabel: doc.yearLabel,
		shortDescription: doc.shortDescription,
		longDescription: doc.longDescription?.trim() || undefined,
		coverImage,
	};

	if (kind === 'neuhoff') {
		return { ...base, kind: 'neuhoff', images: images as NeuhoffImage[] };
	}
	return { ...base, kind: 'standard', images: images as GalleryImage[] };
}
