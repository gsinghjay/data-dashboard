import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    project: 'Educational Attainment & Fertility Dashboard',
    version: '0.1.0',
    dataSource: 'American Community Survey (ACS) PUMS',
    years: '2008-2023',
    dataPoints: 'Fertility rates by education level, state, and year',
  });
} 