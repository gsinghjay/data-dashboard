import { NextResponse } from 'next/server';
import { getSummaryStats } from '@/utils/db';

export async function GET() {
  try {
    const summaryStats = getSummaryStats();
    return NextResponse.json(summaryStats);
  } catch (error) {
    console.error('Error in GET /api/summary-stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch summary statistics' },
      { status: 500 }
    );
  }
} 