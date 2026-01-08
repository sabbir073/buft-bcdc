import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// POST - Increment view count for an interview tip
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Increment view count
    await query(
      'UPDATE interview_tips SET views_count = views_count + 1 WHERE id = ?',
      [id]
    );

    // Get updated count
    const result = await query<{ views_count: number }[]>(
      'SELECT views_count FROM interview_tips WHERE id = ?',
      [id]
    );

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Interview tip not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      viewsCount: result[0].views_count,
    });
  } catch (error) {
    console.error('Failed to track view:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to track view' },
      { status: 500 }
    );
  }
}
