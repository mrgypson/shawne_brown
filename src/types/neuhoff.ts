import type { GalleryImage } from './project';

export type PrintAvailability = 'available' | 'reserved' | 'sold' | 'nfs';

export type InquiryOrPurchase = 'inquiry' | 'purchase' | 'none';

/**
 * Placeholder structure for future limited-edition / print sales (no checkout yet).
 */
export interface PrintSalesMetadata {
	printNumber?: string;
	availability?: PrintAvailability;
	price?: string;
	sizeOptions?: string[];
	/** Whether framing is offered for this work. */
	framedOption?: boolean;
	inquiryOrPurchase?: InquiryOrPurchase;
}

export interface NeuhoffImage extends GalleryImage {
	printSales?: PrintSalesMetadata;
}
