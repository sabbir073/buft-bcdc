import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { query } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

// PUT - Update user
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const data = await request.json();

    // Validation
    if (!data.username || !data.email || !data.full_name) {
      return NextResponse.json(
        { error: 'Username, email, and full name are required' },
        { status: 400 }
      );
    }

    // Check if username or email already exists for other users
    const existing = await query<any[]>(
      'SELECT id FROM admin_users WHERE (username = ? OR email = ?) AND id != ?',
      [data.username, data.email, id]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'Username or email already exists' },
        { status: 400 }
      );
    }

    // If password is being updated, hash it
    if (data.password && data.password.trim() !== '') {
      const hashedPassword = await hashPassword(data.password);
      await query(
        'UPDATE admin_users SET username = ?, email = ?, password = ?, full_name = ?, status = ? WHERE id = ?',
        [data.username, data.email, hashedPassword, data.full_name, data.status || 'active', id]
      );
    } else {
      await query(
        'UPDATE admin_users SET username = ?, email = ?, full_name = ?, status = ? WHERE id = ?',
        [data.username, data.email, data.full_name, data.status || 'active', id]
      );
    }

    return NextResponse.json({ success: true, message: 'User updated successfully' });
  } catch (error) {
    console.error('Failed to update user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

// DELETE - Delete user
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    // Prevent deleting yourself
    const currentUserId = (session.user as any).id;
    if (id === currentUserId.toString()) {
      return NextResponse.json(
        { error: 'You cannot delete your own account' },
        { status: 400 }
      );
    }

    await query('DELETE FROM admin_users WHERE id = ?', [id]);

    return NextResponse.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Failed to delete user:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
