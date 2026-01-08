import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

interface Activity {
  id: number;
  title: string;
  date: string;
  description: string;
  is_featured: number;
  created_at: string;
}

interface ActivityImage {
  id: number;
  activity_id: number;
  image_url: string;
  display_order: number;
}

// GET - Fetch all published activities with images
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featuredOnly = searchParams.get('featured') === 'true';
    const limit = searchParams.get('limit');
    const offset = searchParams.get('offset');
    const search = searchParams.get('search') || '';
    const year = searchParams.get('year') || '';

    // Build query with pagination and filters
    let activities: Activity[];
    let totalCount: number;

    // Build WHERE clause based on filters
    const conditions: string[] = [];
    const params: any[] = [];

    if (featuredOnly) {
      conditions.push('is_featured = ?');
      params.push(1);
    }

    if (search) {
      conditions.push('title LIKE ?');
      params.push(`%${search}%`);
    }

    if (year) {
      conditions.push('YEAR(date) = ?');
      params.push(year);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Get total count
    const countResult = await query<{ count: number }[]>(
      `SELECT COUNT(*) as count FROM activities ${whereClause}`,
      params
    );
    totalCount = countResult[0].count;

    // Get paginated activities
    if (limit && offset) {
      activities = await query<Activity[]>(
        `SELECT * FROM activities ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
        [...params, parseInt(limit), parseInt(offset)]
      );
    } else {
      activities = await query<Activity[]>(
        `SELECT * FROM activities ${whereClause} ORDER BY created_at DESC`,
        params
      );
    }

    // Fetch images for all activities
    const activityIds = activities.map(a => a.id);

    let images: ActivityImage[] = [];
    if (activityIds.length > 0) {
      const placeholders = activityIds.map(() => '?').join(',');
      images = await query<ActivityImage[]>(
        `SELECT * FROM activity_images WHERE activity_id IN (${placeholders}) ORDER BY activity_id, display_order`,
        activityIds
      );
    }

    // Group images by activity
    const imagesByActivity = images.reduce((acc, img) => {
      if (!acc[img.activity_id]) {
        acc[img.activity_id] = [];
      }
      acc[img.activity_id].push(img.image_url);
      return acc;
    }, {} as Record<number, string[]>);

    // Combine activities with images and format date
    const result = activities.map(activity => {
      // Format date from "2018-07-15" to "15 July, 2018"
      let formattedDate = activity.date;
      try {
        const date = new Date(activity.date);
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                            'July', 'August', 'September', 'October', 'November', 'December'];
        formattedDate = `${date.getDate()} ${monthNames[date.getMonth()]}, ${date.getFullYear()}`;
      } catch (e) {
        // Keep original if parsing fails
      }

      return {
        id: activity.id,
        title: activity.title,
        date: formattedDate,
        description: activity.description,
        featured: activity.is_featured === 1,
        images: imagesByActivity[activity.id] || [],
        imageCount: (imagesByActivity[activity.id] || []).length,
      };
    });

    // Get available years for filter
    const yearsResult = await query<{ year: number }[]>(
      'SELECT DISTINCT YEAR(date) as year FROM activities WHERE date IS NOT NULL ORDER BY year DESC'
    );
    const years = yearsResult.map(r => r.year);

    // Return with pagination metadata
    const response = {
      activities: result,
      total: totalCount,
      hasMore: limit && offset ? (parseInt(offset) + parseInt(limit)) < totalCount : false,
      years: years,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch activities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    );
  }
}
