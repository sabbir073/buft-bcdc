import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

interface CareerGuideline {
  id: number;
  title: string;
  content: string;
  category: string | null;
  excerpt: string | null;
  author: string | null;
  read_time: number | null;
  thumbnail_url: string | null;
  video_url: string | null;
  video_title: string | null;
  views_count: number;
  display_order: number;
  is_active: number;
  created_at: string;
  updated_at: string;
}

// GET - Fetch all active career guidelines (public)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = searchParams.get('limit');
    const page = searchParams.get('page');

    // Build query - only fetch active guidelines
    const conditions: string[] = ['is_active = 1'];
    const params: any[] = [];

    if (category) {
      conditions.push('category = ?');
      params.push(category);
    }

    const whereClause = conditions.join(' AND ');

    // Get total count for pagination
    const countResult = await query<{ total: number }[]>(
      `SELECT COUNT(*) as total FROM career_guidelines WHERE ${whereClause}`,
      params
    );
    const total = countResult[0]?.total || 0;

    // Build main query with ordering
    let sqlQuery = `SELECT * FROM career_guidelines WHERE ${whereClause} ORDER BY display_order ASC, created_at DESC`;

    // Handle pagination or limit
    if (page && limit) {
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      const offset = (pageNum - 1) * limitNum;
      sqlQuery += ` LIMIT ? OFFSET ?`;
      params.push(limitNum, offset);
    } else if (limit) {
      sqlQuery += ` LIMIT ?`;
      params.push(parseInt(limit));
    }

    const guidelines = await query<CareerGuideline[]>(sqlQuery, params);

    // Transform to match frontend interface
    const result = guidelines.map(guide => ({
      id: guide.id,
      title: guide.title,
      content: guide.content,
      category: guide.category,
      excerpt: guide.excerpt || guide.content.substring(0, 200) + '...',
      author: guide.author || 'BCDC Career Team',
      readTime: guide.read_time ? `${guide.read_time} min read` : '5 min read',
      thumbnailUrl: guide.thumbnail_url,
      videoUrl: guide.video_url,
      videoTitle: guide.video_title,
      viewsCount: guide.views_count,
      displayOrder: guide.display_order,
      date: new Date(guide.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
    }));

    // Get unique categories for filtering
    const categoriesResult = await query<{ category: string }[]>(
      'SELECT DISTINCT category FROM career_guidelines WHERE is_active = 1 AND category IS NOT NULL ORDER BY category'
    );
    const categories = categoriesResult.map(r => r.category);

    // Calculate pagination info
    const totalPages = limit ? Math.ceil(total / parseInt(limit)) : 1;
    const currentPage = page ? parseInt(page) : 1;

    return NextResponse.json({
      success: true,
      guidelines: result,
      total: total,
      categories: categories,
      pagination: {
        currentPage,
        totalPages,
        perPage: limit ? parseInt(limit) : total,
        hasMore: currentPage < totalPages,
      },
    }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch career guidelines:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch career guidelines'
      },
      { status: 500 }
    );
  }
}
