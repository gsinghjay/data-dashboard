"use client";

import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import BarChartIcon from '@mui/icons-material/BarChart';
import PaletteIcon from '@mui/icons-material/Palette';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header: React.FC = () => {
  const pathname = usePathname();
  const isDesignSystemPage = pathname === '/design-system';

  return (
    <AppBar 
      position="static" 
      color="primary" 
      elevation={0}
      sx={{ 
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        borderRadius: 0
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: 1 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
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
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {!isDesignSystemPage && (
              <Link href="/design-system" passHref style={{ textDecoration: 'none' }}>
                <Button 
                  startIcon={<PaletteIcon />} 
                  variant="outlined" 
                  color="inherit" 
                  size="small"
                  sx={{ mr: 2 }}
                >
                  Design System
                </Button>
              </Link>
            )}
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
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header; 