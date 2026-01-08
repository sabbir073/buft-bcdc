import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { query } from '@/lib/db';

// PUT - Update board category
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
    if (!data.category_name) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
    }

    // Check if category name already exists for other categories
    const existing = await query<any[]>(
      'SELECT id FROM executive_board_categories WHERE category_name = ? AND id != ?',
      [data.category_name, id]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'Category name already exists' },
        { status: 400 }
      );
    }

    // Update category
    await query(
      'UPDATE executive_board_categories SET category_name = ?, display_order = ? WHERE id = ?',
      [data.category_name, data.display_order, id]
    );

    return NextResponse.json({ success: true, message: 'Category updated successfully' });
  } catch (error) {
    console.error('Failed to update category:', error);
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}

// DELETE - Delete board category
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
    // Check if category has members
    const members = await query<any[]>(
      'SELECT id FROM executive_board_members WHERE category_id = ?',
      [id]
    );

    if (members.length > 0) {
      return NextResponse.json(
        { error: `Cannot delete category with ${members.length} member(s). Please delete or reassign members first.` },
        { status: 400 }
      );
    }

    // Delete category
    await query('DELETE FROM executive_board_categories WHERE id = ?', [id]);

    return NextResponse.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Failed to delete category:', error);
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
