import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const body = await req.json();
    const { recipient, notification, subject, content, html } = body;
    const to = notification ? process.env.EMAIL_NOTIFICATION_RECIPIENT : recipient;

    if (!to || !subject || !content) {
      return NextResponse.json(
        {
          message: notification
            ? 'Email notification recipient is not configured.'
            : 'Missing required fields: recipient, subject, or content.',
        },
        { status: notification && !to ? 500 : 400 }
      );
    }

    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_APP_PASSWORD;
    if (!user || !pass) {
      return NextResponse.json(
        { message: 'Email sender credentials are not configured.' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });

    const info = await transporter.sendMail({
      from: `Mehran Dadhbeh <${user}>`,
      to,
      subject: subject,
      text: content,
      html: html || `<p>${content}</p>`,
    });

    return NextResponse.json(
      { message: 'Email sent successfully', response: info },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { message: 'Failed to send email', error: error.message },
      { status: 500 }
    );
  }
}
