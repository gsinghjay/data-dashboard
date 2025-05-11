import { NextResponse } from 'next/server';
import { getEducationComparison } from '@/utils/db';

export async function GET(request: Request) {
  try {
    // Get URL and search params
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const yearParam = searchParams.get('year');
    const stateParam = searchParams.get('state');
    
    // Process year parameter (single or array)
    let year: number | number[] | undefined = undefined;
    if (yearParam) {
      if (yearParam.includes(',')) {
        year = yearParam.split(',').map(y => parseInt(y, 10)).filter(y => !isNaN(y));
      } else {
        const parsed = parseInt(yearParam, 10);
        if (!isNaN(parsed)) {
          year = parsed;
        }
      }
    }
    
    // Process state parameter (single or array)
    let state_code: string | string[] | undefined = undefined;
    if (stateParam) {
      if (stateParam.includes(',')) {
        state_code = stateParam.split(',');
      } else {
        state_code = stateParam;
      }
    }
    
    // Query the database
    const educationComparison = getEducationComparison({
      year,
      state_code,
    });
    
    return NextResponse.json(educationComparison);
  } catch (error) {
    console.error('Error in GET /api/education-comparison:', error);
    return NextResponse.json(
      { error: 'Failed to fetch education comparison data' },
      { status: 500 }
    );
  }
} 