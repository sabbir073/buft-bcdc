import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { query } from '@/lib/db';
import { uploadToFTP } from '@/lib/ftp-upload';

// PUT - Update CV template
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

    const template_name = formData.get('template_name') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;

    // Validation
    if (!template_name || !category) {
      return NextResponse.json(
        { error: 'Template name and category are required' },
        { status: 400 }
      );
    }

    // Get current template
    const currentTemplate = await query<any[]>(
      'SELECT file_url FROM cv_templates WHERE id = ?',
      [id]
    );

    if (currentTemplate.length === 0) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }

    let fileUrl = currentTemplate[0].file_url;

    // Handle new PDF upload
    const newPdfFile = formData.get('newPdf') as File;
    if (newPdfFile && newPdfFile.size > 0) {
      // Validate file type
      if (newPdfFile.type !== 'application/pdf') {
        return NextResponse.json(
          { error: 'Only PDF files are allowed' },
          { status: 400 }
        );
      }

      // Upload to FTP (uploads/resources folder)
      const result = await uploadToFTP({ file: newPdfFile, folder: 'resources' });

      if (!result.success) {
        return NextResponse.json(
          { error: result.error || 'PDF upload failed' },
          { status: 500 }
        );
      }

      fileUrl = result.url || fileUrl;
      // Note: Old file remains on FTP server - manual cleanup if needed
    }

    // Update template
    await query(
      'UPDATE cv_templates SET template_name = ?, description = ?, category = ?, file_url = ? WHERE id = ?',
      [template_name, description || null, category, fileUrl, id]
    );

    return NextResponse.json({ success: true, message: 'CV template updated successfully' });
  } catch (error) {
    console.error('Failed to update CV template:', error);
    return NextResponse.json({ error: 'Failed to update CV template' }, { status: 500 });
  }
}

// DELETE - Delete CV template and file
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
    // Delete template
    await query('DELETE FROM cv_templates WHERE id = ?', [id]);

    // Note: Files remain on FTP server - manual cleanup required if needed

    return NextResponse.json({ success: true, message: 'CV template deleted successfully' });
  } catch (error) {
    console.error('Failed to delete CV template:', error);
    return NextResponse.json({ error: 'Failed to delete CV template' }, { status: 500 });
  }
}
