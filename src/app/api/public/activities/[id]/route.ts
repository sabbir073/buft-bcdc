import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

interface Activity {
  id: number;
  title: string;
  date: string;
  description: string;
  location: string | null;
  is_featured: number;
  created_at: string;
}

interface ActivityImage {
  id: number;
  activity_id: number;
  image_url: string;
  display_order: number;
}

// GET - Fetch single activity by ID with images
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const activityId = parseInt(id);

    if (isNaN(activityId)) {
      return NextResponse.json(
        { error: 'Invalid activity ID' },
        { status: 400 }
      );
    }

    // Fetch activity
    const activities = await query<Activity[]>(
      'SELECT * FROM activities WHERE id = ?',
      [activityId]
    );

    if (activities.length === 0) {
      return NextResponse.json(
        { error: 'Activity not found' },
        { status: 404 }
      );
    }

    const activity = activities[0];

    // Fetch images for the activity
    const images = await query<ActivityImage[]>(
      'SELECT image_url FROM activity_images WHERE activity_id = ? ORDER BY display_order ASC',
      [activityId]
    );

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

    const result = {
      id: activity.id,
      title: activity.title,
      date: formattedDate,
      description: activity.description,
      location: activity.location,
      featured: activity.is_featured === 1,
      images: images.map(img => img.image_url),
      imageCount: images.length,
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch activity:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activity' },
      { status: 500 }
    );
  }
}
