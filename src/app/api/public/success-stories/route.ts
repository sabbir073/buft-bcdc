import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

interface SuccessStory {
  id: number;
  member_name: string;
  designation: string | null;
  company: string | null;
  testimonial: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

// GET - Fetch success stories (public) with pagination support
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    const page = searchParams.get('page');
    const perPage = parseInt(searchParams.get('per_page') || '12');

    // If page is provided, use pagination
    if (page) {
      const pageNum = parseInt(page);
      const offset = (pageNum - 1) * perPage;

      // Get total count
      const countResult = await query<any[]>('SELECT COUNT(*) as total FROM success_stories');
      const total = countResult[0].total;

      // Get paginated stories
      const stories = await query<SuccessStory[]>(
        'SELECT * FROM success_stories ORDER BY created_at DESC LIMIT ? OFFSET ?',
        [perPage, offset]
      );

      const result = stories.map(story => ({
        id: story.id,
        name: story.member_name,
        role: story.designation || 'Member',
        text: story.testimonial,
        rating: 5,
        image: story.image_url,
        designation: story.designation,
        company: story.company || 'BCDC Alumni',
        testimonial: story.testimonial,
        imageUrl: story.image_url,
        date: new Date(story.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
      }));

      return NextResponse.json({
        success: true,
        data: result,
        stories: result,
        pagination: {
          page: pageNum,
          perPage,
          total,
          totalPages: Math.ceil(total / perPage),
        },
      }, { status: 200 });
    }

    // Build query without pagination (for home page)
    let sqlQuery = 'SELECT * FROM success_stories ORDER BY created_at DESC';
    const params: any[] = [];

    if (limit) {
      sqlQuery += ' LIMIT ?';
      params.push(parseInt(limit));
    }

    const stories = await query<SuccessStory[]>(sqlQuery, params);

    // Transform to match frontend interfaces
    // Home page Testimonials component expects: name, role, company, text, rating, image, batch
    // Career resources page expects: name, designation, company, testimonial, imageUrl, date
    const result = stories.map(story => ({
      id: story.id,
      name: story.member_name,
      // For home page Testimonials component
      role: story.designation || 'Member',
      text: story.testimonial,
      rating: 5, // Default 5 stars for all testimonials
      image: story.image_url,
      // For career resources page
      designation: story.designation,
      company: story.company || 'BCDC Alumni',
      testimonial: story.testimonial,
      imageUrl: story.image_url,
      date: new Date(story.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
    }));

    return NextResponse.json({
      success: true,
      data: result, // For home page Testimonials component
      stories: result, // For career resources page
      total: result.length,
    }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch success stories:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch success stories'
      },
      { status: 500 }
    );
  }
}
