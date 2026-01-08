import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { query } from '@/lib/db';
import { uploadToFTP } from '@/lib/ftp-upload';

// GET - List all career guidelines
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const guidelines = await query<any[]>(
      'SELECT * FROM career_guidelines ORDER BY display_order ASC, created_at DESC'
    );

    return NextResponse.json(guidelines);
  } catch (error) {
    console.error('Failed to fetch career guidelines:', error);
    return NextResponse.json({ error: 'Failed to fetch career guidelines' }, { status: 500 });
  }
}

// POST - Create new career guideline with optional thumbnail upload
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
    const excerpt = formData.get('excerpt') as string;
    const author = formData.get('author') as string;
    const read_time = parseInt(formData.get('read_time') as string) || 5;
    const video_url = formData.get('video_url') as string;
    const video_title = formData.get('video_title') as string;
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
        'SELECT MAX(display_order) as max_order FROM career_guidelines'
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

    // Insert guideline
    await query(
      `INSERT INTO career_guidelines
      (title, content, category, excerpt, author, read_time, thumbnail_url, video_url, video_title, views_count, display_order, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
        0,
        display_order,
        is_active ? 1 : 0
      ]
    );

    return NextResponse.json({ success: true, message: 'Career guideline created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Failed to create career guideline:', error);
    return NextResponse.json({ error: 'Failed to create career guideline' }, { status: 500 });
  }
}
