import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { query } from '@/lib/db';
import { uploadToFTP, deleteFromFTP } from '@/lib/ftp';
import { v4 as uuidv4 } from 'uuid';
import { promises as fs } from 'fs';
import os from 'os';
import path from 'path';

// PUT - Update success story
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

    // Get current story
    const currentStory = await query<any[]>(
      'SELECT image_url FROM success_stories WHERE id = ?',
      [id]
    );

    if (currentStory.length === 0) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    let imageUrl = currentStory[0].image_url;

    // Handle new image upload
    const newImageFile = formData.get('newImage') as File;
    if (newImageFile && newImageFile.size > 0) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(newImageFile.type)) {
        return NextResponse.json(
          { error: 'Invalid image type. Only JPEG, PNG, and WebP are allowed.' },
          { status: 400 }
        );
      }

      // Delete old image from FTP if exists
      if (imageUrl) {
        try {
          const oldFilename = imageUrl.split('/').pop();
          await deleteFromFTP(oldFilename, 'success-stories');
        } catch (ftpError) {
          console.error('Failed to delete old image from FTP:', ftpError);
        }
      }

      // Generate unique filename
      const ext = path.extname(newImageFile.name);
      const uniqueName = `success-story-${uuidv4()}${ext}`;

      // Save to temp
      const tempPath = path.join(os.tmpdir(), uniqueName);
      const buffer = Buffer.from(await newImageFile.arrayBuffer());
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

    // Update story
    await query(
      'UPDATE success_stories SET member_name = ?, designation = ?, company = ?, testimonial = ?, image_url = ? WHERE id = ?',
      [member_name, designation || null, company || null, testimonial, imageUrl, id]
    );

    return NextResponse.json({ success: true, message: 'Success story updated successfully' });
  } catch (error) {
    console.error('Failed to update success story:', error);
    return NextResponse.json({ error: 'Failed to update success story' }, { status: 500 });
  }
}

// DELETE - Delete success story and image
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
    // Get story image URL
    const story = await query<any[]>(
      'SELECT image_url FROM success_stories WHERE id = ?',
      [id]
    );

    if (story.length === 0) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    // Delete image from FTP if exists
    if (story[0].image_url) {
      try {
        const filename = story[0].image_url.split('/').pop();
        await deleteFromFTP(filename, 'success-stories');
      } catch (ftpError) {
        console.error('Failed to delete image from FTP:', ftpError);
        // Continue with deletion even if FTP fails
      }
    }

    // Delete story
    await query('DELETE FROM success_stories WHERE id = ?', [id]);

    return NextResponse.json({ success: true, message: 'Success story deleted successfully' });
  } catch (error) {
    console.error('Failed to delete success story:', error);
    return NextResponse.json({ error: 'Failed to delete success story' }, { status: 500 });
  }
}
