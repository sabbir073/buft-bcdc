import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

interface CVTemplate {
  id: number;
  template_name: string;
  description: string;
  category: string;
  file_url: string;
  download_count: number;
  created_at: string;
}

// GET - Fetch all CV templates for public use
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = searchParams.get('limit');

    // Build query based on filters
    let templates: CVTemplate[];

    if (category) {
      // Filter by category
      if (limit) {
        templates = await query<CVTemplate[]>(
          'SELECT * FROM cv_templates WHERE category = ? ORDER BY created_at DESC LIMIT ?',
          [category, parseInt(limit)]
        );
      } else {
        templates = await query<CVTemplate[]>(
          'SELECT * FROM cv_templates WHERE category = ? ORDER BY created_at DESC',
          [category]
        );
      }
    } else {
      // Get all templates
      if (limit) {
        templates = await query<CVTemplate[]>(
          'SELECT * FROM cv_templates ORDER BY created_at DESC LIMIT ?',
          [parseInt(limit)]
        );
      } else {
        templates = await query<CVTemplate[]>(
          'SELECT * FROM cv_templates ORDER BY created_at DESC'
        );
      }
    }

    // Get unique categories for filtering
    const categoriesResult = await query<{ category: string }[]>(
      'SELECT DISTINCT category FROM cv_templates ORDER BY category'
    );
    const categories = categoriesResult.map(r => r.category);

    // Format response
    const result = templates.map(template => ({
      id: template.id,
      title: template.template_name,
      description: template.description,
      category: template.category,
      downloadUrl: template.file_url,
      downloads: template.download_count,
    }));

    return NextResponse.json({
      templates: result,
      total: templates.length,
      categories: categories,
    }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch CV templates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch CV templates' },
      { status: 500 }
    );
  }
}
