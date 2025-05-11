'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress, Alert } from '@mui/material';
import { useData } from '@/contexts/DataContext';
import { fetchNationalTrends } from '@/utils/api';

interface NationalTrendData {
  year: number;
  education_group: string;
  women_count: number;
  births: number;
  fertility_rate: number;
}

const FertilityBarChart: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<NationalTrendData[]>([]);
  const { state } = useData();
  
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        // Fetch data for the most recent year
        const trends = await fetchNationalTrends({ year: 2023 });
        setData(trends);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Error loading data: {error}
      </Alert>
    );
  }
  
  // Sort data by education display order
  const sortedData = [...data].sort((a, b) => {
    const educOrder: Record<string, number> = {
      'Less than High School': 1,
      'High School Diploma': 2,
      'Some College': 3,
      'Associate Degree': 4,
      'Bachelor\'s Degree': 5,
      'Master\'s Degree': 6,
      'Professional/Doctorate Degree': 7
    };
    return (educOrder[a.education_group] || 99) - (educOrder[b.education_group] || 99);
  });
  
  // Find the maximum fertility rate for scaling
  const maxRate = Math.max(...sortedData.map(d => d.fertility_rate), 0);
  
  // Define colors for the bars
  const colors = [
    '#9e0142', '#d53e4f', '#f46d43', '#fdae61', 
    '#66c2a5', '#3288bd', '#5e4fa2'
  ];
  
  return (
    <Paper elevation={3} sx={{ p: 3, m: 2 }}>
      <Typography variant="h6" gutterBottom>
        Fertility Rates by Education Level (2023)
      </Typography>
      
      <Box sx={{ mt: 3, height: 300, display: 'flex', alignItems: 'flex-end' }}>
        {sortedData.map((item, index) => (
          <Box
            key={item.education_group}
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              justifyContent: 'flex-end',
              mx: 0.5
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: `${(item.fertility_rate / maxRate) * 80}%`,
                bgcolor: colors[index % colors.length],
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
                position: 'relative',
                '&:hover': {
                  opacity: 0.9,
                },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                pt: 1
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                {item.fertility_rate.toFixed(1)}
              </Typography>
            </Box>
            <Typography
              variant="caption"
              sx={{
                mt: 1,
                textAlign: 'center',
                fontSize: '0.7rem',
                height: 40,
                display: 'flex',
                alignItems: 'center',
                lineHeight: 1.2
              }}
            >
              {item.education_group}
            </Typography>
          </Box>
        ))}
      </Box>
      
      <Typography variant="caption" sx={{ display: 'block', mt: 2, textAlign: 'center', color: 'text.secondary' }}>
        Births per 1,000 women aged 15-50, nationwide
      </Typography>
    </Paper>
  );
};

export default FertilityBarChart; 