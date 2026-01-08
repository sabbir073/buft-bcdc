import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { query } from '@/lib/db';
import { deleteFromFTP } from '@/lib/ftp';

// DELETE - Delete single image
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ imageId: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { imageId } = await params;

  try {
    // Get image URL
    const imageResult = await query<any[]>(
      'SELECT image_url FROM activity_images WHERE id = ?',
      [imageId]
    );

    if (imageResult.length === 0) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    const imageUrl = imageResult[0].image_url;

    // Delete from FTP
    try {
      const filename = imageUrl.split('/').pop();
      await deleteFromFTP(filename, 'activities');
    } catch (ftpError) {
      console.error('Failed to delete from FTP:', ftpError);
      // Continue with database deletion even if FTP fails
    }

    // Delete from database
    await query('DELETE FROM activity_images WHERE id = ?', [imageId]);

    return NextResponse.json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Failed to delete image:', error);
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}
