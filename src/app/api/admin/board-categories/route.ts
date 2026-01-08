import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { query } from '@/lib/db';

// GET - List all board categories
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const categories = await query<any[]>(
      'SELECT * FROM executive_board_categories ORDER BY display_order ASC'
    );

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Failed to fetch board categories:', error);
    return NextResponse.json({ error: 'Failed to fetch board categories' }, { status: 500 });
  }
}

// POST - Create new board category
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();

    // Validation
    if (!data.category_name) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
    }

    // Check if category already exists
    const existing = await query<any[]>(
      'SELECT id FROM executive_board_categories WHERE category_name = ?',
      [data.category_name]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'Category already exists' },
        { status: 400 }
      );
    }

    // Get max display order
    const maxOrderResult = await query<any[]>(
      'SELECT COALESCE(MAX(display_order), 0) as max_order FROM executive_board_categories'
    );

    const displayOrder = data.display_order || (maxOrderResult[0].max_order + 1);

    // Insert category
    await query(
      'INSERT INTO executive_board_categories (category_name, display_order) VALUES (?, ?)',
      [data.category_name, displayOrder]
    );

    return NextResponse.json({ success: true, message: 'Category created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Failed to create category:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
