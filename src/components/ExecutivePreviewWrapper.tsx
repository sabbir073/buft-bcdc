import ExecutivePreviewClient from './ExecutivePreviewClient';

interface Member {
  id: string;
  name: string;
  position: string;
  image: string;
}

async function getLatestBoard(): Promise<Member[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/public/executives`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch executives');
    }

    const data = await response.json();

    // Get the first category (display_order 1) and return members with display_order 1-6
    if (data.length > 0) {
      const firstBoard = data[0]; // First category (sorted by display_order)
      // Return members with display_order 1-6
      return firstBoard.members.slice(0, 6);
    }

    return [];
  } catch (error) {
    console.error('Error fetching executive board:', error);
    return [];
  }
}

export default async function ExecutivePreview() {
  const members = await getLatestBoard();

  return <ExecutivePreviewClient members={members} />;
}
