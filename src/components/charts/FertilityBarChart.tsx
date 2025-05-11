'use client';

import React, { useEffect, useState, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  CircularProgress, 
  Alert, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  SelectChangeEvent,
  Tooltip,
  useTheme,
  useMediaQuery,
  Fade,
  Checkbox,
  FormControlLabel,
  Stack
} from '@mui/material';
import { useData } from '@/contexts/DataContext';
import { fetchNationalTrends } from '@/utils/api';

interface NationalTrendData {
  year: number;
  education_group: string;
  total_women: number;
  total_births: number;
  fertility_rate: number;
}

// Education groups in correct display order (from least to most education)
const EDUCATION_GROUPS = [
  'Less than High School',
  'High School Diploma',
  'Some College',
  'Associate\'s Degree',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'Professional/Doctorate Degree'
];

// Education level colors (from less to more education)
const EDUCATION_COLORS = [
  '#9e0142', // Less than HS - dark red
  '#d53e4f', // HS Diploma - red
  '#f46d43', // Some College - orange
  '#fdae61', // Associate's - light orange 
  '#66c2a5', // Bachelor's - light teal
  '#3288bd', // Master's - blue
  '#5e4fa2'  // Professional/Doctorate - purple
];

const FertilityBarChart: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<NationalTrendData[]>([]);
  const [comparisonData, setComparisonData] = useState<NationalTrendData[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(2023);
  const [comparisonYear, setComparisonYear] = useState<number | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const { state } = useData();
  const chartRef = useRef<HTMLDivElement>(null);

  // Theme and responsive design
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));
  
  // Array of available years (2008-2023)
  const availableYears = Array.from({ length: 2023 - 2008 + 1 }, (_, i) => 2023 - i);
  
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        // Fetch data for the selected year
        const trends = await fetchNationalTrends({ year: selectedYear });
        setData(trends);
        
        // If comparison is enabled, fetch comparison year data
        if (showComparison && comparisonYear) {
          const comparisonTrends = await fetchNationalTrends({ year: comparisonYear });
          setComparisonData(comparisonTrends);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [selectedYear, comparisonYear, showComparison]);
  
  const handleYearChange = (event: SelectChangeEvent) => {
    setSelectedYear(Number(event.target.value));
  };
  
  const handleComparisonYearChange = (event: SelectChangeEvent) => {
    setComparisonYear(Number(event.target.value));
  };
  
  const handleComparisonToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowComparison(event.target.checked);
    // Set default comparison year if not already set
    if (event.target.checked && !comparisonYear) {
      setComparisonYear(selectedYear > 2008 ? selectedYear - 5 : 2008);
    }
  };
  
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
  
  // Create a map of education group to its data
  const educationDataMap: Record<string, NationalTrendData | undefined> = {};
  data.forEach(item => {
    educationDataMap[item.education_group] = item;
  });
  
  // Create a map for comparison data if available
  const comparisonDataMap: Record<string, NationalTrendData | undefined> = {};
  if (showComparison && comparisonData.length > 0) {
    comparisonData.forEach(item => {
      comparisonDataMap[item.education_group] = item;
    });
  }
  
  // Find the maximum fertility rate for scaling
  const primaryRates = data.map(d => d.fertility_rate || 0);
  const comparisonRates = showComparison ? comparisonData.map(d => d.fertility_rate || 0) : [];
  const maxRate = Math.max(...[...primaryRates, ...comparisonRates], 0);
  
  // Calculate bar width based on comparison mode and screen size
  const barWidth = isMobile ? '95%' : (showComparison ? '45%' : '80%');
  
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: { xs: 1.5, sm: 2, md: 3 }, 
        m: { xs: 1, sm: 2 },
        maxWidth: '100%',
        overflow: 'hidden'
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'center', 
        justifyContent: 'space-between', 
        mb: 2,
        gap: 2
      }}>
        <Typography variant="h6" sx={{ flexShrink: 0 }}>
          Fertility Rates by Education Level
        </Typography>
        
        <Stack 
          direction={isMobile ? 'column' : 'row'} 
          spacing={2} 
          alignItems={isMobile ? 'flex-start' : 'center'}
          sx={{ width: isMobile ? '100%' : 'auto' }}
        >
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="year-select-label">Year</InputLabel>
            <Select
              labelId="year-select-label"
              id="year-select"
              value={selectedYear.toString()}
              label="Year"
              onChange={handleYearChange}
            >
              {availableYears.map(year => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControlLabel
            control={
              <Checkbox 
                checked={showComparison}
                onChange={handleComparisonToggle}
                size="small"
              />
            }
            label="Compare with year"
            sx={{ 
              ml: 0,
              '& .MuiFormControlLabel-label': { 
                fontSize: isMobile ? '0.875rem' : '1rem' 
              }
            }}
          />
          
          {showComparison && (
            <FormControl sx={{ minWidth: 120 }} size="small">
              <InputLabel id="comparison-year-select-label">Compare To</InputLabel>
              <Select
                labelId="comparison-year-select-label"
                id="comparison-year-select"
                value={comparisonYear?.toString() || ''}
                label="Compare To"
                onChange={handleComparisonYearChange}
              >
                {availableYears.filter(year => year !== selectedYear).map(year => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Stack>
      </Box>
      
      <Box 
        ref={chartRef}
        sx={{ 
          mt: 1, 
          height: { xs: 300, sm: 340, md: 360 }, 
          display: 'flex',
          position: 'relative',
          overflowX: isMobile ? 'scroll' : 'visible',
          overflowY: 'hidden',
          '&::-webkit-scrollbar': {
            height: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.grey[300],
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: theme.palette.grey[100],
          },
          pb: 3
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          minWidth: isMobile ? `${EDUCATION_GROUPS.length * 80}px` : '100%', 
          width: '100%',
          height: '100%',
          alignItems: 'flex-start',
          pt: 4,
          pb: 2
        }}>
          {EDUCATION_GROUPS.map((educGroup, index) => {
            const item = educationDataMap[educGroup];
            const comparisonItem = showComparison ? comparisonDataMap[educGroup] : undefined;
            
            // Skip if we don't have data for this education group
            if (!item) return null;
            
            return (
              <Box
                key={educGroup}
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '100%',
                  justifyContent: 'flex-start',
                  mx: 0.5,
                  minWidth: isMobile ? '70px' : 'auto',
                }}
                role="figure"
                aria-label={`${educGroup} fertility rate: ${item.fertility_rate ? item.fertility_rate.toFixed(1) : 'N/A'} births per 1,000 women in ${selectedYear}`}
              >
                {/* Education level label above the bar */}
                <Typography
                  variant="caption"
                  sx={{
                    textAlign: 'center',
                    fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
                    minHeight: 32,
                    maxHeight: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: 1.2,
                    px: 0.5,
                    mb: 1.5,
                    fontWeight: 'medium'
                  }}
                >
                  {isMobile || isMedium ? 
                    educGroup
                      .replace('Less than High School', 'Less than HS')
                      .replace('High School Diploma', 'HS Diploma')
                      .replace('Associate\'s Degree', 'Associate\'s')
                      .replace('Bachelor\'s Degree', 'Bachelor\'s')
                      .replace('Master\'s Degree', 'Master\'s')
                      .replace('Professional/Doctorate Degree', 'Prof/Doctorate')
                    : educGroup
                  }
                </Typography>
                
                <Box sx={{ 
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  height: '85%',
                  position: 'relative',
                  mt: 2,
                  gap: 0
                }}>
                  {/* Primary year bar */}
                  <Tooltip
                    title={
                      <Box>
                        <Typography variant="subtitle2">{educGroup}</Typography>
                        <Typography variant="body2">
                          Rate: {item.fertility_rate ? item.fertility_rate.toFixed(1) : 'N/A'} per 1,000 women
                        </Typography>
                        <Typography variant="body2">
                          Births: {item.total_births ? item.total_births.toLocaleString() : 'N/A'}
                        </Typography>
                        <Typography variant="body2">
                          Women: {item.total_women ? item.total_women.toLocaleString() : 'N/A'}
                        </Typography>
                        <Typography variant="caption">
                          Year: {selectedYear}
                        </Typography>
                      </Box>
                    }
                    arrow
                    placement="top"
                  >
                    <Fade in={true} timeout={700}>
                      <Box
                        sx={{
                          width: barWidth,
                          height: `${item.fertility_rate ? (item.fertility_rate / maxRate) * 100 : 0}%`,
                          bgcolor: EDUCATION_COLORS[index],
                          borderTopLeftRadius: 4,
                          borderTopRightRadius: 4,
                          position: 'relative',
                          '&:hover': {
                            opacity: 0.9,
                            transform: 'scale(1.02)',
                            transition: 'transform 0.2s ease-in-out'
                          },
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                          pt: 1,
                          transition: 'height 0.5s ease-out',
                          mr: showComparison ? 0 : 'auto',
                          ml: showComparison ? 0 : 'auto'
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.75rem' }
                          }}
                        >
                          {item.fertility_rate ? item.fertility_rate.toFixed(1) : 'N/A'}
                        </Typography>
                      </Box>
                    </Fade>
                  </Tooltip>
                  
                  {/* Comparison year bar */}
                  {showComparison && comparisonItem && (
                    <Tooltip
                      title={
                        <Box>
                          <Typography variant="subtitle2">{educGroup}</Typography>
                          <Typography variant="body2">
                            Rate: {comparisonItem.fertility_rate ? comparisonItem.fertility_rate.toFixed(1) : 'N/A'} per 1,000 women
                          </Typography>
                          <Typography variant="body2">
                            Births: {comparisonItem.total_births ? comparisonItem.total_births.toLocaleString() : 'N/A'}
                          </Typography>
                          <Typography variant="body2">
                            Women: {comparisonItem.total_women ? comparisonItem.total_women.toLocaleString() : 'N/A'}
                          </Typography>
                          <Typography variant="caption">
                            Year: {comparisonYear}
                          </Typography>
                        </Box>
                      }
                      arrow
                      placement="top"
                    >
                      <Fade in={true} timeout={900}>
                        <Box
                          sx={{
                            width: barWidth,
                            height: `${comparisonItem.fertility_rate ? (comparisonItem.fertility_rate / maxRate) * 100 : 0}%`,
                            bgcolor: 'transparent',
                            border: `2px dashed ${EDUCATION_COLORS[index]}`,
                            borderTopLeftRadius: 4,
                            borderTopRightRadius: 4,
                            position: 'relative',
                            '&:hover': {
                              opacity: 0.9,
                              transform: 'scale(1.02)',
                              transition: 'transform 0.2s ease-in-out'
                            },
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            pt: 1,
                            transition: 'height 0.5s ease-out',
                            mr: showComparison ? 0 : 'auto',
                            ml: showComparison ? 0 : 'auto'
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              color: EDUCATION_COLORS[index],
                              fontWeight: 'bold',
                              fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.75rem' }
                            }}
                          >
                            {comparisonItem.fertility_rate ? comparisonItem.fertility_rate.toFixed(1) : 'N/A'}
                          </Typography>
                        </Box>
                      </Fade>
                    </Tooltip>
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
      
      <Box sx={{ 
        mt: 3,
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center', 
        justifyContent: 'center',
        gap: 1,
        pb: 1
      }}>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Births per 1,000 women aged 15-50, nationwide
        </Typography>
        
        {showComparison && comparisonYear && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ 
              width: 16, 
              height: 16, 
              bgcolor: theme.palette.primary.main,
              borderRadius: 0.5
            }} />
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {selectedYear}
            </Typography>
            
            <Box sx={{ 
              width: 16, 
              height: 16, 
              border: `2px dashed ${theme.palette.primary.main}`,
              borderRadius: 0.5
            }} />
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {comparisonYear}
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default FertilityBarChart; 