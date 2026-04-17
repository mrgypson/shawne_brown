/**
 * Builds an Instagram profile URL from a Studio value (`@handle`, handle, or full URL).
 */
export function instagramHref(value: string | undefined): string | null {
	if (!value?.trim()) return null;
	const v = value.trim();
	if (/^https?:\/\//i.test(v)) return v;
	const handle = v.replace(/^@/, '');
	if (!/^[a-zA-Z0-9._]{1,64}$/.test(handle)) return null;
	return `https://www.instagram.com/${handle}/`;
}

/**
 * Normalizes a website URL for `href` (adds https when missing).
 */
export function websiteHref(value: string | undefined): string | null {
	if (!value?.trim()) return null;
	const v = value.trim();
	try {
		const u = new URL(v);
		if (u.protocol === 'http:' || u.protocol === 'https:') return u.href;
	} catch {
		// continue
	}
	try {
		return new URL(`https://${v}`).href;
	} catch {
		return null;
	}
}
