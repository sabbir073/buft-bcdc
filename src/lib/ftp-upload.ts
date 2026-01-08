import { Client } from 'basic-ftp';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { Readable } from 'stream';

interface UploadOptions {
  file: File;
  folder: 'activities' | 'executives' | 'resources' | 'guidelines' | 'thumbnails';
}

interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * Upload file to cPanel FTP with unique naming
 * Files are organized in uploads/{folder}/ structure
 */
export async function uploadToFTP(options: UploadOptions): Promise<UploadResult> {
  const client = new Client();

  try {
    // Connect to FTP
    await client.access({
      host: process.env.FTP_HOST!,
      port: parseInt(process.env.FTP_PORT || '21'),
      user: process.env.FTP_USER!,
      password: process.env.FTP_PASSWORD!,
      secure: false,
    });

    // Generate unique filename
    const fileExtension = path.extname(options.file.name);
    const uniqueFilename = `${uuidv4()}${fileExtension}`;

    // Remote path: /uploads/{folder}/{unique-filename}
    const remotePath = `${process.env.FTP_REMOTE_PATH}/${options.folder}/${uniqueFilename}`;

    // Ensure directory exists
    const remoteDir = `${process.env.FTP_REMOTE_PATH}/${options.folder}`;
    try {
      await client.ensureDir(remoteDir);
    } catch (error) {
      console.error('Error creating directory:', error);
    }

    // Convert File to Buffer and then to Readable stream
    const arrayBuffer = await options.file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const readableStream = Readable.from(buffer);

    // Upload file using the stream
    await client.uploadFrom(readableStream, remotePath);

    // Construct public URL using FTP_PUBLIC_URL
    const publicUrl = `${process.env.FTP_PUBLIC_URL}/${options.folder}/${uniqueFilename}`;

    client.close();

    return {
      success: true,
      url: publicUrl,
    };
  } catch (error) {
    client.close();
    console.error('FTP upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    };
  }
}

/**
 * Upload multiple files to FTP
 */
export async function uploadMultipleToFTP(
  files: File[],
  folder: 'activities' | 'executives' | 'resources' | 'guidelines' | 'thumbnails'
): Promise<{ urls: string[]; errors: string[] }> {
  const urls: string[] = [];
  const errors: string[] = [];

  for (const file of files) {
    const result = await uploadToFTP({ file, folder });

    if (result.success && result.url) {
      urls.push(result.url);
    } else {
      errors.push(result.error || 'Unknown error');
    }
  }

  return { urls, errors };
}
