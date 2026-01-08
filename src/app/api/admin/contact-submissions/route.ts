import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { query } from '@/lib/db';

// GET - List all contact submissions
export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let sql = 'SELECT * FROM contact_submissions';
    const params: any[] = [];

    if (status && status !== 'all') {
      sql += ' WHERE status = ?';
      params.push(status);
    }

    sql += ' ORDER BY created_at DESC';

    const submissions = await query<any[]>(sql, params);

    // Get counts by status
    const countResult = await query<any[]>(`
      SELECT
        status,
        COUNT(*) as count
      FROM contact_submissions
      GROUP BY status
    `);

    const counts = {
      all: 0,
      new: 0,
      read: 0,
      replied: 0,
      archived: 0,
    };

    countResult.forEach((row: any) => {
      counts[row.status as keyof typeof counts] = row.count;
      counts.all += row.count;
    });

    return NextResponse.json({
      submissions,
      counts,
    });
  } catch (error) {
    console.error('Failed to fetch contact submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact submissions' },
      { status: 500 }
    );
  }
}
