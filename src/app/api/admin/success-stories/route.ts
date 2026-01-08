import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { query } from '@/lib/db';
import { uploadToFTP } from '@/lib/ftp';
import { v4 as uuidv4 } from 'uuid';
import { promises as fs } from 'fs';
import os from 'os';
import path from 'path';

// GET - List success stories with pagination
export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const offset = (page - 1) * limit;

    // Get total count
    const countResult = await query<any[]>('SELECT COUNT(*) as total FROM success_stories');
    const total = countResult[0].total;

    // Get paginated stories
    const stories = await query<any[]>(
      'SELECT * FROM success_stories ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );

    return NextResponse.json({
      stories,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Failed to fetch success stories:', error);
    return NextResponse.json({ error: 'Failed to fetch success stories' }, { status: 500 });
  }
}

// POST - Create new success story with image upload
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();

    const member_name = formData.get('member_name') as string;
    const designation = formData.get('designation') as string;
    const company = formData.get('company') as string;
    const testimonial = formData.get('testimonial') as string;

    // Validation
    if (!member_name || !testimonial) {
      return NextResponse.json(
        { error: 'Member name and testimonial are required' },
        { status: 400 }
      );
    }

    let imageUrl: string | null = null;

    // Handle image upload
    const imageFile = formData.get('image') as File;
    if (imageFile && imageFile.size > 0) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(imageFile.type)) {
        return NextResponse.json(
          { error: 'Invalid image type. Only JPEG, PNG, and WebP are allowed.' },
          { status: 400 }
        );
      }

      // Generate unique filename
      const ext = path.extname(imageFile.name);
      const uniqueName = `success-story-${uuidv4()}${ext}`;

      // Save to temp
      const tempPath = path.join(os.tmpdir(), uniqueName);
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      await fs.writeFile(tempPath, buffer);

      try {
        // Upload to FTP
        imageUrl = await uploadToFTP(tempPath, uniqueName, 'success-stories');
      } finally {
        // Clean up temp file
        try {
          await fs.unlink(tempPath);
        } catch (unlinkError) {
          console.error('Failed to delete temp file:', unlinkError);
        }
      }
    }

    // Insert story
    await query(
      'INSERT INTO success_stories (member_name, designation, company, testimonial, image_url) VALUES (?, ?, ?, ?, ?)',
      [member_name, designation || null, company || null, testimonial, imageUrl]
    );

    return NextResponse.json({
      success: true,
      message: 'Success story created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Failed to create success story:', error);
    return NextResponse.json({ error: 'Failed to create success story' }, { status: 500 });
  }
}
