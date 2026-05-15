export interface ExhibitionEntry {
	year: string;
	detail: string;
}

export interface AboutContact {
	email: string;
	location?: string;
	instagram?: string;
	website?: string;
}

export interface AboutContent {
	bio: string;
	statement?: string;
	exhibitions: ExhibitionEntry[];
	publicationsNote?: string;
	contact: AboutContact;
	/** About & Contact page — Contact section; omit to use defaults in the page template */
	contactPageLede?: string;
	contactInquiryHeading?: string;
	contactInquiryDisclaimer?: string;
}
