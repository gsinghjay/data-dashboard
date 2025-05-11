"use client";

import { Box, Typography, Paper, Divider, Button, Chip } from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import { educationColors } from '@/utils/theme';
import { getAccessibleTextColor } from '@/utils/chartHelpers';
import NarrativeFlow from '@/components/layout/NarrativeFlow';

export default function Home() {
  return (
    <>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h1" component="h1" gutterBottom fontWeight={600}>
          Educational Attainment & Fertility Rates
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ fontSize: '1.1rem', maxWidth: '800px', mb: 3 }}>
          Explore the relationship between women's educational attainment and fertility rates across the United States from 2008 to 2023
        </Typography>
        
        <Divider sx={{ mb: 4 }} />
      </Box>

      {/* Design System Highlight */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mb: 4, 
          background: 'linear-gradient(to right, rgba(94, 53, 177, 0.05), rgba(94, 53, 177, 0.1))',
          border: '1px solid rgba(94, 53, 177, 0.2)',
          borderRadius: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <PaletteIcon sx={{ mr: 1.5, color: 'secondary.main' }} />
          <Typography variant="h4" component="h2" color="secondary.main">
            Educated Horizons Design System
          </Typography>
        </Box>
        <Typography paragraph>
          Our data visualizations use a custom design system with a blue-to-purple palette that visually represents educational progression, 
          from less than high school to professional/doctorate degrees.
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
          {Object.entries(educationColors).map(([key, color]) => {
            const textColor = getAccessibleTextColor(color);
            return (
              <Chip 
                key={key} 
                label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                sx={{ 
                  bgcolor: color, 
                  color: textColor,
                  fontWeight: 500,
                  px: 1,
                  '&:hover': { 
                    transform: 'translateY(-2px)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  },
                  transition: 'all 300ms ease',
                }} 
              />
            );
          })}
        </Box>
        <Button 
          component={Link}
          href="/design-system"
          variant="outlined" 
          color="secondary" 
          endIcon={<ArrowForwardIcon />}
        >
          View Design System Documentation
        </Button>
      </Paper>

      {/* Narrative Flow */}
      <NarrativeFlow />
    </>
  );
}
