import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { query } from '@/lib/db';
import { uploadToFTP } from '@/lib/ftp-upload';

// PUT - Update interview tip with optional thumbnail upload
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
    const video_url = formData.get('video_url') as string;
    const duration = formData.get('duration') as string;
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

      // Upload to FTP (uploads/thumbnails folder)
      const result = await uploadToFTP({ file: thumbnailFile, folder: 'thumbnails' });

      if (!result.success) {
        return NextResponse.json(
          { error: result.error || 'Thumbnail upload failed' },
          { status: 500 }
        );
      }

      thumbnail_url = result.url!;
    }

    // Update tip with video fields
    await query(
      `UPDATE interview_tips SET
        title = ?,
        content = ?,
        category = ?,
        video_url = ?,
        duration = ?,
        thumbnail_url = ?,
        views_count = ?,
        display_order = ?,
        is_active = ?
      WHERE id = ?`,
      [
        title,
        content,
        category || null,
        video_url || null,
        duration || null,
        thumbnail_url,
        views_count,
        display_order,
        is_active ? 1 : 0,
        id
      ]
    );

    return NextResponse.json({ success: true, message: 'Interview tip updated successfully' });
  } catch (error) {
    console.error('Failed to update interview tip:', error);
    return NextResponse.json({ error: 'Failed to update interview tip' }, { status: 500 });
  }
}

// DELETE - Delete interview tip
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
    await query('DELETE FROM interview_tips WHERE id = ?', [id]);

    return NextResponse.json({ success: true, message: 'Interview tip deleted successfully' });
  } catch (error) {
    console.error('Failed to delete interview tip:', error);
    return NextResponse.json({ error: 'Failed to delete interview tip' }, { status: 500 });
  }
}
