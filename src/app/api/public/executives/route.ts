import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

interface BoardCategory {
  id: number;
  category_name: string;
  display_order: number;
}

interface BoardMember {
  id: number;
  category_id: number;
  name: string;
  position: string;
  image_url: string;
  display_order: number;
}

// GET - Fetch all executive boards with members
export async function GET() {
  try {
    // Fetch board categories
    const categories = await query<BoardCategory[]>(
      'SELECT * FROM executive_board_categories ORDER BY display_order ASC'
    );

    // Fetch all board members
    const categoryIds = categories.map(c => c.id);

    let members: BoardMember[] = [];
    if (categoryIds.length > 0) {
      const placeholders = categoryIds.map(() => '?').join(',');
      members = await query<BoardMember[]>(
        `SELECT * FROM executive_board_members WHERE category_id IN (${placeholders}) ORDER BY display_order ASC`,
        categoryIds
      );
    }

    // Group members by category
    const membersByCategory = members.reduce((acc, member) => {
      if (!acc[member.category_id]) {
        acc[member.category_id] = [];
      }
      acc[member.category_id].push({
        id: member.id,
        name: member.name,
        position: member.position,
        image: member.image_url,
      });
      return acc;
    }, {} as Record<number, any[]>);

    // Combine categories with members
    // Extract year from category name if present (e.g., "9th Executive Board (2025)")
    const result = categories.map(category => {
      const yearMatch = category.category_name.match(/\((\d{4})\)/);
      const year = yearMatch ? yearMatch[1] : '';
      const name = category.category_name.replace(/\s*\(\d{4}\)\s*$/, ''); // Remove year from name

      return {
        id: `board-${category.id}`,
        name: name,
        year: year,
        members: membersByCategory[category.id] || [],
      };
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch executive boards:', error);
    return NextResponse.json(
      { error: 'Failed to fetch executive boards' },
      { status: 500 }
    );
  }
}
