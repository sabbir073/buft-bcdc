import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { query } from '@/lib/db';

// PUT - Update job post
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
    const data = await request.json();

    // Validation
    if (!data.job_title || !data.company_name || !data.job_type || !data.location || !data.description) {
      return NextResponse.json(
        { error: 'Job title, company name, job type, location, and description are required' },
        { status: 400 }
      );
    }

    // Update job post
    await query(
      'UPDATE job_posts SET job_title = ?, company_name = ?, job_type = ?, location = ?, salary_range = ?, description = ?, requirements = ?, application_deadline = ?, application_url = ?, contact_email = ?, status = ? WHERE id = ?',
      [
        data.job_title,
        data.company_name,
        data.job_type,
        data.location,
        data.salary_range || null,
        data.description,
        data.requirements || null,
        data.application_deadline || null,
        data.application_url || null,
        data.contact_email || null,
        data.status || 'active',
        id
      ]
    );

    return NextResponse.json({ success: true, message: 'Job post updated successfully' });
  } catch (error) {
    console.error('Failed to update job post:', error);
    return NextResponse.json({ error: 'Failed to update job post' }, { status: 500 });
  }
}

// DELETE - Delete job post
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
    // Check if there are applications for this job
    const applications = await query<any[]>(
      'SELECT id FROM job_application_submissions WHERE job_post_id = ?',
      [id]
    );

    if (applications.length > 0) {
      return NextResponse.json(
        { error: `Cannot delete job post with ${applications.length} application(s). Please delete applications first or set status to 'closed'.` },
        { status: 400 }
      );
    }

    // Delete job post
    await query('DELETE FROM job_posts WHERE id = ?', [id]);

    return NextResponse.json({ success: true, message: 'Job post deleted successfully' });
  } catch (error) {
    console.error('Failed to delete job post:', error);
    return NextResponse.json({ error: 'Failed to delete job post' }, { status: 500 });
  }
}
