import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

interface InterviewTip {
  id: number;
  title: string;
  category: string;
  content: string;
  video_url: string;
  duration: string;
  thumbnail_url: string;
  views_count: number;
  display_order: number;
  is_active: number;
  created_at: string;
}

// GET - Fetch all active interview tips
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    const category = searchParams.get('category');

    // Build query with filters
    const conditions: string[] = ['is_active = ?'];
    const params: any[] = [1];

    if (category) {
      conditions.push('category = ?');
      params.push(category);
    }

    const whereClause = conditions.join(' AND ');

    // Get interview tips
    let tips: InterviewTip[];
    if (limit) {
      tips = await query<InterviewTip[]>(
        `SELECT * FROM interview_tips WHERE ${whereClause} ORDER BY display_order ASC, created_at DESC LIMIT ?`,
        [...params, parseInt(limit)]
      );
    } else {
      tips = await query<InterviewTip[]>(
        `SELECT * FROM interview_tips WHERE ${whereClause} ORDER BY display_order ASC, created_at DESC`,
        params
      );
    }

    // Format the response
    const result = tips.map(tip => ({
      id: tip.id,
      title: tip.title,
      category: tip.category,
      content: tip.content,
      videoUrl: tip.video_url,
      duration: tip.duration,
      thumbnailUrl: tip.thumbnail_url,
      viewsCount: tip.views_count,
      displayOrder: tip.display_order,
    }));

    // Get unique categories
    const categoriesResult = await query<{ category: string }[]>(
      'SELECT DISTINCT category FROM interview_tips WHERE is_active = 1 AND category IS NOT NULL ORDER BY category'
    );
    const categories = categoriesResult.map(r => r.category);

    return NextResponse.json({
      tips: result,
      total: result.length,
      categories: categories,
    }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch interview tips:', error);
    return NextResponse.json(
      { error: 'Failed to fetch interview tips' },
      { status: 500 }
    );
  }
}
