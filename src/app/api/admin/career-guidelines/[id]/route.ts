import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { query } from '@/lib/db';
import { uploadToFTP } from '@/lib/ftp-upload';

// PUT - Update career guideline with optional thumbnail upload
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
    const content = formData.get('content') as string;
    const category = formData.get('category') as string;
    const excerpt = formData.get('excerpt') as string;
    const author = formData.get('author') as string;
    const read_time = parseInt(formData.get('read_time') as string) || 5;
    const video_url = formData.get('video_url') as string;
    const video_title = formData.get('video_title') as string;
    const display_order = parseInt(formData.get('display_order') as string) || 0;
    const is_active = formData.get('is_active') === 'true';
    const views_count = parseInt(formData.get('views_count') as string) || 0;
    const existing_thumbnail_url = formData.get('existing_thumbnail_url') as string;

    // Validation
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    let thumbnail_url: string | null = existing_thumbnail_url || null;

    // Handle new thumbnail upload if provided
    const thumbnailFile = formData.get('thumbnail') as File;
    if (thumbnailFile && thumbnailFile.size > 0) {
      // Validate file type (images only)
      if (!thumbnailFile.type.startsWith('image/')) {
        return NextResponse.json(
          { error: 'Only image files are allowed for thumbnail' },
          { status: 400 }
        );
      }

      // Upload to FTP (uploads/guidelines folder)
      const result = await uploadToFTP({ file: thumbnailFile, folder: 'guidelines' });

      if (!result.success) {
        return NextResponse.json(
          { error: result.error || 'Thumbnail upload failed' },
          { status: 500 }
        );
      }

      thumbnail_url = result.url!;
    }

    // Update guideline
    await query(
      `UPDATE career_guidelines SET
        title = ?,
        content = ?,
        category = ?,
        excerpt = ?,
        author = ?,
        read_time = ?,
        thumbnail_url = ?,
        video_url = ?,
        video_title = ?,
        views_count = ?,
        display_order = ?,
        is_active = ?
      WHERE id = ?`,
      [
        title,
        content,
        category || null,
        excerpt || null,
        author || null,
        read_time,
        thumbnail_url,
        video_url || null,
        video_title || null,
        views_count,
        display_order,
        is_active ? 1 : 0,
        id
      ]
    );

    return NextResponse.json({ success: true, message: 'Career guideline updated successfully' });
  } catch (error) {
    console.error('Failed to update career guideline:', error);
    return NextResponse.json({ error: 'Failed to update career guideline' }, { status: 500 });
  }
}

// DELETE - Delete career guideline
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
    await query('DELETE FROM career_guidelines WHERE id = ?', [id]);

    return NextResponse.json({ success: true, message: 'Career guideline deleted successfully' });
  } catch (error) {
    console.error('Failed to delete career guideline:', error);
    return NextResponse.json({ error: 'Failed to delete career guideline' }, { status: 500 });
  }
}
