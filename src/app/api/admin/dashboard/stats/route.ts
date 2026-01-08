import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { query } from '@/lib/db';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get counts from all tables in parallel
    const [
      usersResult,
      membershipsResult,
      pendingMembershipsResult,
      activitiesResult,
      executivesResult,
      boardCategoriesResult,
      jobPostsResult,
      activeJobsResult,
      jobApplicationsResult,
      successStoriesResult,
      cvTemplatesResult,
      interviewTipsResult,
      careerGuidelinesResult,
      contactSubmissionsResult,
      newContactsResult,
    ] = await Promise.all([
      query<any[]>('SELECT COUNT(*) as count FROM admin_users'),
      query<any[]>('SELECT COUNT(*) as count FROM membership_submissions'),
      query<any[]>('SELECT COUNT(*) as count FROM membership_submissions WHERE status = "pending"'),
      query<any[]>('SELECT COUNT(*) as count FROM activities'),
      query<any[]>('SELECT COUNT(*) as count FROM executive_board_members'),
      query<any[]>('SELECT COUNT(*) as count FROM executive_board_categories'),
      query<any[]>('SELECT COUNT(*) as count FROM job_posts'),
      query<any[]>('SELECT COUNT(*) as count FROM job_posts WHERE status = "active"'),
      query<any[]>('SELECT COUNT(*) as count FROM job_application_submissions'),
      query<any[]>('SELECT COUNT(*) as count FROM success_stories'),
      query<any[]>('SELECT COUNT(*) as count FROM cv_templates'),
      query<any[]>('SELECT COUNT(*) as count FROM interview_tips'),
      query<any[]>('SELECT COUNT(*) as count FROM career_guidelines'),
      query<any[]>('SELECT COUNT(*) as count FROM contact_submissions'),
      query<any[]>('SELECT COUNT(*) as count FROM contact_submissions WHERE status = "new"'),
    ]);

    return NextResponse.json({
      users: usersResult[0].count,
      memberships: membershipsResult[0].count,
      pendingMemberships: pendingMembershipsResult[0].count,
      activities: activitiesResult[0].count,
      executives: executivesResult[0].count,
      boardCategories: boardCategoriesResult[0].count,
      jobPosts: jobPostsResult[0].count,
      activeJobs: activeJobsResult[0].count,
      jobApplications: jobApplicationsResult[0].count,
      successStories: successStoriesResult[0].count,
      cvTemplates: cvTemplatesResult[0].count,
      interviewTips: interviewTipsResult[0].count,
      careerGuidelines: careerGuidelinesResult[0].count,
      contactSubmissions: contactSubmissionsResult[0].count,
      newContacts: newContactsResult[0].count,
    });
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return NextResponse.json({ error: 'Failed to fetch statistics' }, { status: 500 });
  }
}
