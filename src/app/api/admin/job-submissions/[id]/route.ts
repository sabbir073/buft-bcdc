import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { query } from '@/lib/db';
import { deleteFromFTP } from '@/lib/ftp';

// PUT - Update submission status
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

    if (!data.status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 });
    }

    // Update submission status
    await query(
      'UPDATE job_application_submissions SET status = ? WHERE id = ?',
      [data.status, id]
    );

    return NextResponse.json({ success: true, message: 'Status updated successfully' });
  } catch (error) {
    console.error('Failed to update submission:', error);
    return NextResponse.json({ error: 'Failed to update submission' }, { status: 500 });
  }
}

// DELETE - Delete submission and resume file
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
    // Get submission details
    const submission = await query<any[]>(
      'SELECT resume_url FROM job_application_submissions WHERE id = ?',
      [id]
    );

    if (submission.length === 0) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    // Delete resume from FTP if exists
    if (submission[0].resume_url) {
      try {
        const filename = submission[0].resume_url.split('/').pop();
        await deleteFromFTP(filename, 'resumes');
      } catch (ftpError) {
        console.error('Failed to delete resume from FTP:', ftpError);
        // Continue with deletion even if FTP fails
      }
    }

    // Delete submission
    await query('DELETE FROM job_application_submissions WHERE id = ?', [id]);

    return NextResponse.json({ success: true, message: 'Submission deleted successfully' });
  } catch (error) {
    console.error('Failed to delete submission:', error);
    return NextResponse.json({ error: 'Failed to delete submission' }, { status: 500 });
  }
}
