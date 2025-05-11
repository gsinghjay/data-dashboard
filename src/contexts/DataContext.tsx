"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import useFertilityData from '@/hooks/useFertilityData';
import { DataContextType } from '@/types/data';

// Create the context with a default value
const DataContext = createContext<DataContextType | undefined>(undefined);

// Provider component
export function DataProvider({ children }: { children: ReactNode }) {
  const dataHook = useFertilityData();
  
  return (
    <DataContext.Provider value={dataHook}>
      {children}
    </DataContext.Provider>
  );
}

// Custom hook to use the data context
export function useData(): DataContextType {
  const context = useContext(DataContext);
  
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  
  return context;
}

// Re-export types for convenience
export type { DataContextType }; 