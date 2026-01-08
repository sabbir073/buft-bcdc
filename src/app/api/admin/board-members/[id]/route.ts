import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { query } from '@/lib/db';
import { uploadToFTP } from '@/lib/ftp-upload';

// PUT - Update board member
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

    const name = formData.get('name') as string;
    const position = formData.get('position') as string;
    const category_id = formData.get('category_id') as string;
    const facebook_url = formData.get('facebook_url') as string;
    const linkedin_url = formData.get('linkedin_url') as string;
    const display_order = formData.get('display_order') as string;

    // Validation
    if (!name || !position || !category_id) {
      return NextResponse.json(
        { error: 'Name, position, and category are required' },
        { status: 400 }
      );
    }

    // Get current member data
    const currentMember = await query<any[]>(
      'SELECT image_url FROM executive_board_members WHERE id = ?',
      [id]
    );

    if (currentMember.length === 0) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    let imageUrl = currentMember[0].image_url;

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

      // Upload to FTP (uploads/executives folder)
      const result = await uploadToFTP({ file: newImageFile, folder: 'executives' });

      if (!result.success) {
        return NextResponse.json(
          { error: result.error || 'Image upload failed' },
          { status: 500 }
        );
      }

      imageUrl = result.url || imageUrl;
      // Note: Old image remains on FTP server - manual cleanup if needed
    }

    // Update member
    await query(
      'UPDATE executive_board_members SET name = ?, position = ?, category_id = ?, image_url = ?, facebook_url = ?, linkedin_url = ?, display_order = ? WHERE id = ?',
      [
        name,
        position,
        category_id,
        imageUrl,
        facebook_url || null,
        linkedin_url || null,
        display_order || 1,
        id
      ]
    );

    return NextResponse.json({ success: true, message: 'Board member updated successfully' });
  } catch (error) {
    console.error('Failed to update board member:', error);
    return NextResponse.json({ error: 'Failed to update board member' }, { status: 500 });
  }
}

// DELETE - Delete board member and image
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
    // Delete member
    await query('DELETE FROM executive_board_members WHERE id = ?', [id]);

    // Note: Images remain on FTP server - manual cleanup required if needed

    return NextResponse.json({ success: true, message: 'Board member deleted successfully' });
  } catch (error) {
    console.error('Failed to delete board member:', error);
    return NextResponse.json({ error: 'Failed to delete board member' }, { status: 500 });
  }
}
