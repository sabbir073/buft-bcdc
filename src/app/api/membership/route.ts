import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// POST - Submit membership application (Public endpoint)
export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validation
    if (!data.name || !data.email || !data.studentId || !data.department || !data.batch || !data.phone) {
      return NextResponse.json(
        { error: 'Name, email, student ID, department, batch, and phone are required' },
        { status: 400 }
      );
    }

    // Get IP address from request headers
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || null;

    // Insert membership submission
    await query(
      'INSERT INTO membership_submissions (name, email, student_id, department, batch, phone, why_join, ip_address, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        data.name,
        data.email,
        data.studentId,
        data.department,
        data.batch,
        data.phone,
        data.whyJoin || '',
        ip,
        'new'
      ]
    );

    // TODO: Send confirmation email to user
    // await sendEmail({
    //   to: data.email,
    //   subject: 'BCDC Membership Application Received',
    //   html: membershipConfirmationEmail(data.name)
    // });

    return NextResponse.json({
      success: true,
      message: 'Membership application submitted successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Failed to submit membership application:', error);
    return NextResponse.json(
      { error: 'Failed to submit application. Please try again later.' },
      { status: 500 }
    );
  }
}
