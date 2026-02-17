import nodemailer from "https://esm.sh/nodemailer@6.9.16";
import { createClient } from '@supabase/supabase-js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { record } = await req.json();

    // 1. Initialize Supabase Client to handle storage
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '' 
    );

    // 2. Generate Signed URL if an attachment exists
    let signedUrl = null;
    if (record.file_url) {
      const { data, error: urlError } = await supabase.storage
        .from('attachments')
        .createSignedUrl(record.file_url, 60 * 60 * 24 * 7); // Link valid for 7 days

      if (!urlError) signedUrl = data.signedUrl;
    }

    // 3. Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: Deno.env.get('SMTP_USER'),
        pass: Deno.env.get('SMTP_PASS'),
      },
    });

    const mailOptions = {
      from: `"${record.name}" <${Deno.env.get('SMTP_USER')}>`,
      to: 'hargwor21@gmail.com',
      replyTo: record.email,
      subject: `[Portfolio Inquiry] ${record.subject || 'New Contact'}`,
      text: `Message from ${record.name} (${record.email}):\n\n${record.message}${signedUrl ? `\n\nAttachment: ${signedUrl}` : ''}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; border: 1px solid #1f2937; padding: 30px; border-radius: 15px; background-color: #f9fafb; color: #111827;">
          <h2 style="color: #10b981; margin-top: 0;">New System Inquiry</h2>
          <p style="font-size: 14px;"><strong>From:</strong> ${record.name} (${record.email})</p>
          <p style="font-size: 14px;"><strong>Subject:</strong> ${record.subject}</p>
          <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="font-weight: bold; margin-bottom: 10px;">Message Payload:</p>
          <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb; white-space: pre-wrap;">${record.message}</div>
          
          ${signedUrl ? `
            <div style="margin-top: 25px;">
              <p style="font-weight: bold; margin-bottom: 10px;">Security Attachment:</p>
              <a href="${signedUrl}" style="display: inline-block; padding: 10px 20px; background-color: #10b981; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 13px;">
                Download Attached File
              </a>
              <p style="font-size: 11px; color: #6b7280; margin-top: 8px;">Note: This secure link will expire in 7 days.</p>
            </div>
          ` : ''}
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true, messageId: info.messageId }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});