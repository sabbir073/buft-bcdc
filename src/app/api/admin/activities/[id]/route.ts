import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { query } from '@/lib/db';
import { uploadMultipleToFTP } from '@/lib/ftp-upload';

// PUT - Update activity
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

    // Update activity
    await query(
      'UPDATE activities SET title = ?, description = ?, date = ?, location = ?, is_featured = ? WHERE id = ?',
      [title, description, date, location || null, is_featured, id]
    );

    // Handle new image uploads
    const newImages = formData.getAll('newImages') as File[];

    if (newImages.length > 0) {
      // Validate file types
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      const validImages = newImages.filter(file =>
        file.size > 0 && allowedTypes.includes(file.type)
      );

      if (validImages.length > 0) {
        // Upload all images to FTP (uploads/activities folder)
        const { urls, errors } = await uploadMultipleToFTP(validImages, 'activities');

        if (errors.length > 0) {
          console.error('Some images failed to upload:', errors);
        }

        // Get current max display order
        const maxOrderResult = await query<any[]>(
          'SELECT COALESCE(MAX(display_order), 0) as max_order FROM activity_images WHERE activity_id = ?',
          [id]
        );

        let displayOrder = maxOrderResult[0].max_order + 1;

        // Save uploaded URLs to database
        for (const imageUrl of urls) {
          await query(
            'INSERT INTO activity_images (activity_id, image_url, display_order) VALUES (?, ?, ?)',
            [id, imageUrl, displayOrder]
          );
          displayOrder++;
        }
      }
    }

    return NextResponse.json({ success: true, message: 'Activity updated successfully' });
  } catch (error) {
    console.error('Failed to update activity:', error);
    return NextResponse.json({ error: 'Failed to update activity' }, { status: 500 });
  }
}

// DELETE - Delete activity and its images
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
    // Delete image records (cascade will handle this if foreign key is set)
    await query('DELETE FROM activity_images WHERE activity_id = ?', [id]);

    // Delete activity
    await query('DELETE FROM activities WHERE id = ?', [id]);

    // Note: Images remain on FTP server - manual cleanup required if needed

    return NextResponse.json({ success: true, message: 'Activity deleted successfully' });
  } catch (error) {
    console.error('Failed to delete activity:', error);
    return NextResponse.json({ error: 'Failed to delete activity' }, { status: 500 });
  }
}
