import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { headers } from 'next/headers';

// POST - Submit contact form
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Name, email, subject, and message are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Get IP address
    const headersList = await headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    const ip_address = forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown';

    // Insert into database
    await query(
      `INSERT INTO contact_submissions (name, email, phone, subject, message, ip_address, status)
       VALUES (?, ?, ?, ?, ?, ?, 'new')`,
      [name, email, phone || null, subject, message, ip_address]
    );

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon.',
    });
  } catch (error) {
    console.error('Failed to submit contact form:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
