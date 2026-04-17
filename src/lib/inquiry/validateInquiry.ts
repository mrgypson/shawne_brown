const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 10000;

export type InquiryPayload = {
	name: string;
	email: string;
	message: string;
	/** Honeypot — must be empty. */
	_company?: string;
};

export type InquiryValidationResult =
	| { ok: true; value: { name: string; email: string; message: string } }
	| { ok: false; error: string }
	/** Honeypot tripped — do not send mail; respond as if OK. */
	| { ok: true; honeypot: true };

function isNonEmptyString(v: unknown): v is string {
	return typeof v === 'string' && v.trim().length > 0;
}

/**
 * Validates inquiry JSON. A filled honeypot yields `{ ok: true, honeypot: true }` (no email).
 */
export function validateInquiryBody(body: unknown): InquiryValidationResult {
	if (!body || typeof body !== 'object') {
		return { ok: false, error: 'Invalid request body.' };
	}
	const o = body as Record<string, unknown>;
	const honeypot = o._company;
	if (typeof honeypot === 'string' && honeypot.trim() !== '') {
		return { ok: true, honeypot: true };
	}

	const name = o.name;
	const email = o.email;
	const message = o.message;
	if (!isNonEmptyString(name) || !isNonEmptyString(email) || !isNonEmptyString(message)) {
		return { ok: false, error: 'Name, email, and message are required.' };
	}

	const nameTrim = name.trim();
	const emailTrim = email.trim();
	const messageTrim = message.trim();

	if (nameTrim.length > MAX_NAME) {
		return { ok: false, error: 'Name is too long.' };
	}
	if (emailTrim.length > MAX_EMAIL) {
		return { ok: false, error: 'Email is too long.' };
	}
	if (messageTrim.length > MAX_MESSAGE) {
		return { ok: false, error: 'Message is too long.' };
	}
	const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrim);
	if (!emailOk) {
		return { ok: false, error: 'Please enter a valid email address.' };
	}

	return { ok: true, value: { name: nameTrim, email: emailTrim, message: messageTrim } };
}
