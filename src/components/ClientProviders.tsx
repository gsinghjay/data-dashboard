"use client";

import React, { ReactNode, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider } from '@mui/material/styles';
import theme from '@/utils/theme';
import { DataProvider } from '@/contexts/DataContext';
import useSuppressRefWarnings from '@/hooks/useSuppressRefWarnings';

interface ClientProvidersProps {
  children: ReactNode;
}

const ClientProviders: React.FC<ClientProvidersProps> = ({ children }) => {
  // Suppress React 19 ref warnings
  useSuppressRefWarnings();
  
  // Ensure the body has the correct background color on mount
  // and load fonts explicitly
  useEffect(() => {
    // Ensure background color is set
    document.body.style.backgroundColor = theme.palette.background.default;
    
    // Explicitly load fonts using Web Font Loader for better control
    if (typeof window !== 'undefined') {
      // Check if fonts are already loaded
      const fontLink = document.querySelector('link[href*="fonts.googleapis.com"]');
      if (!fontLink) {
        // Create and append link element for Google Fonts
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Source+Serif+Pro:wght@400;600&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      }
      
      // Set font-display properties directly on document for best rendering
      const style = document.createElement('style');
      style.textContent = `
        @font-face {
          font-family: 'Inter';
          font-display: swap;
        }
        @font-face {
          font-family: 'Source Serif Pro';
          font-display: swap;
        }
      `;
      document.head.appendChild(style);
    }
    
    // Apply CSS variables for education colors for use outside of MUI components
    const root = document.documentElement;
    root.style.setProperty('--less-than-high-school', theme.palette.education.lessThanHighSchool);
    root.style.setProperty('--high-school-diploma', theme.palette.education.highSchoolDiploma);
    root.style.setProperty('--some-college', theme.palette.education.someCollege);
    root.style.setProperty('--associates-degree', theme.palette.education.associatesDegree);
    root.style.setProperty('--bachelors-degree', theme.palette.education.bachelorsDegree);
    root.style.setProperty('--masters-degree', theme.palette.education.mastersDegree);
    root.style.setProperty('--professional-doctorate', theme.palette.education.professionalDoctorate);
    
    // Apply text colors
    root.style.setProperty('--text-primary', theme.palette.text.primary);
    root.style.setProperty('--text-secondary', theme.palette.text.secondary);
    
    // Apply font variables for narrative section
    root.style.setProperty('--font-sans', '"Inter", sans-serif');
    root.style.setProperty('--font-serif', '"Source Serif Pro", serif');
    
    return () => {
      // No cleanup needed for CSS variables or background color
      // Fonts should be cached by the browser
    };
  }, []);

  return (
    // StyledEngineProvider injects styles before Emotion
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DataProvider>
          {children}
        </DataProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default ClientProviders; 