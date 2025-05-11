import { NextResponse } from 'next/server';
import { getStates } from '@/utils/db';

export async function GET() {
  try {
    const states = getStates();
    return NextResponse.json(states);
  } catch (error) {
    console.error('Error in GET /api/states:', error);
    return NextResponse.json(
      { error: 'Failed to fetch states' },
      { status: 500 }
    );
  }
} 