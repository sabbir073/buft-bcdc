import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { query } from '@/lib/db';
import { uploadToFTP } from '@/lib/ftp-upload';

// GET - List all interview tips
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const tips = await query<any[]>(
      'SELECT * FROM interview_tips ORDER BY display_order ASC, created_at DESC'
    );

    return NextResponse.json(tips);
  } catch (error) {
    console.error('Failed to fetch interview tips:', error);
    return NextResponse.json({ error: 'Failed to fetch interview tips' }, { status: 500 });
  }
}

// POST - Create new interview tip with optional thumbnail upload
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();

    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const category = formData.get('category') as string;
    const video_url = formData.get('video_url') as string;
    const duration = formData.get('duration') as string;
    const display_order_input = formData.get('display_order') as string;
    const is_active = formData.get('is_active') === 'true';

    // Validation
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Auto-generate display_order if not provided (get max + 1)
    let display_order = parseInt(display_order_input) || 0;
    if (!display_order_input || display_order === 0) {
      const maxOrderResult = await query<{ max_order: number | null }[]>(
        'SELECT MAX(display_order) as max_order FROM interview_tips'
      );
      display_order = (maxOrderResult[0]?.max_order || 0) + 1;
    }

    let thumbnail_url: string | null = null;

    // Handle thumbnail upload if provided
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

    // Insert tip with video fields
    await query(
      `INSERT INTO interview_tips
      (title, content, category, video_url, duration, thumbnail_url, views_count, display_order, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        content,
        category || null,
        video_url || null,
        duration || null,
        thumbnail_url,
        0,
        display_order,
        is_active ? 1 : 0
      ]
    );

    return NextResponse.json({ success: true, message: 'Interview tip created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Failed to create interview tip:', error);
    return NextResponse.json({ error: 'Failed to create interview tip' }, { status: 500 });
  }
}
