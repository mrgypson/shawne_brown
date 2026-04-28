import type { NeuhoffImage } from './neuhoff';

/**
 * Cover image for project index and optional hero use.
 */
export interface CoverImage {
	src: string;
	alt: string;
}

/** Spacing scale from Sanity (0–4); mapped to CSS space tokens on the site. */
export type GallerySpacingStep = 0 | 1 | 2 | 3 | 4;

/** Relative image width within the gallery column. `full` breaks out to viewport width. */
export type GalleryWidth = 'small' | 'medium' | 'large' | 'full';

/** Horizontal alignment used when width is smaller than 100% of the container. */
export type GalleryAlign = 'left' | 'center' | 'right';

/** Relative column widths for a pair on desktop. */
export type GalleryPairRatio = '50/50' | '60/40' | '40/60';

/** Vertical alignment of two paired images when their heights differ. */
export type GalleryPairAlignVertical = 'top' | 'center' | 'bottom';

/**
 * Base gallery image fields (CMS-mappable).
 */
export interface GalleryImage {
	src: string;
	alt: string;
	caption?: string;
	/** Edition / inventory label (optional on standard projects). */
	printNumber?: string;
	/** Padding on the left (shrinks image from that side). */
	insetLeft?: GallerySpacingStep;
	/** Padding on the right (shrinks image from that side). */
	insetRight?: GallerySpacingStep;
	/** Size relative to the article container. `full` bleeds to viewport width. */
	width?: GalleryWidth;
	/** Horizontal alignment; only applied when `width` is `small` or `large`. */
	align?: GalleryAlign;
	/** When true, this image pairs with the next one into a two-column row at all breakpoints. */
	pairWithNext?: boolean;
	/** Relative widths of the two columns when `pairWithNext` (same on mobile and desktop). */
	pairRatio?: GalleryPairRatio;
	/** Vertical alignment within the pair row when heights differ. */
	pairAlignVertical?: GalleryPairAlignVertical;
}

export type ProjectKind = 'standard' | 'neuhoff';

interface ProjectBase {
	title: string;
	slug: string;
	yearLabel: string;
	shortDescription: string;
	longDescription?: string;
	coverImage: CoverImage;
	kind: ProjectKind;
	/** When true (default), this project appears in the home page grid. Always listed in the Work dropdown. */
	showOnHome?: boolean;
	/** Gallery-wide vertical gap between images (and between pair rows). */
	gallerySpaceBetween?: GallerySpacingStep;
	/** Gap inside every pair: horizontal space between the two columns. */
	galleryPairGap?: GallerySpacingStep;
}

export interface StandardProject extends ProjectBase {
	kind: 'standard';
	images: GalleryImage[];
}

export interface NeuhoffProject extends ProjectBase {
	kind: 'neuhoff';
	images: NeuhoffImage[];
}

export type Project = StandardProject | NeuhoffProject;

/** One entry on the Work index — a series or gallery. */
export type ProjectGroup = Project;

export function isNeuhoffProject(project: Project): project is NeuhoffProject {
	return project.kind === 'neuhoff';
}
