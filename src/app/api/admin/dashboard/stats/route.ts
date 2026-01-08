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
    // Get counts from all tables
    const [usersResult] = await query<any[]>('SELECT COUNT(*) as count FROM admin_users');
    const [membershipsResult] = await query<any[]>('SELECT COUNT(*) as count FROM membership_submissions');
    const [activitiesResult] = await query<any[]>('SELECT COUNT(*) as count FROM activities');
    const [executivesResult] = await query<any[]>('SELECT COUNT(*) as count FROM executive_board_members');
    const [jobPostsResult] = await query<any[]>('SELECT COUNT(*) as count FROM job_posts');
    const [successStoriesResult] = await query<any[]>('SELECT COUNT(*) as count FROM success_stories');

    return NextResponse.json({
      users: usersResult.count,
      memberships: membershipsResult.count,
      activities: activitiesResult.count,
      executives: executivesResult.count,
      jobPosts: jobPostsResult.count,
      successStories: successStoriesResult.count,
    });
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return NextResponse.json({ error: 'Failed to fetch statistics' }, { status: 500 });
  }
}
