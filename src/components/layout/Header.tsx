"use client";

import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import BarChartIcon from '@mui/icons-material/BarChart';

const Header: React.FC = () => {
  return (
    <AppBar 
      position="static" 
      color="primary" 
      elevation={0}
      sx={{ 
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: 1 }}>
          <BarChartIcon sx={{ mr: 1.5, fontSize: 28 }} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              fontWeight: 600,
              letterSpacing: '0.01rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Education & Fertility Dashboard
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SchoolIcon sx={{ mr: 1, fontSize: 20 }} />
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
              }}
            >
              2008-2023 ACS PUMS Data
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header; 