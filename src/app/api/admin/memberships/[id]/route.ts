import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { query } from '@/lib/db';

// PUT - Update membership status
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

    await query(
      'UPDATE membership_submissions SET status = ? WHERE id = ?',
      [data.status, id]
    );

    return NextResponse.json({ success: true, message: 'Membership updated successfully' });
  } catch (error) {
    console.error('Failed to update membership:', error);
    return NextResponse.json({ error: 'Failed to update membership' }, { status: 500 });
  }
}

// DELETE - Delete membership
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
    await query('DELETE FROM membership_submissions WHERE id = ?', [id]);

    return NextResponse.json({ success: true, message: 'Membership deleted successfully' });
  } catch (error) {
    console.error('Failed to delete membership:', error);
    return NextResponse.json({ error: 'Failed to delete membership' }, { status: 500 });
  }
}
