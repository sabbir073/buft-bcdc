import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { query } from '@/lib/db';
import { uploadMultipleToFTP } from '@/lib/ftp-upload';

// GET - List all activities with their images
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const activities = await query<any[]>(
      'SELECT * FROM activities ORDER BY created_at DESC'
    );

    // Fetch images for each activity
    for (const activity of activities) {
      const images = await query<any[]>(
        'SELECT id, image_url, display_order FROM activity_images WHERE activity_id = ? ORDER BY display_order ASC',
        [activity.id]
      );
      activity.images = images;
    }

    return NextResponse.json(activities);
  } catch (error) {
    console.error('Failed to fetch activities:', error);
    return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 });
  }
}

// POST - Create new activity with images
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const date = formData.get('date') as string;
    const location = formData.get('location') as string;
    const is_featured = formData.get('is_featured') === 'true';

    // Validation
    if (!title || !description || !date) {
      return NextResponse.json(
        { error: 'Title, description, and date are required' },
        { status: 400 }
      );
    }

    // Insert activity
    const result = await query<any>(
      'INSERT INTO activities (title, description, date, location, is_featured) VALUES (?, ?, ?, ?, ?)',
      [title, description, date, location || null, is_featured]
    );

    const activityId = result.insertId;

    // Handle image uploads
    const images = formData.getAll('images') as File[];

    if (images.length > 0) {
      // Validate file types
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      const validImages = images.filter(file =>
        file.size > 0 && allowedTypes.includes(file.type)
      );

      if (validImages.length > 0) {
        // Upload all images to FTP (uploads/activities folder)
        const { urls, errors } = await uploadMultipleToFTP(validImages, 'activities');

        if (errors.length > 0) {
          console.error('Some images failed to upload:', errors);
        }

        // Save uploaded URLs to database
        let displayOrder = 1;
        for (const imageUrl of urls) {
          await query(
            'INSERT INTO activity_images (activity_id, image_url, display_order) VALUES (?, ?, ?)',
            [activityId, imageUrl, displayOrder]
          );
          displayOrder++;
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Activity created successfully',
      activityId
    }, { status: 201 });
  } catch (error) {
    console.error('Failed to create activity:', error);
    return NextResponse.json({ error: 'Failed to create activity' }, { status: 500 });
  }
}
