import nodemailer from 'nodemailer';

// SMTP Configuration
const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
const smtpPort = parseInt(process.env.SMTP_PORT || '465');
const smtpSecure = process.env.SMTP_SECURE === 'true';
const smtpUser = process.env.SMTP_USER || '';
const smtpPassword = process.env.SMTP_PASSWORD || '';
const smtpFrom = process.env.SMTP_FROM || 'noreply@bcdc.com';
const smtpFromName = process.env.SMTP_FROM_NAME || 'BCDC';

// Determine TLS configuration based on port
const useTLS = smtpPort === 587;
const useSSL = smtpPort === 465;

// Create transporter
const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure || useSSL,
  auth: {
    user: smtpUser,
    pass: smtpPassword,
  },
  tls: useTLS
    ? {
        rejectUnauthorized: false, // For self-signed certificates
      }
    : undefined,
  connectionTimeout: 60000,
  greetingTimeout: 30000,
  socketTimeout: 60000,
});

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Send an email using SMTP
 * @param options - Email options (to, subject, html, text)
 * @returns Promise<boolean> - True if sent successfully, false otherwise
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const info = await transporter.sendMail({
      from: `"${smtpFromName}" <${smtpFrom}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      headers: {
        'X-Mailer': 'BCDC Website',
        'X-Priority': '3',
        Importance: 'normal',
        'MIME-Version': '1.0',
        'Reply-To': smtpFrom,
      },
    });

    console.log('✅ Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    return false;
  }
}

/**
 * Verify SMTP connection
 * @returns Promise<boolean> - True if connection is valid, false otherwise
 */
export async function verifyEmailConnection(): Promise<boolean> {
  try {
    await transporter.verify();
    console.log('✅ SMTP connection verified');
    return true;
  } catch (error) {
    console.error('❌ SMTP connection failed:', error);
    return false;
  }
}
