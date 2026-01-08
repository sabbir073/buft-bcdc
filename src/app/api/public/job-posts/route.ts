import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

interface JobPost {
  id: number;
  job_title: string;
  company_name: string;
  job_type: string;
  location: string;
  salary_range: string | null;
  description: string;
  requirements: string | null;
  application_deadline: string | null;
  application_url: string | null;
  contact_email: string | null;
  status: string;
  created_at: string;
}

// GET - Fetch all active job posts for public display
export async function GET() {
  try {
    const jobs = await query<JobPost[]>(
      `SELECT * FROM job_posts WHERE status = 'active' ORDER BY created_at DESC`
    );

    // Format the response
    const formattedJobs = jobs.map(job => {
      // Format deadline date if it exists
      let formattedDeadline = job.application_deadline;
      if (job.application_deadline) {
        try {
          const date = new Date(job.application_deadline);
          const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                            'July', 'August', 'September', 'October', 'November', 'December'];
          formattedDeadline = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
        } catch (e) {
          // Keep original if parsing fails
        }
      }

      return {
        id: job.id,
        title: job.job_title,
        company: job.company_name,
        type: job.job_type,
        location: job.location,
        salaryRange: job.salary_range,
        description: job.description,
        requirements: job.requirements,
        deadline: formattedDeadline,
        applicationUrl: job.application_url,
        contactEmail: job.contact_email,
      };
    });

    return NextResponse.json(formattedJobs, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch job posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job posts' },
      { status: 500 }
    );
  }
}
