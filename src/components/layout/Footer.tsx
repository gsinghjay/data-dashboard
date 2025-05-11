"use client";

import React from 'react';
import { Box, Container, Typography, Link, Divider, Grid } from '@mui/material';
import NextLink from 'next/link';
import SchoolIcon from '@mui/icons-material/School';
import PaletteIcon from '@mui/icons-material/Palette';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: theme => theme.palette.background.default,
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Educational Attainment & Fertility
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Exploring the relationship between women's educational attainment 
              and fertility rates across the United States from 2008-2023.
            </Typography>
          </Grid>
          
          <Grid item xs={6} md={4}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Resources
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                color="primary"
                href="https://www.census.gov/programs-surveys/acs/microdata.html"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <SchoolIcon fontSize="small" />
                ACS PUMS Data
              </Link>
              
              <Link
                color="primary"
                href="https://github.com/your-repo-link"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <GitHubIcon fontSize="small" />
                GitHub Repository
              </Link>
              
              <Link
                component={NextLink}
                href="/design-system"
                color="primary"
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <PaletteIcon fontSize="small" />
                Design System
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={6} md={4}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              About
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              This dashboard visualizes data from the American Community Survey to 
              reveal patterns between educational attainment and fertility rates.
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {`© ${new Date().getFullYear()} | Educated Horizons Dashboard`}
            </Typography>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="caption" color="text.secondary" align="center" sx={{ display: 'block' }}>
          Made with the "Educated Horizons" design system | All data comes from U.S. Census Bureau ACS PUMS files
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 