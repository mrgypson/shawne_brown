import type { SiteSettings } from '../../types/siteSettings';

export type SanitySiteSettingsDoc = {
	siteName?: string;
	tagline?: string | null;
	defaultTitle?: string | null;
	defaultDescription?: string | null;
	contactEmail?: string | null;
	logoUrl?: string | null;
	faviconUrl?: string | null;
	defaultOgImageUrl?: string | null;
};

export function mapSanitySiteSettings(doc: SanitySiteSettingsDoc | null): SiteSettings {
	if (!doc?.siteName?.trim()) {
		throw new Error('siteSettings.siteName is required');
	}

	const output: SiteSettings = {
		siteName: doc.siteName.trim(),
	};

	if (doc.tagline?.trim()) output.tagline = doc.tagline.trim();
	if (doc.defaultTitle?.trim()) output.defaultTitle = doc.defaultTitle.trim();
	if (doc.defaultDescription?.trim()) output.defaultDescription = doc.defaultDescription.trim();
	if (doc.contactEmail?.trim()) output.contactEmail = doc.contactEmail.trim();
	if (doc.logoUrl?.trim()) output.logoUrl = doc.logoUrl.trim();
	if (doc.faviconUrl?.trim()) output.faviconUrl = doc.faviconUrl.trim();
	if (doc.defaultOgImageUrl?.trim()) output.defaultOgImageUrl = doc.defaultOgImageUrl.trim();

	return output;
}
