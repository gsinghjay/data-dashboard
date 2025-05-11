"use client";

import React from 'react';
import { Box, Container, Typography, Link as MuiLink, Divider } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 6, 
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        mt: 8
      }}
    >
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', sm: 'flex-start' },
            textAlign: { xs: 'center', sm: 'left' }
          }}
        >
          <Box sx={{ mb: { xs: 3, sm: 0 }, maxWidth: '500px' }}>
            <Typography variant="h6" gutterBottom>
              Educational Attainment & Fertility Rates
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This interactive data visualization explores the relationship between women's educational attainment and fertility rates 
              across the United States from 2008 to 2023, using American Community Survey (ACS) Public Use Microdata Sample (PUMS) data.
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Data Sources
            </Typography>
            <Typography variant="body2" paragraph>
              <MuiLink href="https://www.census.gov/programs-surveys/acs/microdata.html" target="_blank" rel="noopener noreferrer">
                American Community Survey (ACS)
              </MuiLink>
            </Typography>
            <Typography variant="body2" paragraph>
              <MuiLink href="https://www.census.gov/programs-surveys/acs/microdata/documentation.html" target="_blank" rel="noopener noreferrer">
                ACS PUMS Documentation
              </MuiLink>
            </Typography>
          </Box>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Educational Fertility Dashboard. All rights reserved.
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Created with Next.js, Material UI, and D3.js
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 