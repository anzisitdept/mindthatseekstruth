const { loadEnvConfig } = require('@next/env');
const nodemailer = require('nodemailer');

loadEnvConfig(process.cwd());

async function sendTestEmail() {
  const { EMAIL_USER, EMAIL_APP_PASSWORD, EMAIL_NOTIFICATION_RECIPIENT } =
    process.env;

  if (!EMAIL_USER || !EMAIL_APP_PASSWORD || !EMAIL_NOTIFICATION_RECIPIENT) {
    throw new Error(
      'Set EMAIL_USER, EMAIL_APP_PASSWORD, and EMAIL_NOTIFICATION_RECIPIENT in .env.local.'
    );
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_APP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: `Mind That Seeks Truth <${EMAIL_USER}>`,
    to: EMAIL_NOTIFICATION_RECIPIENT,
    subject: 'Test email notification - Mind That Seeks Truth',
    text: 'This is a test of the configured email notification sender.',
  });

  console.log(`Test email sent: ${info.messageId}`);
}

sendTestEmail().catch((error) => {
  console.error('Failed to send test email:', error.message);
  process.exitCode = 1;
});
