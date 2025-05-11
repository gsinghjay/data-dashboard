"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DataContextType, FertilityDataState, UserSelection } from '../types/data';

// Initial state for our data context
const initialState: FertilityDataState = {
  loading: false,
  error: null,
  educationGroups: [],
  states: [],
  fertilityRates: [],
  userSelection: {
    year: [2008, 2023], // Default to full range for consistent education categories
    state: [], // Empty array means all states
    educationGroup: [], // Empty array means all education groups
    visualizationType: 'bar',
  },
};

// Create the context
const DataContext = createContext<DataContextType | undefined>(undefined);

// Custom hook for using the data context
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

// Props for the DataProvider component
interface DataProviderProps {
  children: ReactNode;
}

// DataProvider component
export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [state, setState] = useState<FertilityDataState>(initialState);

  // Update the year selection
  const setYear = (year: number | number[]) => {
    setState((prevState) => ({
      ...prevState,
      userSelection: {
        ...prevState.userSelection,
        year,
      },
    }));
  };

  // Update the state selection
  const setState_ = (state: string | string[]) => {
    setState((prevState) => ({
      ...prevState,
      userSelection: {
        ...prevState.userSelection,
        state,
      },
    }));
  };

  // Update the education group selection
  const setEducationGroup = (educationGroup: string | string[]) => {
    setState((prevState) => ({
      ...prevState,
      userSelection: {
        ...prevState.userSelection,
        educationGroup,
      },
    }));
  };

  // Update the visualization type
  const setVisualizationType = (visualizationType: 'bar' | 'line' | 'map' | 'pie') => {
    setState((prevState) => ({
      ...prevState,
      userSelection: {
        ...prevState.userSelection,
        visualizationType,
      },
    }));
  };

  // Fetch data based on current selections
  const fetchData = async () => {
    setState((prevState) => ({ ...prevState, loading: true, error: null }));
    
    try {
      // This is a placeholder for the actual API call
      // We'll implement this later when we set up the API layer
      // For now, just simulate a successful fetch
      
      // Mock data - will be replaced with actual API call
      const mockData = {
        educationGroups: [],
        states: [],
        fertilityRates: [],
      };

      setState((prevState) => ({
        ...prevState,
        loading: false,
        educationGroups: mockData.educationGroups,
        states: mockData.states,
        fertilityRates: mockData.fertilityRates,
      }));
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: 'Failed to fetch data',
      }));
    }
  };

  const value = {
    state,
    setYear,
    setState: setState_,
    setEducationGroup,
    setVisualizationType,
    fetchData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataContext; 