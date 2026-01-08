import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { uploadToFTP } from '@/lib/ftp';
import { writeFile, unlink, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { headers } from 'next/headers';

// POST - Submit a job application (public)
export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Extract form fields
    const jobPostId = formData.get('jobPostId') as string;
    const applicantName = formData.get('applicantName') as string;
    const applicantEmail = formData.get('applicantEmail') as string;
    const applicantPhone = formData.get('applicantPhone') as string;
    const coverLetter = formData.get('coverLetter') as string;
    const resumeFile = formData.get('resume') as File;

    // Validate required fields
    if (!jobPostId || !applicantName || !applicantEmail || !applicantPhone || !resumeFile) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(applicantEmail)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (!allowedTypes.includes(resumeFile.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type. Please upload PDF or Word document.' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    if (resumeFile.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'File size exceeds 5MB limit' },
        { status: 400 }
      );
    }

    // Verify job post exists and doesn't have an external application URL
    const jobCheck = await query<any[]>(
      'SELECT id, job_title, company_name, application_url FROM job_posts WHERE id = ? AND status = ?',
      [jobPostId, 'active']
    );

    if (jobCheck.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Job post not found or no longer active' },
        { status: 404 }
      );
    }

    const job = jobCheck[0];

    // Don't allow applications if job has external application URL
    if (job.application_url) {
      return NextResponse.json(
        { success: false, error: 'This job requires applying through the external application link' },
        { status: 400 }
      );
    }

    // Get client IP address
    const headersList = await headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    const ipAddress = forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown';

    // Create temp directory if it doesn't exist
    const tempDir = join(process.cwd(), 'tmp');
    if (!existsSync(tempDir)) {
      await mkdir(tempDir, { recursive: true });
    }

    // Save file temporarily
    const fileExtension = resumeFile.name.split('.').pop() || 'pdf';
    const timestamp = Date.now();
    const sanitizedName = applicantName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    const tempFileName = `resume_${sanitizedName}_${timestamp}.${fileExtension}`;
    const tempFilePath = join(tempDir, tempFileName);

    const bytes = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(tempFilePath, buffer);

    let resumeUrl = '';
    try {
      // Upload to FTP in 'resumes' subdirectory
      resumeUrl = await uploadToFTP(tempFilePath, tempFileName, 'resumes');
    } catch (ftpError) {
      console.error('FTP upload failed:', ftpError);
      // Clean up temp file
      await unlink(tempFilePath).catch(() => {});
      return NextResponse.json(
        { success: false, error: 'Failed to upload resume. Please try again.' },
        { status: 500 }
      );
    }

    // Clean up temp file
    await unlink(tempFilePath).catch(() => {});

    // Insert application into database
    const result = await query<any>(
      `INSERT INTO job_application_submissions
       (job_post_id, applicant_name, applicant_email, applicant_phone, resume_url, cover_letter, ip_address, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'new')`,
      [jobPostId, applicantName, applicantEmail, applicantPhone, resumeUrl, coverLetter || null, ipAddress]
    );

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: result.insertId,
    }, { status: 201 });

  } catch (error) {
    console.error('Failed to submit job application:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit application. Please try again.' },
      { status: 500 }
    );
  }
}
