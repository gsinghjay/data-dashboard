"use client";

import React, { ReactNode, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/utils/theme';
import { DataProvider } from '@/contexts/DataContext';

interface ClientProvidersProps {
  children: ReactNode;
}

const ClientProviders: React.FC<ClientProvidersProps> = ({ children }) => {
  // Ensure the body has the correct background color on mount
  useEffect(() => {
    document.body.style.backgroundColor = '#ffffff';
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DataProvider>
        {children}
      </DataProvider>
    </ThemeProvider>
  );
};

export default ClientProviders; 