import { instagramHref, websiteHref } from '../contact/socialUrls';
import type { AboutContent } from '../../types/about';
import type { Project } from '../../types/project';
import type { SiteSettings } from '../../types/siteSettings';

export type JsonLd = Record<string, unknown>;

export function absoluteUrl(pathOrUrl: string, siteOrigin: string): string {
	if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
	return new URL(pathOrUrl, siteOrigin.endsWith('/') ? siteOrigin : `${siteOrigin}/`).href;
}

function sameAsFromContact(contact: AboutContent['contact']): string[] {
	const links: string[] = [];
	const ig = instagramHref(contact.instagram);
	const web = websiteHref(contact.website);
	if (ig) links.push(ig);
	if (web) links.push(web);
	return links;
}

export function buildWebSiteJsonLd(
	siteSettings: SiteSettings,
	siteOrigin: string,
	about: AboutContent,
): JsonLd {
	const sameAs = sameAsFromContact(about.contact);
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: siteSettings.siteName,
		url: siteOrigin,
		description: siteSettings.defaultDescription,
		...(sameAs.length > 0 ? { sameAs } : {}),
	};
}

export function buildPersonJsonLd(
	siteSettings: SiteSettings,
	about: AboutContent,
	siteOrigin: string,
): JsonLd {
	const sameAs = sameAsFromContact(about.contact);
	return {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: siteSettings.siteName,
		jobTitle: 'Fine Art Photographer',
		description: about.bio,
		url: new URL('/about', siteOrigin).href,
		email: about.contact.email,
		...(about.contact.location ? { address: about.contact.location } : {}),
		...(sameAs.length > 0 ? { sameAs } : {}),
	};
}

export function buildCreativeWorkJsonLd(
	project: Project,
	siteSettings: SiteSettings,
	siteOrigin: string,
): JsonLd {
	const pageUrl = new URL(`/work/${project.slug}`, siteOrigin).href;
	const imageUrls = [
		project.coverImage.src,
		...project.images.map((img) => img.src),
	]
		.filter(Boolean)
		.map((src) => absoluteUrl(src, siteOrigin));

	return {
		'@context': 'https://schema.org',
		'@type': 'VisualArtwork',
		name: project.title,
		description: project.shortDescription,
		url: pageUrl,
		dateCreated: project.yearLabel,
		creator: {
			'@type': 'Person',
			name: siteSettings.siteName,
		},
		...(imageUrls.length > 0 ? { image: imageUrls } : {}),
	};
}

/** First sentence of plain text for meta descriptions. */
export function firstSentence(text: string): string {
	const trimmed = text.trim();
	if (!trimmed) return '';
	const match = trimmed.match(/^[^.!?]+[.!?]?/);
	return (match?.[0] ?? trimmed).trim();
}
