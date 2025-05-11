"use client";

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const EssentialQuestion: React.FC = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        padding: 4,
        backgroundColor: 'rgb(245, 245, 250)',
        borderRadius: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 8,
          height: '100%',
          background: 'linear-gradient(to bottom, #B0BEC5, #78909C, #64B5F6, #42A5F5, #2962FF, #5E35B1, #311B92)',
        }}
      />
      
      <Box sx={{ pl: 3 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
          OUR ESSENTIAL QUESTION
        </Typography>
        
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            fontFamily: "'Source Serif Pro', serif", 
            fontWeight: 600,
            lineHeight: 1.3,
            color: '#2962FF',
            mb: 2
          }}
        >
          How does a mother's education level influence her recent fertility?
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ fontFamily: "'Inter', sans-serif" }}>
          Exploring data from the American Community Survey (2008-2023)
        </Typography>
      </Box>
    </Paper>
  );
};

export default EssentialQuestion; 