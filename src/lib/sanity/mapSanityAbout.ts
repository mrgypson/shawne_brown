import type { AboutContent, AboutContact, ExhibitionEntry } from '../../types/about';

export type SanityAboutDoc = {
	bio?: string;
	statement?: string;
	exhibitions?: Array<{ year?: string; detail?: string }> | null;
	publicationsNote?: string | null;
	contact?: {
		email?: string;
		location?: string | null;
		instagram?: string | null;
		website?: string | null;
	} | null;
	contactPageLede?: string | null;
	contactInquiryHeading?: string | null;
	contactInquiryDisclaimer?: string | null;
};

function mapExhibitions(
	raw: SanityAboutDoc['exhibitions'],
): ExhibitionEntry[] {
	if (!raw?.length) return [];
	return raw
		.filter((e): e is { year: string; detail: string } => Boolean(e?.year && e?.detail))
		.map((e) => ({ year: e.year, detail: e.detail }));
}

function mapContact(raw: SanityAboutDoc['contact']): AboutContact {
	if (!raw?.email?.trim()) {
		throw new Error('aboutPage.contact.email is required');
	}
	const contact: AboutContact = {
		email: raw.email.trim(),
	};
	if (raw.location?.trim()) contact.location = raw.location.trim();
	if (raw.instagram?.trim()) contact.instagram = raw.instagram.trim();
	if (raw.website?.trim()) contact.website = raw.website.trim();
	return contact;
}

export function mapSanityAbout(doc: SanityAboutDoc): AboutContent {
	if (!doc.bio?.trim()) {
		throw new Error('aboutPage.bio is required');
	}
	const out: AboutContent = {
		bio: doc.bio.trim(),
		exhibitions: mapExhibitions(doc.exhibitions),
		contact: mapContact(doc.contact),
	};
	if (doc.statement?.trim()) {
		out.statement = doc.statement.trim();
	}
	if (doc.publicationsNote?.trim()) {
		out.publicationsNote = doc.publicationsNote.trim();
	}
	if (doc.contactPageLede?.trim()) {
		out.contactPageLede = doc.contactPageLede.trim();
	}
	if (doc.contactInquiryHeading?.trim()) {
		out.contactInquiryHeading = doc.contactInquiryHeading.trim();
	}
	if (doc.contactInquiryDisclaimer?.trim()) {
		out.contactInquiryDisclaimer = doc.contactInquiryDisclaimer.trim();
	}
	return out;
}
