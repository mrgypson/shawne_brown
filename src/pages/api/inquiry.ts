import type { APIRoute } from 'astro';
import { getAbout } from '../../lib/content';
import { sendInquiryViaResend } from '../../lib/inquiry/sendInquiryResend';
import { validateInquiryBody } from '../../lib/inquiry/validateInquiry';

export const prerender = false;

function json(data: unknown, status: number) {
	return new Response(JSON.stringify(data), {
		status,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

export const POST: APIRoute = async ({ request }) => {
	if (request.headers.get('content-type')?.split(';')[0]?.trim() !== 'application/json') {
		return json({ ok: false, error: 'Expected application/json.' }, 415);
	}

	let parsed: unknown;
	try {
		parsed = await request.json();
	} catch {
		return json({ ok: false, error: 'Invalid JSON.' }, 400);
	}

	const validated = validateInquiryBody(parsed);
	if (!validated.ok) {
		return json({ ok: false, error: validated.error }, 400);
	}
	if ('honeypot' in validated && validated.honeypot) {
		return json({ ok: true }, 200);
	}

	if (!('value' in validated)) {
		return json({ ok: true }, 200);
	}
	const { name, email, message } = validated.value;

	const apiKey = import.meta.env.RESEND_API_KEY?.trim();
	const from = import.meta.env.RESEND_FROM_EMAIL?.trim();
	if (!apiKey || !from) {
		return json(
			{
				ok: false,
				error: 'Inquiry email is not configured. Set RESEND_API_KEY and RESEND_FROM_EMAIL on the server.',
			},
			503,
		);
	}

	let to: string;
	try {
		const about = await getAbout({ preview: false });
		to = about.contact.email.trim();
	} catch {
		return json({ ok: false, error: 'Could not load studio contact address.' }, 503);
	}

	if (!to) {
		return json({ ok: false, error: 'Studio email is not configured in the CMS.' }, 503);
	}

	const subject = `Website inquiry from ${name}`;
	const textBody = [
		`Name: ${name}`,
		`Reply-to: ${email}`,
		'',
		message,
		'',
		'— Sent from the site inquiry form',
	].join('\n');

	const sent = await sendInquiryViaResend(apiKey, {
		from,
		to,
		replyTo: email,
		subject,
		textBody,
	});

	if (!sent.ok) {
		const status = sent.status >= 400 && sent.status < 600 ? sent.status : 502;
		return json({ ok: false, error: sent.message || 'Email could not be sent.' }, status);
	}

	return json({ ok: true }, 200);
};
