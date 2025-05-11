import { NextResponse } from 'next/server';
import { getNationalTrends } from '@/utils/db';

export async function GET(request: Request) {
  try {
    // Get URL and search params
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const yearParam = searchParams.get('year');
    const educationParam = searchParams.get('education');
    
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
    const nationalTrends = getNationalTrends({
      year,
      education_group,
    });
    
    return NextResponse.json(nationalTrends);
  } catch (error) {
    console.error('Error in GET /api/national-trends:', error);
    return NextResponse.json(
      { error: 'Failed to fetch national trends' },
      { status: 500 }
    );
  }
} 