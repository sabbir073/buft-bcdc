import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { query } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

// GET - List all users
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const users = await query<any[]>(
      'SELECT id, username, email, full_name, status, created_at, last_login FROM admin_users ORDER BY created_at DESC'
    );

    return NextResponse.json(users);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// POST - Create new user
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();

    // Validation
    if (!data.username || !data.email || !data.password || !data.full_name) {
      return NextResponse.json(
        { error: 'Username, email, password, and full name are required' },
        { status: 400 }
      );
    }

    // Check if username or email already exists
    const existing = await query<any[]>(
      'SELECT id FROM admin_users WHERE username = ? OR email = ?',
      [data.username, data.email]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'Username or email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(data.password);

    // Insert user
    await query(
      'INSERT INTO admin_users (username, email, password, full_name, status) VALUES (?, ?, ?, ?, ?)',
      [data.username, data.email, hashedPassword, data.full_name, data.status || 'active']
    );

    return NextResponse.json({ success: true, message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Failed to create user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
