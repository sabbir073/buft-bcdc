import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { query } from '@/lib/db';
import { uploadToFTP } from '@/lib/ftp-upload';

// GET - List all board members with their category names
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const members = await query<any[]>(`
      SELECT
        ebm.*,
        ebc.category_name
      FROM executive_board_members ebm
      LEFT JOIN executive_board_categories ebc ON ebm.category_id = ebc.id
      ORDER BY ebc.display_order ASC, ebm.display_order ASC
    `);

    return NextResponse.json(members);
  } catch (error) {
    console.error('Failed to fetch board members:', error);
    return NextResponse.json({ error: 'Failed to fetch board members' }, { status: 500 });
  }
}

// POST - Create new board member with image upload
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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

      // Upload to FTP (uploads/executives folder)
      const result = await uploadToFTP({ file: imageFile, folder: 'executives' });

      if (!result.success) {
        return NextResponse.json(
          { error: result.error || 'Image upload failed' },
          { status: 500 }
        );
      }

      imageUrl = result.url || null;
    }

    // Insert member
    await query(
      'INSERT INTO executive_board_members (name, position, category_id, image_url, facebook_url, linkedin_url, display_order) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        name,
        position,
        category_id,
        imageUrl,
        facebook_url || null,
        linkedin_url || null,
        display_order || 1
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Board member created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Failed to create board member:', error);
    return NextResponse.json({ error: 'Failed to create board member' }, { status: 500 });
  }
}
