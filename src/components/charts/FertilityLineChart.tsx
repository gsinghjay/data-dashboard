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

// Add declaration for d3 module
// declare module 'd3';

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

// Interface for tooltip data
interface TooltipData {
  education_group: string;
  year: number;
  fertility_rate: number;
  total_births: number;
  total_women: number;
  x: number;
  y: number;
}

const FertilityLineChart: React.FC<FertilityLineChartProps> = ({ 
  showTitle = true,
  embedded = false 
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<NationalTrendData[]>([]);
  const [selectedEducationGroups, setSelectedEducationGroups] = useState<string[]>(DEFAULT_SELECTED_GROUPS);
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const { state } = useData();
  const chartRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const legendRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

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

  // Create legend component to display above the chart
  const renderLegend = () => {
    if (!selectedEducationGroups.length) return null;
    
    return (
      <Box 
        ref={legendRef}
        sx={{ 
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          mt: 1,
          mb: 2,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography 
          variant="subtitle2" 
          sx={{ 
            fontSize: '0.75rem',
            fontWeight: 'bold',
            color: 'text.secondary',
            mr: 1
          }}
        >
          Legend:
        </Typography>
        {selectedEducationGroups.map(group => (
          <Box 
            key={group} 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: 0.5,
              px: 1,
              py: 0.5,
              borderRadius: 1,
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}
          >
            <Box 
              sx={{ 
                width: 12, 
                height: 12, 
                borderRadius: '2px',
                bgcolor: getEducationColor(group) 
              }} 
            />
            <Typography 
              variant="caption" 
              sx={{ 
                fontSize: '0.75rem',
                whiteSpace: 'nowrap'
              }}
            >
              {isMobile || isMedium ? 
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
            </Typography>
          </Box>
        ))}
      </Box>
    );
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
      right: chartStyles.margin.right, // Removed extra space for legend
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

    // Create X scale - using a point scale for even spacing
    const xTickValues = isMobile 
      ? [2008, 2012, 2016, 2020, 2023] // 5 values for mobile
      : [2008, 2010, 2012, 2014, 2016, 2018, 2020, 2022, 2023]; // 9 values for desktop
    
    // Use a band scale for equally spaced ticks
    const xBand = d3.scaleBand()
      .domain(xTickValues.map(d => d.toString()))
      .range([0, width])
      .padding(0.1);
    
    // And a regular scale for the actual data points
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
      .call(
        d3.axisBottom(xBand)
          .tickFormat((d: any) => d)
      )
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
        d3.axisBottom(xBand)
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
      .x((d: any) => x(d.year))
      .y((d: any) => y(d.fertility_rate))
      .curve(d3.curveMonotoneX); // Smooth curve

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
        .attr('cx', (d: any) => x(d.year))
        .attr('cy', (d: any) => y(d.fertility_rate))
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
        .attr('cx', (d: any) => x(d.year))
        .attr('cy', (d: any) => y(d.fertility_rate))
        .attr('r', chartStyles.size.tooltipRadius) // Large enough for touch targets
        .attr('fill', 'transparent')
        .style('cursor', 'pointer')
        .on('mouseover', function(this: SVGCircleElement, event: any, d: any) {
          // Handle tooltip display
          const svgElement = chartRef.current?.querySelector('svg');
          const svgRect = svgElement?.getBoundingClientRect();
          
          if (svgRect) {
            // Position relative to the dot in chart coordinates
            const dotX = x(d.year);
            const dotY = y(d.fertility_rate);
            
            // Update tooltip state
            setTooltipData({
              education_group: group.education_group,
              year: d.year,
              fertility_rate: d.fertility_rate,
              total_births: d.total_births,
              total_women: d.total_women,
              x: dotX,
              y: dotY
            });
            setTooltipOpen(true);
          }
          
          // Highlight the dot
          d3.select(this.parentNode)
            .selectAll(`.dot-${sanitizedClassName}`)
            .filter((point: any) => point.year === d.year)
            .attr('r', chartStyles.size.dotRadius * 1.5)
            .attr('stroke', 'white')
            .attr('stroke-width', 2);
        })
        .on('mouseout', function(this: SVGCircleElement) {
          // Hide tooltip
          setTooltipOpen(false);
          
          // Reset dot style
          d3.select(this.parentNode)
            .selectAll(`.dot-${sanitizedClassName}`)
            .attr('r', chartStyles.size.dotRadius)
            .attr('stroke', 'none');
        });
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
      
      {/* Render the legend here before the chart */}
      {renderLegend()}
      
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
      
      {/* Material UI Tooltip */}
      <Tooltip
        open={tooltipOpen}
        title={
          tooltipData ? (
            <Box>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  fontWeight: 'bold',
                  color: '#fff' // Explicitly set white color
                }}
              >
                {tooltipData.education_group}
              </Typography>
              <Typography variant="body2">
                Rate: {tooltipData.fertility_rate.toFixed(1)} per 1,000 women
              </Typography>
              <Typography variant="body2">
                Births: {tooltipData.total_births.toLocaleString()}
              </Typography>
              <Typography variant="body2">
                Women: {tooltipData.total_women.toLocaleString()}
              </Typography>
              <Typography variant="caption">
                Year: {tooltipData.year}
              </Typography>
            </Box>
          ) : ""
        }
        arrow
        placement="top"
        PopperProps={{
          style: { 
            pointerEvents: 'none',
          },
          anchorEl: {
            getBoundingClientRect: () => {
              if (!chartRef.current) {
                return new DOMRect(0, 0, 0, 0);
              }
              
              // Get chart element's position
              const chartRect = chartRef.current.getBoundingClientRect();
              
              // Calculate position relative to chart
              return new DOMRect(
                chartRect.left + (tooltipData?.x || 0),
                chartRect.top + (tooltipData?.y || 0),
                0, 
                0
              );
            }
          },
          container: chartRef.current,
          disablePortal: false, // Allow it to overflow chart box
          modifiers: [
            {
              name: 'preventOverflow',
              options: {
                boundary: 'clippingParents',
                altAxis: true,
                padding: 8,
              },
            }
          ]
        }}
      >
        <Box 
          ref={tooltipRef}
          sx={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: 1, 
            height: 1, 
            pointerEvents: 'none',
            opacity: 0
          }} 
        />
      </Tooltip>
      
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