"use client";

import { Box, Typography, Divider } from '@mui/material';
import NarrativeFlow from '@/components/layout/NarrativeFlow';
import EssentialQuestion from '@/components/common/EssentialQuestion';

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

      {/* Essential Question */}
      <Box sx={{ mb: 4 }}>
        <EssentialQuestion />
      </Box>

      {/* Narrative Flow */}
      <NarrativeFlow />
    </>
  );
}
