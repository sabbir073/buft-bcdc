import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { query } from '@/lib/db';

// GET - List all job submissions
export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('job_id');

    let submissions;
    if (jobId) {
      // Get submissions for specific job
      submissions = await query<any[]>(`
        SELECT
          jas.*,
          jp.job_title,
          jp.company_name
        FROM job_application_submissions jas
        LEFT JOIN job_posts jp ON jas.job_post_id = jp.id
        WHERE jas.job_post_id = ?
        ORDER BY jas.created_at DESC
      `, [jobId]);
    } else {
      // Get all submissions
      submissions = await query<any[]>(`
        SELECT
          jas.*,
          jp.job_title,
          jp.company_name
        FROM job_application_submissions jas
        LEFT JOIN job_posts jp ON jas.job_post_id = jp.id
        ORDER BY jas.created_at DESC
      `);
    }

    return NextResponse.json(submissions);
  } catch (error) {
    console.error('Failed to fetch job submissions:', error);
    return NextResponse.json({ error: 'Failed to fetch job submissions' }, { status: 500 });
  }
}
