import { NextResponse } from 'next/server';
import { getFertilityRates } from '@/utils/db';

export async function GET(request: Request) {
  try {
    // Get URL and search params
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const yearParam = searchParams.get('year');
    const stateParam = searchParams.get('state');
    const educationParam = searchParams.get('education');
    const limitParam = searchParams.get('limit');
    
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
    
    // Process education parameter (single or array)
    let education_group: string | string[] | undefined = undefined;
    if (educationParam) {
      if (educationParam.includes(',')) {
        education_group = educationParam.split(',');
      } else {
        education_group = educationParam;
      }
    }
    
    // Process limit parameter
    let limit: number | undefined = undefined;
    if (limitParam) {
      const parsed = parseInt(limitParam, 10);
      if (!isNaN(parsed)) {
        limit = parsed;
      }
    }
    
    // Query the database
    const fertilityRates = getFertilityRates({
      year,
      state_code,
      education_group,
      limit,
    });
    
    return NextResponse.json(fertilityRates);
  } catch (error) {
    console.error('Error in GET /api/fertility-rates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch fertility rates' },
      { status: 500 }
    );
  }
} 