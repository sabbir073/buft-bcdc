import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { query } from '@/lib/db';

// GET - List all membership submissions
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const memberships = await query<any[]>(
      'SELECT * FROM membership_submissions ORDER BY created_at DESC'
    );

    return NextResponse.json(memberships);
  } catch (error) {
    console.error('Failed to fetch memberships:', error);
    return NextResponse.json({ error: 'Failed to fetch memberships' }, { status: 500 });
  }
}

// POST - Create new membership (rarely used from admin, but available)
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();

    // Validation
    if (!data.name || !data.email || !data.student_id || !data.department || !data.batch || !data.phone) {
      return NextResponse.json(
        { error: 'Name, email, student ID, department, batch, and phone are required' },
        { status: 400 }
      );
    }

    // Insert membership
    await query(
      'INSERT INTO membership_submissions (name, email, student_id, department, batch, phone, why_join, ip_address, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [data.name, data.email, data.student_id, data.department, data.batch, data.phone, data.why_join || '', data.ip_address || null, data.status || 'new']
    );

    return NextResponse.json({ success: true, message: 'Membership created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Failed to create membership:', error);
    return NextResponse.json({ error: 'Failed to create membership' }, { status: 500 });
  }
}
