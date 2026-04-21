import type { WorkPageContent } from '../../types/workPage';

export type SanityWorkPageDoc = {
	title?: string | null;
	showTitle?: boolean | null;
	subheading?: string | null;
	showSubheading?: boolean | null;
};

export function mapSanityWorkPage(doc: SanityWorkPageDoc | null): WorkPageContent {
	if (!doc) {
		return { showTitle: true, showSubheading: true };
	}
	const out: WorkPageContent = {
		showTitle: doc.showTitle ?? true,
		showSubheading: doc.showSubheading ?? true,
	};
	if (doc.title?.trim()) out.title = doc.title.trim();
	if (doc.subheading?.trim()) out.subheading = doc.subheading.trim();
	return out;
}
