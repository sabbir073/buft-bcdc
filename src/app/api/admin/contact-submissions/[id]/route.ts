import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { query } from '@/lib/db';

// GET - Get single contact submission
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const submissions = await query<any[]>(
      'SELECT * FROM contact_submissions WHERE id = ?',
      [id]
    );

    if (submissions.length === 0) {
      return NextResponse.json(
        { error: 'Contact submission not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(submissions[0]);
  } catch (error) {
    console.error('Failed to fetch contact submission:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact submission' },
      { status: 500 }
    );
  }
}

// PUT - Update contact submission (status, admin_notes)
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
    const body = await request.json();
    const { status, admin_notes } = body;

    // Validate status
    const validStatuses = ['new', 'read', 'replied', 'archived'];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      );
    }

    await query(
      `UPDATE contact_submissions SET
        status = COALESCE(?, status),
        admin_notes = COALESCE(?, admin_notes)
      WHERE id = ?`,
      [status || null, admin_notes !== undefined ? admin_notes : null, id]
    );

    return NextResponse.json({
      success: true,
      message: 'Contact submission updated successfully',
    });
  } catch (error) {
    console.error('Failed to update contact submission:', error);
    return NextResponse.json(
      { error: 'Failed to update contact submission' },
      { status: 500 }
    );
  }
}

// DELETE - Delete contact submission
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
    await query('DELETE FROM contact_submissions WHERE id = ?', [id]);

    return NextResponse.json({
      success: true,
      message: 'Contact submission deleted successfully',
    });
  } catch (error) {
    console.error('Failed to delete contact submission:', error);
    return NextResponse.json(
      { error: 'Failed to delete contact submission' },
      { status: 500 }
    );
  }
}
