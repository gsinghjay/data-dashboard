import { NextResponse } from 'next/server';
import { getEducationGroups } from '@/utils/db';

export async function GET() {
  try {
    const educationGroups = getEducationGroups();
    return NextResponse.json(educationGroups);
  } catch (error) {
    console.error('Error in GET /api/education-groups:', error);
    return NextResponse.json(
      { error: 'Failed to fetch education groups' },
      { status: 500 }
    );
  }
} 