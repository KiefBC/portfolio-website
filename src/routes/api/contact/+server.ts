import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { name, email, subject, message } = await request.json();

		// Validate required fields
		if (!name || !email || !subject || !message) {
			return json(
				{ error: 'All fields are required' },
				{ status: 400 }
			);
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return json(
				{ error: 'Invalid email format' },
				{ status: 400 }
			);
		}

		// For now, we'll use a simple email service
		// You can replace this with your preferred email service (SendGrid, Resend, etc.)
		const emailBody = `
New contact form submission from portfolio:

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Sent from your portfolio contact form
		`.trim();

		// Using Resend API (you'll need to set RESEND_API_KEY environment variable)
		const resendApiKey = env.RESEND_API_KEY;
		
		if (!resendApiKey) {
			console.error('RESEND_API_KEY not configured');
			return json(
				{ error: 'Email service not configured' },
				{ status: 500 }
			);
		}

		const response = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${resendApiKey}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				from: 'Portfolio Contact <noreply@kiefx.me>',
				to: ['kiefx@pm.me'], // Your email
				subject: `Portfolio Contact: ${subject}`,
				text: emailBody,
				reply_to: email
			}),
		});

		if (!response.ok) {
			const errorData = await response.json();
			console.error('Resend API error:', errorData);
			return json(
				{ error: 'Failed to send email' },
				{ status: 500 }
			);
		}

		return json({ success: true, message: 'Email sent successfully' });

	} catch (error) {
		console.error('Contact form error:', error);
		return json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
};