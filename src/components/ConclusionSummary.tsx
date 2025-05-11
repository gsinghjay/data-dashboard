'use client';

import React from 'react';
import { Typography, Box } from '@mui/material';

const ConclusionSummary: React.FC = () => {
  return (
    <Box sx={{ mt: 3, px: 2 }}>
      <Typography 
        variant="body1" 
        sx={{ 
          textAlign: 'left',
          lineHeight: 1.6
        }}
      >
        Higher education correlates with higher and more stable fertility rates, contradicting conventional assumptions. 
        Professional/Doctorate degree holders show the highest rates, while geographic factors and economic disruptions reveal 
        education's protective effect on family formation. This suggests policies supporting work-family balance for educated 
        women could address demographic challenges.
      </Typography>
    </Box>
  );
};

export default ConclusionSummary; 