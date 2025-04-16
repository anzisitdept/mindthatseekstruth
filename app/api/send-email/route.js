import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const body = await req.json();
    const { recipient, subject, content } = body;

    if (!recipient || !subject || !content) {
      return NextResponse.json(
        { message: 'Missing required fields: recipient, subject, or content.' },
        { status: 400 }
      );
    }

    // Nodemailer transporter using your provided Gmail credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mehrandadbeh.anziandco@gmail.com',
        pass: 'lasm twxy icpq bduy',
      },
    });

    // Send email
    const info = await transporter.sendMail({
      from: 'Mehran Dadhbeh <noreply@mindthatseekstruth.com>',
      to: recipient,
      subject: subject,
      text: content,
      html: `<p>${content}</p>`,
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
