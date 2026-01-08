import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// POST - Increment download count for a CV template
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Increment download count
    await query(
      'UPDATE cv_templates SET download_count = download_count + 1 WHERE id = ?',
      [id]
    );

    // Get updated count
    const result = await query<{ download_count: number }[]>(
      'SELECT download_count FROM cv_templates WHERE id = ?',
      [id]
    );

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Template not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      downloads: result[0].download_count,
    });
  } catch (error) {
    console.error('Failed to track download:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to track download' },
      { status: 500 }
    );
  }
}
