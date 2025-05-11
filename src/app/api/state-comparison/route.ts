import { NextResponse } from 'next/server';
import { getStateComparison } from '@/utils/db';

export async function GET(request: Request) {
  try {
    // Get URL and search params
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const yearParam = searchParams.get('year');
    const educationParam = searchParams.get('education');
    
    // Process year parameter
    let year: number | undefined = undefined;
    if (yearParam) {
      const parsed = parseInt(yearParam, 10);
      if (!isNaN(parsed)) {
        year = parsed;
      }
    }
    
    // Process education parameter (single or array)
    let education_group: string | string[] | undefined = undefined;
    if (educationParam) {
      if (educationParam.includes(',')) {
        education_group = educationParam.split(',');
      } else {
        education_group = educationParam;
      }
    }
    
    // Query the database
    const stateComparison = getStateComparison({
      year,
      education_group,
    });
    
    return NextResponse.json(stateComparison);
  } catch (error) {
    console.error('Error in GET /api/state-comparison:', error);
    return NextResponse.json(
      { error: 'Failed to fetch state comparison data' },
      { status: 500 }
    );
  }
} 