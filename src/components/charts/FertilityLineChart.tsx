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
  Checkbox,
  FormControlLabel,
  Stack,
  Tooltip,
  useTheme,
  useMediaQuery,
  Fade
} from '@mui/material';
import { useData } from '@/contexts/DataContext';
import { fetchNationalTrends } from '@/utils/api';
import { getEducationColor, getOrderedEducationGroups, chartStyles } from '@/utils/chartHelpers';
import * as d3 from 'd3';

interface NationalTrendData {
  year: number;
  education_group: string;
  total_women: number;
  total_births: number;
  fertility_rate: number;
}

// Default education groups to display
const DEFAULT_SELECTED_GROUPS = [
  'Less than High School',
  'High School Diploma',
  'Bachelor\'s Degree',
  'Professional/Doctorate Degree'
];

// All education groups in correct display order
const EDUCATION_GROUPS = getOrderedEducationGroups();

interface FertilityLineChartProps {
  showTitle?: boolean;
  embedded?: boolean;
}

const FertilityLineChart: React.FC<FertilityLineChartProps> = ({ 
  showTitle = true,
  embedded = false 
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<NationalTrendData[]>([]);
  const [selectedEducationGroups, setSelectedEducationGroups] = useState<string[]>(DEFAULT_SELECTED_GROUPS);
  const { state } = useData();
  const chartRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Theme and responsive design
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));

  // Available years range
  const availableYears = Array.from({ length: 2023 - 2008 + 1 }, (_, i) => 2008 + i);
  
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        // We need data for all years but only selected education groups
        const trends = await fetchNationalTrends({ 
          year: availableYears,
          education: selectedEducationGroups.length > 0 ? selectedEducationGroups : undefined
        });
        setData(trends);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [selectedEducationGroups]);
  
  // Toggle selection of education groups
  const handleEducationGroupToggle = (group: string) => {
    setSelectedEducationGroups(prev => {
      if (prev.includes(group)) {
        return prev.filter(g => g !== group);
      } else {
        return [...prev, group];
      }
    });
  };

  // Handle select all / none
  const handleSelectAll = () => {
    if (selectedEducationGroups.length === EDUCATION_GROUPS.length) {
      setSelectedEducationGroups([]);
    } else {
      setSelectedEducationGroups([...EDUCATION_GROUPS]);
    }
  };

  // Draw chart with D3
  useEffect(() => {
    if (loading || error || !data.length || !chartRef.current) return;

    // Clear previous chart
    d3.select(chartRef.current).select('svg').remove();

    // Group data by education group
    const groupedData = EDUCATION_GROUPS.map(group => {
      const groupData = data.filter(d => d.education_group === group);
      // Ensure data is sorted by year
      return {
        education_group: group,
        values: groupData.sort((a, b) => a.year - b.year)
      };
    }).filter(group => selectedEducationGroups.includes(group.education_group));

    // Set dimensions
    const chartWidth = chartRef.current.clientWidth;
    const chartHeight = isMobile ? 300 : 400;
    const margin = {
      top: chartStyles.margin.top,
      right: chartStyles.margin.right + 80, // Increased space for legend
      bottom: chartStyles.margin.bottom,
      left: chartStyles.margin.left + 15 // Increased left margin for Y-axis label
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
      .attr('aria-label', 'Line chart showing fertility rate trends by education level from 2008 to 2023')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    svgRef.current = svg.node()?.parentElement as SVGSVGElement;

    // Find min and max years
    const years = availableYears;
    const minYear = years[0];
    const maxYear = years[years.length - 1];

    // Create X scale
    const x = d3.scaleLinear()
      .domain([minYear, maxYear])
      .range([0, width]);

    // Find min and max fertility rates
    const allRates = data.map(d => d.fertility_rate);
    const minRate = Math.min(...allRates) * 0.9; // Add some padding
    const maxRate = Math.max(...allRates) * 1.1;

    // Create Y scale
    const y = d3.scaleLinear()
      .domain([0, maxRate])
      .range([height, 0]);

    // Add X axis
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x).ticks(isMobile ? 5 : 8).tickFormat(d => d.toString()))
      .attr('aria-label', 'Years')
      .selectAll("text")
      .style('font-size', chartStyles.fontSize.axisLabel)
      .style('font-family', "'Inter', sans-serif");

    // Add Y axis
    svg.append('g')
      .call(d3.axisLeft(y).ticks(5))
      .attr('aria-label', 'Fertility rate (births per 1,000 women)')
      .selectAll("text")
      .style('font-size', chartStyles.fontSize.axisLabel)
      .style('font-family', "'Inter', sans-serif");

    // Add Y axis label
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -margin.left + 5) // Moved further left 
      .attr('x', -height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .style('font-size', '0.8rem')
      .style('fill', theme.palette.text.secondary)
      .text('Births per 1,000 women');

    // Add X axis grid lines
    svg.append('g')
      .attr('class', 'grid x-grid')
      .attr('transform', `translate(0, ${height})`)
      .call(
        d3.axisBottom(x)
          .ticks(isMobile ? 5 : 8)
          .tickSize(-height)
          .tickFormat(() => '')
      )
      .selectAll('line')
      .style('stroke', chartStyles.ui.axes)
      .style('stroke-opacity', 0.5);

    // Add Y axis grid lines
    svg.append('g')
      .attr('class', 'grid y-grid')
      .call(
        d3.axisLeft(y)
          .ticks(5)
          .tickSize(-width)
          .tickFormat(() => '')
      )
      .selectAll('line')
      .style('stroke', chartStyles.ui.axes)
      .style('stroke-opacity', 0.5);

    // Define line generator
    const line = d3.line<NationalTrendData>()
      .x(d => x(d.year))
      .y(d => y(d.fertility_rate))
      .curve(d3.curveMonotoneX); // Smooth curve

    // Create a tooltip
    const tooltip = d3.select(chartRef.current)
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('background-color', chartStyles.ui.tooltip)
      .style('color', 'white')
      .style('padding', '8px')
      .style('border-radius', '4px')
      .style('font-size', chartStyles.fontSize.tooltip)
      .style('pointer-events', 'none')
      .style('z-index', 1000)
      .style('max-width', '200px');

    // Helper function to position tooltip
    const positionTooltip = (event: MouseEvent) => {
      const bodyWidth = document.body.clientWidth;
      const tooltipWidth = 200; // Approximate width of tooltip
      
      // Keep tooltip within window bounds
      const xPosition = event.pageX + tooltipWidth + 10 > bodyWidth 
        ? event.pageX - tooltipWidth - 10 
        : event.pageX + 10;
      
      return {
        left: `${xPosition}px`,
        top: `${event.pageY - 28}px`
      };
    };

    // Draw lines for each education group
    groupedData.forEach(group => {
      if (group.values.length < 2) return; // Need at least 2 points to draw a line

      const color = getEducationColor(group.education_group);
      
      // Sanitize the education group name for use as a CSS class
      const sanitizedClassName = group.education_group
        .replace(/[']/g, '') // Remove apostrophes
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/[^\w-]/g, ''); // Remove any other non-alphanumeric characters
      
      // Add the line
      svg.append('path')
        .datum(group.values)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', chartStyles.size.lineWidth)
        .attr('d', line as any)
        .attr('aria-label', `Trend line for ${group.education_group}`)
        .style('opacity', 0)
        .transition()
        .duration(chartStyles.animation.standard)
        .style('opacity', 1);

      // Add dots for each data point
      svg.selectAll(`.dot-${sanitizedClassName}`)
        .data(group.values)
        .enter()
        .append('circle')
        .attr('class', `dot-${sanitizedClassName}`)
        .attr('cx', d => x(d.year))
        .attr('cy', d => y(d.fertility_rate))
        .attr('r', chartStyles.size.dotRadius)
        .attr('fill', color)
        .style('opacity', 0)
        .transition()
        .duration(chartStyles.animation.standard)
        .style('opacity', 1);

      // Create invisible larger circles for better hover interaction
      svg.selectAll(`.hover-${sanitizedClassName}`)
        .data(group.values)
        .enter()
        .append('circle')
        .attr('class', `hover-${sanitizedClassName}`)
        .attr('cx', d => x(d.year))
        .attr('cy', d => y(d.fertility_rate))
        .attr('r', chartStyles.size.tooltipRadius / 2) // Large enough for touch targets
        .attr('fill', 'transparent')
        .style('cursor', 'pointer')
        .on('mouseover', function(event, d) {
          d3.select(this.parentNode)
            .selectAll(`.dot-${sanitizedClassName}`)
            .filter(point => (point as any).year === d.year)
            .attr('r', chartStyles.size.dotRadius * 1.5)
            .attr('stroke', 'white')
            .attr('stroke-width', 2);

          tooltip.transition()
            .duration(200)
            .style('opacity', 0.9);
            
          tooltip.html(`
            <div style="font-weight: bold">${group.education_group}</div>
            <div>Year: ${d.year}</div>
            <div>Rate: ${d.fertility_rate.toFixed(1)} per 1,000 women</div>
            <div>Births: ${d.total_births.toLocaleString()}</div>
            <div>Women: ${d.total_women.toLocaleString()}</div>
          `)
            .style(positionTooltip(event));
        })
        .on('mouseout', function() {
          d3.select(this.parentNode)
            .selectAll(`.dot-${sanitizedClassName}`)
            .attr('r', chartStyles.size.dotRadius)
            .attr('stroke', 'none');

          tooltip.transition()
            .duration(500)
            .style('opacity', 0);
        });
    });

    // Adjust legend spacing based on item count
    const legendSpacing = Math.min(25, Math.max(15, height / (groupedData.length + 1)));
    
    // Use smaller spacing for many groups
    const effectiveSpacing = groupedData.length > 5 ? 
      Math.min(legendSpacing, Math.floor((height - 30) / groupedData.length)) : 
      legendSpacing;
      
    // Add a legend with background
    // First add a background rectangle for the legend
    const legendPadding = { top: 8, right: 8, bottom: 8, left: 5 };
    const legendWidth = 160; // Approximate width of legend
    const legendHeight = (groupedData.length * effectiveSpacing) + legendPadding.top + legendPadding.bottom + 20; // Add space for title
    
    // Add background for legend
    svg.append('rect')
      .attr('x', width + legendPadding.left)
      .attr('y', legendPadding.top)
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .attr('fill', 'rgba(255, 255, 255, 0.9)')
      .attr('rx', 4)
      .attr('ry', 4)
      .style('stroke', theme.palette.divider)
      .style('stroke-width', '1px');

    // Add a legend
    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${width + 15}, ${legendPadding.top + 10})`);
    
    // Create a title for the legend
    legend.append('text')
      .attr('x', 0)
      .attr('y', -5)
      .text('Education Level')
      .style('font-size', '0.75rem')
      .style('font-weight', 'bold')
      .style('font-family', "'Inter', sans-serif");
       
    groupedData.forEach((group, i) => {
      const legendItem = legend.append('g')
        .attr('transform', `translate(0, ${15 + i * effectiveSpacing})`);

      legendItem.append('rect')
        .attr('width', 12)
        .attr('height', 12)
        .attr('fill', getEducationColor(group.education_group))
        .attr('rx', 2) // Slightly rounded corners
        .attr('ry', 2);

      legendItem.append('text')
        .attr('x', 18)
        .attr('y', 9)
        .text(isMobile ? 
          group.education_group
            .replace('Less than High School', 'Less than HS')
            .replace('High School Diploma', 'HS Diploma')
            .replace('Associate\'s Degree', 'Associate\'s')
            .replace('Bachelor\'s Degree', 'Bachelor\'s')
            .replace('Master\'s Degree', 'Master\'s')
            .replace('Professional/Doctorate Degree', 'Prof/Doctorate')
          : 
          group.education_group
        )
        .style('font-size', '0.7rem')
        .style('font-family', "'Inter', sans-serif");
    });

  }, [data, loading, error, selectedEducationGroups, isMobile, isMedium, theme.palette.text.secondary]);

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
            Fertility Rate Trends by Education Level (2008-2023)
          </Typography>
        )}
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          width: '100%'
        }}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={selectedEducationGroups.length === EDUCATION_GROUPS.length}
                indeterminate={selectedEducationGroups.length > 0 && selectedEducationGroups.length < EDUCATION_GROUPS.length}
                onChange={handleSelectAll}
                size="small"
              />
            }
            label="Select All/None"
            sx={{ 
              ml: 0,
              '& .MuiFormControlLabel-label': { 
                fontSize: '0.875rem' 
              }
            }}
          />
          
          <Box sx={{ 
            display: 'flex',
            flexWrap: 'wrap',
            gap: 0.5,
            mt: 1
          }}>
            {EDUCATION_GROUPS.map((group) => (
              <FormControlLabel
                key={group}
                control={
                  <Checkbox 
                    checked={selectedEducationGroups.includes(group)}
                    onChange={() => handleEducationGroupToggle(group)}
                    size="small"
                    sx={{
                      color: getEducationColor(group),
                      '&.Mui-checked': {
                        color: getEducationColor(group),
                      },
                    }}
                  />
                }
                label={isMobile || isMedium ? 
                  group
                    .replace('Less than High School', 'Less than HS')
                    .replace('High School Diploma', 'HS Diploma')
                    .replace('Associate\'s Degree', 'Associate\'s')
                    .replace('Bachelor\'s Degree', 'Bachelor\'s')
                    .replace('Master\'s Degree', 'Master\'s')
                    .replace('Professional/Doctorate Degree', 'Prof/Doctorate')
                  : 
                  group
                }
                sx={{ 
                  '& .MuiFormControlLabel-label': { 
                    fontSize: '0.75rem' 
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
      
      <Box 
        ref={chartRef}
        sx={{ 
          height: { xs: 300, sm: 350, md: 400 }, 
          width: '100%',
          position: 'relative',
          mt: 2,
          mb: 2,
        }}
      />
      
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
        * Chart shows fertility rate trends (births per 1,000 women aged 15-50) by education level from 2008 to 2023.
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

export default FertilityLineChart; 