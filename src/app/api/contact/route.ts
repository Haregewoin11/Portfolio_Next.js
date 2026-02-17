import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    // Basic server-side validation (Cybersecurity best practice)
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <Portfolio_Prod@resend.dev>',
      to: ['workuhareg21@gmail.com'], // Must be your verified Resend email
      subject: `New Inquiry: ${subject || 'No Subject'}`,
      replyTo: email, // This allows you to hit 'Reply' in your email client!
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #3b82f6;">New Portfolio Message</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
          <hr />
          <p style="font-size: 12px; color: #666;">Sent via Resend Sandbox Mode</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'System error. Please try again later.' }, { status: 500 });
  }
}