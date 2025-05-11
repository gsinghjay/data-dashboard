import { FertilityRate, EducationGroup, State, UserSelection } from '../types/data';

// Base API URL - empty for same domain
const BASE_URL = '';

// Helper function to handle API errors
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error || `API error: ${response.status} ${response.statusText}`
    );
  }
  return response.json();
}

// Function to build URL with search params
function buildUrl(endpoint: string, params?: Record<string, any>): string {
  // Use window.location.origin to get the base URL in browser environment
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const url = new URL(`${baseUrl}/api/${endpoint}`);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        // Handle arrays by joining with commas
        if (Array.isArray(value)) {
          url.searchParams.append(key, value.join(','));
        } else {
          url.searchParams.append(key, String(value));
        }
      }
    });
  }
  
  return url.toString();
}

// Get all education groups
export async function fetchEducationGroups(): Promise<EducationGroup[]> {
  const response = await fetch(buildUrl('education-groups'));
  return handleResponse<EducationGroup[]>(response);
}

// Get all states
export async function fetchStates(): Promise<State[]> {
  const response = await fetch(buildUrl('states'));
  return handleResponse<State[]>(response);
}

// Get fertility rates with filters
export async function fetchFertilityRates(params?: {
  year?: number | number[];
  state?: string | string[];
  education?: string | string[];
  limit?: number;
}): Promise<FertilityRate[]> {
  const response = await fetch(buildUrl('fertility-rates', params));
  return handleResponse<FertilityRate[]>(response);
}

// Get national trends
export async function fetchNationalTrends(params?: {
  year?: number | number[];
  education?: string | string[];
}): Promise<any[]> {
  const response = await fetch(buildUrl('national-trends', params));
  return handleResponse<any[]>(response);
}

// Get state comparison
export async function fetchStateComparison(params?: {
  year?: number;
  education?: string | string[];
}): Promise<any[]> {
  const response = await fetch(buildUrl('state-comparison', params));
  return handleResponse<any[]>(response);
}

// Get education comparison
export async function fetchEducationComparison(params?: {
  year?: number | number[];
  state?: string | string[];
}): Promise<any[]> {
  const response = await fetch(buildUrl('education-comparison', params));
  return handleResponse<any[]>(response);
}

// Get summary statistics
export async function fetchSummaryStats(): Promise<any> {
  const response = await fetch(buildUrl('summary-stats'));
  return handleResponse<any>(response);
}

// Function to fetch all data based on user selection
export async function fetchAllData(selection: UserSelection): Promise<{
  educationGroups: EducationGroup[];
  states: State[];
  fertilityRates: FertilityRate[];
}> {
  // Fetch static data
  const [educationGroups, states] = await Promise.all([
    fetchEducationGroups(),
    fetchStates(),
  ]);
  
  // Fetch fertility rates based on selection
  const fertilityRates = await fetchFertilityRates({
    year: selection.year,
    state: selection.state,
    education: selection.educationGroup,
  });
  
  return {
    educationGroups,
    states,
    fertilityRates,
  };
} 