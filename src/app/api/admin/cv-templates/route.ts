import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { query } from '@/lib/db';
import { uploadToFTP } from '@/lib/ftp-upload';

// GET - List all CV templates
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const templates = await query<any[]>(
      'SELECT * FROM cv_templates ORDER BY created_at DESC'
    );

    return NextResponse.json(templates);
  } catch (error) {
    console.error('Failed to fetch CV templates:', error);
    return NextResponse.json({ error: 'Failed to fetch CV templates' }, { status: 500 });
  }
}

// POST - Create new CV template with PDF upload
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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

    // Handle PDF upload
    const pdfFile = formData.get('pdf') as File;
    if (!pdfFile || pdfFile.size === 0) {
      return NextResponse.json(
        { error: 'PDF file is required' },
        { status: 400 }
      );
    }

    // Validate file type
    if (pdfFile.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are allowed' },
        { status: 400 }
      );
    }

    // Upload to FTP (uploads/resources folder)
    const result = await uploadToFTP({ file: pdfFile, folder: 'resources' });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'PDF upload failed' },
        { status: 500 }
      );
    }

    const fileUrl = result.url!;

    // Insert template
    await query(
      'INSERT INTO cv_templates (template_name, description, category, file_url) VALUES (?, ?, ?, ?)',
      [template_name, description || null, category, fileUrl]
    );

    return NextResponse.json({
      success: true,
      message: 'CV template created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Failed to create CV template:', error);
    return NextResponse.json({ error: 'Failed to create CV template' }, { status: 500 });
  }
}
