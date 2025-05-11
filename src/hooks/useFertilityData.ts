'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  fetchEducationGroups, 
  fetchStates, 
  fetchFertilityRates, 
  fetchNationalTrends,
  fetchStateComparison,
  fetchEducationComparison
} from '@/utils/api';
import { FertilityDataState, UserSelection } from '@/types/data';

// Default selection values
const defaultSelection: UserSelection = {
  year: 2023,  // Default to most recent year
  state: 'US', // Default to national data
  educationGroup: 'All', // Default to all education groups
  visualizationType: 'bar' // Default to bar chart
};

export default function useFertilityData() {
  // State for data
  const [state, setState] = useState<FertilityDataState>({
    loading: true,
    error: null,
    educationGroups: [],
    states: [],
    fertilityRates: [],
    userSelection: defaultSelection
  });

  // Methods to update user selection
  const setYear = useCallback((year: number | number[]) => {
    setState(prev => ({
      ...prev,
      userSelection: {
        ...prev.userSelection,
        year
      }
    }));
  }, []);

  const setState_code = useCallback((state: string | string[]) => {
    setState(prev => ({
      ...prev,
      userSelection: {
        ...prev.userSelection,
        state
      }
    }));
  }, []);

  const setEducationGroup = useCallback((educationGroup: string | string[]) => {
    setState(prev => ({
      ...prev,
      userSelection: {
        ...prev.userSelection,
        educationGroup
      }
    }));
  }, []);

  const setVisualizationType = useCallback((visualizationType: 'bar' | 'line' | 'map' | 'pie') => {
    setState(prev => ({
      ...prev,
      userSelection: {
        ...prev.userSelection,
        visualizationType
      }
    }));
  }, []);

  // Function to fetch data based on selection
  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // Fetch static data (education groups and states)
      const [educationGroups, states] = await Promise.all([
        fetchEducationGroups(),
        fetchStates()
      ]);
      
      // Fetch fertility rates based on current selection
      const { year, state: stateSelection, educationGroup } = state.userSelection;
      const fertilityRates = await fetchFertilityRates({
        year,
        state: stateSelection,
        education: educationGroup
      });
      
      setState(prev => ({
        ...prev,
        loading: false,
        educationGroups,
        states,
        fertilityRates
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }));
    }
  }, [state.userSelection]);

  // Fetch national trends data
  const fetchNationalTrendsData = useCallback(async (
    year?: number | number[],
    educationGroup?: string | string[]
  ) => {
    try {
      return await fetchNationalTrends({
        year: year || state.userSelection.year,
        education: educationGroup || state.userSelection.educationGroup
      });
    } catch (error) {
      console.error('Error fetching national trends:', error);
      return [];
    }
  }, [state.userSelection]);

  // Fetch state comparison data
  const fetchStateComparisonData = useCallback(async (
    year?: number,
    educationGroup?: string | string[]
  ) => {
    try {
      return await fetchStateComparison({
        year: year || (Array.isArray(state.userSelection.year) ? state.userSelection.year[0] : state.userSelection.year),
        education: educationGroup || state.userSelection.educationGroup
      });
    } catch (error) {
      console.error('Error fetching state comparison:', error);
      return [];
    }
  }, [state.userSelection]);

  // Fetch education comparison data
  const fetchEducationComparisonData = useCallback(async (
    year?: number | number[],
    state_code?: string | string[]
  ) => {
    try {
      return await fetchEducationComparison({
        year: year || state.userSelection.year,
        state: state_code || state.userSelection.state
      });
    } catch (error) {
      console.error('Error fetching education comparison:', error);
      return [];
    }
  }, [state.userSelection]);

  // Initial data fetch on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    state,
    setYear,
    setState: setState_code, // Renamed to avoid conflict with React's setState
    setEducationGroup,
    setVisualizationType,
    fetchData,
    fetchNationalTrendsData,
    fetchStateComparisonData,
    fetchEducationComparisonData
  };
} 