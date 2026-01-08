import { Client } from 'basic-ftp';
import { promises as fs } from 'fs';
import path from 'path';

interface FTPConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  uploadPath: string;
  publicUrl: string;
}

// FTP Configuration from environment variables
const ftpConfig: FTPConfig = {
  host: process.env.FTP_HOST || '',
  port: parseInt(process.env.FTP_PORT || '21'),
  user: process.env.FTP_USER || '',
  password: process.env.FTP_PASSWORD || '',
  uploadPath: process.env.FTP_UPLOAD_PATH || '/public_html/uploads',
  publicUrl: process.env.FTP_PUBLIC_URL || '',
};

/**
 * Upload a file to FTP server
 * @param localFilePath - Path to local file
 * @param remoteFileName - Name for the file on remote server
 * @param subDirectory - Optional subdirectory within upload path
 * @returns Promise<string> - Public URL of uploaded file
 */
export async function uploadToFTP(
  localFilePath: string,
  remoteFileName: string,
  subDirectory: string = ''
): Promise<string> {
  const client = new Client();
  client.ftp.verbose = process.env.NODE_ENV === 'development';

  try {
    // Connect to FTP server
    await client.access({
      host: ftpConfig.host,
      port: ftpConfig.port,
      user: ftpConfig.user,
      password: ftpConfig.password,
    });

    // Determine remote path
    const remotePath = subDirectory
      ? path.posix.join(ftpConfig.uploadPath, subDirectory)
      : ftpConfig.uploadPath;

    // Ensure remote directory exists
    await client.ensureDir(remotePath);

    // Upload file in binary mode
    await client.uploadFrom(localFilePath, remoteFileName);

    // Construct public URL
    const publicPath = subDirectory
      ? `${subDirectory}/${remoteFileName}`
      : remoteFileName;
    const publicUrl = `${ftpConfig.publicUrl}/${publicPath}`;

    console.log(`✅ File uploaded successfully: ${publicUrl}`);
    return publicUrl;
  } catch (error) {
    console.error('❌ FTP upload failed:', error);
    throw error;
  } finally {
    client.close();
  }
}

/**
 * Upload multiple files to FTP server
 * @param files - Array of {localPath, remoteName, subDirectory}
 * @returns Promise<string[]> - Array of public URLs
 */
export async function uploadMultipleToFTP(
  files: Array<{
    localPath: string;
    remoteName: string;
    subDirectory?: string;
  }>
): Promise<string[]> {
  const urls: string[] = [];

  for (const file of files) {
    const url = await uploadToFTP(
      file.localPath,
      file.remoteName,
      file.subDirectory
    );
    urls.push(url);
  }

  return urls;
}

/**
 * Delete a file from FTP server
 * @param remoteFileName - Name of file to delete
 * @param subDirectory - Optional subdirectory within upload path
 * @returns Promise<boolean> - True if deleted successfully
 */
export async function deleteFromFTP(
  remoteFileName: string,
  subDirectory: string = ''
): Promise<boolean> {
  const client = new Client();
  client.ftp.verbose = process.env.NODE_ENV === 'development';

  try {
    await client.access({
      host: ftpConfig.host,
      port: ftpConfig.port,
      user: ftpConfig.user,
      password: ftpConfig.password,
    });

    const remotePath = subDirectory
      ? path.posix.join(ftpConfig.uploadPath, subDirectory)
      : ftpConfig.uploadPath;

    await client.cd(remotePath);
    await client.remove(remoteFileName);

    console.log(`✅ File deleted successfully: ${remoteFileName}`);
    return true;
  } catch (error) {
    console.error('❌ FTP delete failed:', error);
    return false;
  } finally {
    client.close();
  }
}

/**
 * Test FTP connection
 * @returns Promise<boolean> - True if connection successful
 */
export async function testFTPConnection(): Promise<boolean> {
  const client = new Client();
  client.ftp.verbose = true;

  try {
    await client.access({
      host: ftpConfig.host,
      port: ftpConfig.port,
      user: ftpConfig.user,
      password: ftpConfig.password,
    });

    console.log('✅ FTP connection successful');
    return true;
  } catch (error) {
    console.error('❌ FTP connection failed:', error);
    return false;
  } finally {
    client.close();
  }
}
