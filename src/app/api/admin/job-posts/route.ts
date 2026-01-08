import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { query } from '@/lib/db';

// GET - List all job posts
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const jobs = await query<any[]>(
      'SELECT * FROM job_posts ORDER BY created_at DESC'
    );

    // Get application count for each job
    for (const job of jobs) {
      const countResult = await query<any[]>(
        'SELECT COUNT(*) as count FROM job_application_submissions WHERE job_post_id = ?',
        [job.id]
      );
      job.application_count = countResult[0].count;
    }

    return NextResponse.json(jobs);
  } catch (error) {
    console.error('Failed to fetch job posts:', error);
    return NextResponse.json({ error: 'Failed to fetch job posts' }, { status: 500 });
  }
}

// POST - Create new job post
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();

    // Validation
    if (!data.job_title || !data.company_name || !data.job_type || !data.location || !data.description) {
      return NextResponse.json(
        { error: 'Job title, company name, job type, location, and description are required' },
        { status: 400 }
      );
    }

    // Insert job post
    await query(
      'INSERT INTO job_posts (job_title, company_name, job_type, location, salary_range, description, requirements, application_deadline, application_url, contact_email, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
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
        data.status || 'active'
      ]
    );

    return NextResponse.json({ success: true, message: 'Job post created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Failed to create job post:', error);
    return NextResponse.json({ error: 'Failed to create job post' }, { status: 500 });
  }
}
