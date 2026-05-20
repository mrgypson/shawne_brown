export interface SiteSettings {
	siteName: string;
	tagline?: string;
	defaultTitle?: string;
	defaultDescription?: string;
	contactEmail?: string;
	logoUrl?: string;
	faviconUrl?: string;
	defaultOgImageUrl?: string;
	/** Twitter / X handle for card meta, e.g. @shawne */
	twitterHandle?: string;
}
