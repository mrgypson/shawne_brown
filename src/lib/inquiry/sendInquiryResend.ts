export type SendInquiryInput = {
	from: string;
	to: string;
	replyTo: string;
	subject: string;
	textBody: string;
};

export type SendInquiryResult =
	| { ok: true }
	| { ok: false; status: number; message: string };

/**
 * Sends email via [Resend](https://resend.com/docs/api-reference/emails/send-email) HTTP API.
 */
export async function sendInquiryViaResend(
	apiKey: string,
	input: SendInquiryInput,
): Promise<SendInquiryResult> {
	const res = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${apiKey}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			from: input.from,
			to: [input.to],
			reply_to: input.replyTo,
			subject: input.subject,
			text: input.textBody,
		}),
	});

	if (res.ok) {
		return { ok: true };
	}

	let message = res.statusText || 'Email send failed';
	try {
		const errJson = (await res.json()) as { message?: string };
		if (typeof errJson?.message === 'string') {
			message = errJson.message;
		}
	} catch {
		// ignore
	}
	return { ok: false, status: res.status, message };
}
