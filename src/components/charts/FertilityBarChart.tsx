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
import { getEducationColor, chartStyles } from '@/utils/chartHelpers';

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

interface FertilityBarChartProps {
  showTitle?: boolean;
  embedded?: boolean;
}

const FertilityBarChart: React.FC<FertilityBarChartProps> = ({ 
  showTitle = true,
  embedded = false 
}) => {
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
        <CircularProgress color="primary" />
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
  
  // Chart content
  const chartContent = (
    <>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'center', 
        justifyContent: 'space-between', 
        mb: 2,
        gap: 2
      }}>
        {showTitle && (
          <Typography variant="h4" sx={{ flexShrink: 0 }}>
            Fertility Rates by Education Level
          </Typography>
        )}
        
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
            
            // Get color from our design system
            const educationColor = getEducationColor(educGroup);
            
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
                        <Typography 
                          variant="subtitle2"
                          sx={{
                            fontWeight: 'bold',
                            color: '#fff' // Explicitly set white color
                          }}
                        >
                          {educGroup}
                        </Typography>
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
                    <Fade in={true} timeout={chartStyles.animation.standard}>
                      <Box
                        sx={{
                          width: barWidth,
                          height: `${item.fertility_rate ? (item.fertility_rate / maxRate) * 100 : 0}%`,
                          bgcolor: educationColor,
                          borderTopLeftRadius: 4,
                          borderTopRightRadius: 4,
                          position: 'relative',
                          '&:hover': {
                            opacity: 0.9,
                            transform: 'scale(1.02)',
                            transition: `transform ${chartStyles.animation.short}ms ease-in-out`
                          },
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                          pt: 1,
                          transition: `height ${chartStyles.animation.standard}ms ease-out`,
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
                          <Typography 
                            variant="subtitle2"
                            sx={{
                              fontWeight: 'bold',
                              color: '#fff' // Explicitly set white color
                            }}
                          >
                            {educGroup}
                          </Typography>
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
                      <Fade in={true} timeout={chartStyles.animation.standard}>
                        <Box
                          sx={{
                            width: barWidth,
                            height: `${comparisonItem.fertility_rate ? (comparisonItem.fertility_rate / maxRate) * 100 : 0}%`,
                            bgcolor: `${educationColor}99`, // Add transparency to comparison bar
                            borderTopLeftRadius: 4,
                            borderTopRightRadius: 4,
                            position: 'relative',
                            opacity: 0.8,
                            '&:hover': {
                              opacity: 0.9,
                              transform: 'scale(1.02)',
                              transition: `transform ${chartStyles.animation.short}ms ease-in-out`
                            },
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            pt: 1,
                            transition: `height ${chartStyles.animation.standard}ms ease-out`,
                            border: `1px dashed ${educationColor}`,
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
      
      {/* Axis and labels */}
      <Box sx={{ 
        mt: 1, 
        display: 'flex', 
        justifyContent: 'center',
        px: 3,
        alignItems: 'center',
      }}>
        <Typography 
          variant="body2" 
          sx={{ 
            textAlign: 'center',
            fontSize: { xs: '0.7rem', sm: '0.8rem' },
            color: 'text.secondary'
          }}
        >
          Births per 1,000 women aged 15-50
        </Typography>
        
        {showComparison && comparisonYear && (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            ml: 2,
            gap: 1,
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              mr: 1
            }}>
              <Box sx={{ 
                width: 12, 
                height: 12, 
                bgcolor: theme.palette.primary.main,
                mr: 0.5 
              }} />
              <Typography variant="caption">{selectedYear}</Typography>
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center' 
            }}>
              <Box sx={{ 
                width: 12, 
                height: 12, 
                bgcolor: `${theme.palette.primary.main}99`,
                border: `1px dashed ${theme.palette.primary.main}`,
                mr: 0.5 
              }} />
              <Typography variant="caption">{comparisonYear}</Typography>
            </Box>
          </Box>
        )}
      </Box>
      
      {/* Accessibility note */}
      <Typography 
        variant="caption" 
        sx={{ 
          display: 'block', 
          textAlign: 'center', 
          mt: 2,
          color: 'text.secondary',
          fontSize: '0.65rem'
        }}
      >
        * Chart shows fertility rates (births per 1,000 women aged 15-50) by education level.
      </Typography>
    </>
  );
  
  // Return chart with or without Paper container based on embedded prop
  return embedded ? (
    chartContent
  ) : (
    <Paper 
      elevation={1} 
      sx={{ 
        p: { xs: 1.5, sm: 2, md: 3 }, 
        m: { xs: 1, sm: 2 },
        maxWidth: '100%',
        overflow: 'hidden'
      }}
    >
      {chartContent}
    </Paper>
  );
};

export default FertilityBarChart; 