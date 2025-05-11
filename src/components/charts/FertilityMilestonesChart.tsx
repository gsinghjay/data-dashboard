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
  useTheme,
  useMediaQuery,
  Fade,
  FormControlLabel,
  Switch,
  Stack,
  Tooltip
} from '@mui/material';
import { useData } from '@/contexts/DataContext';
import { fetchNationalTrends } from '@/utils/api';
import { getEducationColor, chartStyles, getOrderedEducationGroups } from '@/utils/chartHelpers';
import * as d3 from 'd3';

// All education groups in correct display order
const EDUCATION_GROUPS = getOrderedEducationGroups();

// Define milestone transitions
const MILESTONE_TRANSITIONS = [
  { from: 'Less than High School', to: 'High School Diploma', label: 'Completing High School' },
  { from: 'High School Diploma', to: 'Some College', label: 'Starting College' },
  { from: 'Some College', to: 'Associate\'s Degree', label: 'Completing Associate\'s' },
  { from: 'Associate\'s Degree', to: 'Bachelor\'s Degree', label: 'Completing Bachelor\'s' },
  { from: 'Bachelor\'s Degree', to: 'Master\'s Degree', label: 'Completing Master\'s' },
  { from: 'Master\'s Degree', to: 'Professional/Doctorate Degree', label: 'Completing Doctorate' }
];

interface NationalTrendData {
  year: number;
  education_group: string;
  total_women: number;
  total_births: number;
  fertility_rate: number;
}

interface FertilityMilestonesChartProps {
  showTitle?: boolean;
  embedded?: boolean;
}

interface TransitionData {
  milestone: string;
  year: number;
  fromGroup: string;
  toGroup: string;
  fromRate: number;
  toRate: number;
  absoluteDiff: number;
  percentDiff: number;
}

// Interface for tooltip data
interface TooltipData {
  milestone: string;
  fromGroup: string;
  toGroup: string;
  fromRate: number;
  toRate: number;
  absoluteDiff: number;
  percentDiff: number;
  x: number;
  y: number;
}

const FertilityMilestonesChart: React.FC<FertilityMilestonesChartProps> = ({ 
  showTitle = true,
  embedded = false 
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<NationalTrendData[]>([]);
  const [transitionData, setTransitionData] = useState<TransitionData[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(2023);
  const [showPercentage, setShowPercentage] = useState<boolean>(false);
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);
  const [tooltipOpen, setTooltipOpen] = useState(false);
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
        
        // Process transition data
        const transitions: TransitionData[] = [];
        
        // Map education groups to their fertility rates
        const ratesByGroup: Record<string, number> = {};
        trends.forEach(item => {
          ratesByGroup[item.education_group] = item.fertility_rate || 0;
        });
        
        // Calculate differences between transitions
        MILESTONE_TRANSITIONS.forEach(transition => {
          const fromRate = ratesByGroup[transition.from] || 0;
          const toRate = ratesByGroup[transition.to] || 0;
          const absoluteDiff = toRate - fromRate;
          const percentDiff = fromRate > 0 ? ((toRate - fromRate) / fromRate) * 100 : 0;
          
          transitions.push({
            milestone: transition.label,
            year: selectedYear,
            fromGroup: transition.from,
            toGroup: transition.to,
            fromRate,
            toRate,
            absoluteDiff,
            percentDiff
          });
        });
        
        setTransitionData(transitions);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [selectedYear]);
  
  const handleYearChange = (event: SelectChangeEvent) => {
    setSelectedYear(Number(event.target.value));
  };
  
  const handleViewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowPercentage(event.target.checked);
  };

  const handleMouseLeave = () => {
    setTooltipOpen(false);
    setTooltipData(null);
  };
  
  // Draw the chart with D3
  useEffect(() => {
    if (loading || error || !transitionData.length || !chartRef.current) return;

    // Clear previous chart
    d3.select(chartRef.current).select('svg').remove();
    
    // Set dimensions
    const chartWidth = chartRef.current.clientWidth;
    const chartHeight = isMobile ? 400 : 450;
    const margin = {
      top: chartStyles.margin.top,
      right: chartStyles.margin.right,
      bottom: chartStyles.margin.bottom + 80, // User increased space for x-axis labels
      left: chartStyles.margin.left + (showPercentage ? 30 : 40) // More space for y-axis label
    };
    const width = chartWidth - margin.left - margin.right;
    const height = chartHeight - margin.top - margin.bottom;
    
    // Create SVG
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', chartWidth)
      .attr('height', chartHeight)
      .attr('viewBox', `0 0 ${chartWidth} ${chartHeight}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .attr('role', 'img')
      .attr('aria-label', 'Chart showing fertility rate changes between educational milestones')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // X axis (milestones)
    const x = d3.scaleBand()
      .domain(transitionData.map(d => d.milestone))
      .range([0, width])
      .padding(0.3);
    
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,10)rotate(-45)') // Increased vertical offset
      .style('text-anchor', 'end')
      .style('font-size', isMobile ? '0.6rem' : '0.75rem');
    
    // Y axis (fertility rate difference)
    const values = showPercentage 
      ? transitionData.map(d => d.percentDiff)
      : transitionData.map(d => d.absoluteDiff);
    
    const yMin = Math.min(0, ...values); // Ensure 0 is included for proper visualization
    const yMax = Math.max(0, ...values);
    const yPadding = (yMax - yMin) * 0.1; // Add 10% padding
    
    const y = d3.scaleLinear()
      .domain([yMin - yPadding, yMax + yPadding])
      .range([height, 0]);
    
    svg.append('g')
      .call(d3.axisLeft(y).ticks(5));
    
    // Add Y axis label
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -margin.left + 10) // Adjusted position
      .attr('x', -height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .style('font-size', '0.75rem')
      .text(showPercentage ? 'Percent Change (%)' : 'Absolute Change (births per 1,000 women)');
    
    // Zero line
    svg.append('line')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', y(0))
      .attr('y2', y(0))
      .style('stroke', theme.palette.grey[400])
      .style('stroke-dasharray', '3,3')
      .style('stroke-width', 1);
    
    // Create bars
    svg.selectAll('.milestone-bar')
      .data(transitionData)
      .enter()
      .append('rect')
      .attr('class', 'milestone-bar')
      .attr('x', d => x(d.milestone) || 0)
      .attr('width', x.bandwidth())
      .attr('y', d => {
        const value = showPercentage ? d.percentDiff : d.absoluteDiff;
        return value >= 0 ? y(value) : y(0);
      })
      .attr('height', d => {
        const value = showPercentage ? d.percentDiff : d.absoluteDiff;
        return Math.abs(y(value) - y(0));
      })
      .attr('fill', (d, i) => {
        // Get colors for the two education groups in the transition
        const fromColor = getEducationColor(d.fromGroup);
        const toColor = getEducationColor(d.toGroup);
        
        // Create linear gradient definitions
        const gradientId = `milestone-gradient-${i}`;
        const gradient = svg.append('defs')
          .append('linearGradient')
          .attr('id', gradientId)
          .attr('x1', '0%')
          .attr('y1', '0%')
          .attr('x2', '100%')
          .attr('y2', '0%');
        
        gradient.append('stop')
          .attr('offset', '0%')
          .attr('stop-color', fromColor);
        
        gradient.append('stop')
          .attr('offset', '100%')
          .attr('stop-color', toColor);
        
        return `url(#${gradientId})`;
      })
      .attr('rx', 4) // Rounded corners
      .attr('ry', 4)
      .on('mouseover', function(event, d) {
        d3.select(this)
          .transition()
          .duration(chartStyles.animation.short)
          .attr('opacity', 0.8)
          .attr('transform', 'scale(1.05)');
          
        // Get position for the tooltip
        const svgElement = chartRef.current?.querySelector('svg');
        const svgRect = svgElement?.getBoundingClientRect();
        const barX = x(d.milestone) || 0;
        const barY = d.absoluteDiff >= 0 ? y(d.absoluteDiff) : y(0);
        
        // Update tooltip data
        setTooltipData({
          milestone: d.milestone,
          fromGroup: d.fromGroup,
          toGroup: d.toGroup,
          fromRate: d.fromRate,
          toRate: d.toRate,
          absoluteDiff: d.absoluteDiff,
          percentDiff: d.percentDiff,
          x: barX + x.bandwidth() / 2,
          y: barY
        });
        setTooltipOpen(true);
      })
      .on('mouseout', function() {
        d3.select(this)
          .transition()
          .duration(chartStyles.animation.short)
          .attr('opacity', 1)
          .attr('transform', 'scale(1)');
      });
    
    // Add labels to bars
    svg.selectAll('.milestone-label')
      .data(transitionData)
      .enter()
      .append('text')
      .attr('class', 'milestone-label')
      .attr('x', d => (x(d.milestone) || 0) + x.bandwidth() / 2)
      .attr('y', d => {
        const value = showPercentage ? d.percentDiff : d.absoluteDiff;
        const position = value >= 0 ? y(value) - 5 : y(value) + 15;
        return position;
      })
      .attr('text-anchor', 'middle')
      .style('font-size', isMobile ? '0.6rem' : '0.75rem')
      .style('fill', d => {
        const value = showPercentage ? d.percentDiff : d.absoluteDiff;
        return value >= 0 ? theme.palette.success.main : theme.palette.error.main;
      })
      .text(d => {
        const value = showPercentage ? d.percentDiff : d.absoluteDiff;
        return showPercentage ? `${value.toFixed(1)}%` : value.toFixed(1);
      });
      
  }, [transitionData, loading, error, showPercentage, theme, isMobile]);
  
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
  
  const chartContent = (
    <>
      {showTitle && (
        <Typography variant="h6" component="h2" gutterBottom align="center" sx={{ pt: 2, px: 2 }}>
          Educational Milestone Impact on Fertility Rates
        </Typography>
      )}
      
      <Box sx={{ px: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <FormControl size="small" sx={{ minWidth: 120 }}>
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
              <Switch
                checked={showPercentage}
                onChange={handleViewChange}
                name="showPercentage"
                color="primary"
              />
            }
            label={
              <Typography variant="body2">
                {showPercentage ? "Percentage Change" : "Absolute Change"}
              </Typography>
            }
          />
        </Stack>
        
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontStyle: 'italic' }}>
          {showPercentage 
            ? "% change in fertility rates between education levels" 
            : "Change in births per 1,000 women between education levels"}
        </Typography>
      </Box>
      
      <Box 
        ref={chartRef}
        sx={{ 
          mt: 1, 
          height: { xs: 400, sm: 450, md: 450 }, // Increased heights
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
          pb: 4
        }}
        onMouseLeave={handleMouseLeave}
      >
        {tooltipOpen && tooltipData && (
          <Fade in={tooltipOpen}>
            <Box
              sx={{
                position: 'absolute',
                top: tooltipData.y - 60,
                left: tooltipData.x,
                transform: 'translateX(-50%)',
                backgroundColor: 'rgba(38, 50, 56, 0.95)',
                color: 'white',
                padding: 1.5,
                borderRadius: 1,
                zIndex: 1500,
                maxWidth: 250,
                pointerEvents: 'none',
                boxShadow: theme.shadows[3],
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5, color: 'white' }}>
                {tooltipData.milestone}
              </Typography>
              <Typography variant="body2" sx={{ color: 'white' }}>
                From: <strong>{tooltipData.fromGroup}</strong> ({tooltipData.fromRate.toFixed(1)})
              </Typography>
              <Typography variant="body2" sx={{ color: 'white' }}>
                To: <strong>{tooltipData.toGroup}</strong> ({tooltipData.toRate.toFixed(1)})
              </Typography>
              <Typography variant="body2" sx={{ color: 'white', mt: 0.5 }}>
                <strong>
                  {showPercentage 
                    ? `${tooltipData.percentDiff > 0 ? '+' : ''}${tooltipData.percentDiff.toFixed(1)}%` 
                    : `${tooltipData.absoluteDiff > 0 ? '+' : ''}${tooltipData.absoluteDiff.toFixed(1)} per 1,000`
                  }
                </strong>
              </Typography>
            </Box>
          </Fade>
        )}
      </Box>
      
      <Box sx={{ px: 2, mt: 2, mb: 3 }}>
        <Typography variant="body2" component="div" sx={{ color: theme.palette.text.secondary }}>
          <strong>Key Insight:</strong> This chart shows how completing each educational milestone affects fertility rates. 
          {transitionData.length > 0 && (
            <>
              {" "}The largest change occurs when transitioning from {
                transitionData.reduce((max, current) => {
                  const currentValue = Math.abs(showPercentage ? current.percentDiff : current.absoluteDiff);
                  const maxValue = Math.abs(showPercentage ? max.percentDiff : max.absoluteDiff);
                  return currentValue > maxValue ? current : max;
                }).milestone
              }.
            </>
          )}
        </Typography>
      </Box>
    </>
  );
  
  if (embedded) {
    return chartContent;
  }
  
  return (
    <Paper 
      elevation={2} 
      sx={{ 
        borderRadius: 2, 
        overflow: 'hidden',
        mb: 4,
        maxWidth: '100%' 
      }}
    >
      {chartContent}
    </Paper>
  );
};

export default FertilityMilestonesChart; 