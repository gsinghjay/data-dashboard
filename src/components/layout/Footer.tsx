"use client";

import React from 'react';
import { Box, Container, Typography, Link, Divider } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: 'white',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Educational Attainment & Fertility Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`© ${new Date().getFullYear()}`}
          </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Data Source:{' '}
          <Link
            color="primary"
            href="https://www.census.gov/programs-surveys/acs/microdata.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            American Community Survey (ACS) PUMS
          </Link>
          {' | '}
          <Link
            color="primary"
            href="https://github.com/your-repo-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Repository
          </Link>
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
          This dashboard visualizes the relationship between women's educational attainment and fertility rates across the United States from 2008-2023.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 