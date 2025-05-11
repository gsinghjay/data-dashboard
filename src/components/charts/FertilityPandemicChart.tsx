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
  Stack,
  Tooltip,
  useTheme,
  useMediaQuery,
  ToggleButtonGroup,
  ToggleButton,
  Fade
} from '@mui/material';
import { useData } from '@/contexts/DataContext';
import { fetchNationalTrends } from '@/utils/api';
import { getEducationColor, getOrderedEducationGroups, chartStyles } from '@/utils/chartHelpers';
import * as d3 from 'd3';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import useSuppressRefWarnings from '@/hooks/useSuppressRefWarnings';

interface NationalTrendData {
  year: number;
  education_group: string;
  total_women: number;
  total_births: number;
  fertility_rate: number;
}

interface FertilityPandemicChartProps {
  showTitle?: boolean;
  embedded?: boolean;
}

// Interface for tooltip data
interface TooltipData {
  education_group: string;
  year: number;
  fertility_rate: number;
  comparison_year: number;
  comparison_rate: number;
  percent_change: number;
  absolute_change: number;
  x: number;
  y: number;
}

// Years relevant to pandemic comparison
const PRE_PANDEMIC_YEAR = 2019;
const PANDEMIC_YEARS = [2020, 2021, 2022];
const DEFAULT_PANDEMIC_YEAR = 2020;

// All education groups in correct display order
const EDUCATION_GROUPS = getOrderedEducationGroups();

const FertilityPandemicChart: React.FC<FertilityPandemicChartProps> = ({ 
  showTitle = true, 
  embedded = false 
}) => {
  // Add this to suppress React 19 warnings with D3
  useSuppressRefWarnings();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<NationalTrendData[]>([]);
  const [selectedPandemicYear, setSelectedPandemicYear] = useState<number>(DEFAULT_PANDEMIC_YEAR);
  const [comparisonMode, setComparisonMode] = useState<'absolute' | 'percentage'>('absolute');
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  
  const { state } = useData();
  const chartRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  // Theme and responsive design
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));

  // Years needed for our comparison (pre-pandemic and selected pandemic year)
  const yearsNeeded = [PRE_PANDEMIC_YEAR, selectedPandemicYear];
  
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        // Fetch data for pre-pandemic and pandemic years
        const trends = await fetchNationalTrends({ 
          year: yearsNeeded,
          education: EDUCATION_GROUPS
        });
        setData(trends);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [selectedPandemicYear]);

  const handleComparisonModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: 'absolute' | 'percentage',
  ) => {
    if (newMode !== null) {
      setComparisonMode(newMode);
    }
  };

  const handlePandemicYearChange = (event: SelectChangeEvent) => {
    setSelectedPandemicYear(Number(event.target.value));
  };

  // Prepare data for chart rendering
  const prepareChartData = () => {
    if (!data || data.length === 0) return [];
    
    // Group data by education_group and year
    const groupedData = d3.group(data, d => d.education_group, d => d.year);
    
    // Construct comparison data
    const chartData = Array.from(groupedData).map(([educationGroup, yearMap]) => {
      const prePandemicData = yearMap.get(PRE_PANDEMIC_YEAR)?.[0];
      const pandemicData = yearMap.get(selectedPandemicYear)?.[0];
      
      if (!prePandemicData || !pandemicData) return null;
      
      const absoluteChange = pandemicData.fertility_rate - prePandemicData.fertility_rate;
      const percentChange = ((pandemicData.fertility_rate / prePandemicData.fertility_rate) - 1) * 100;
      
      return {
        education_group: educationGroup,
        pre_pandemic_rate: prePandemicData.fertility_rate,
        pandemic_rate: pandemicData.fertility_rate,
        absolute_change: absoluteChange,
        percent_change: percentChange,
        pre_pandemic_data: prePandemicData,
        pandemic_data: pandemicData
      };
    }).filter(Boolean) as any[];
    
    // Sort by education order
    chartData.sort((a, b) => {
      return EDUCATION_GROUPS.indexOf(a.education_group) - EDUCATION_GROUPS.indexOf(b.education_group);
    });
    
    return chartData;
  };

  // Draw the chart using D3
  useEffect(() => {
    if (loading || error || !chartRef.current) return;
    
    const chartData = prepareChartData();
    if (chartData.length === 0) return;
    
    // Clear previous chart
    d3.select(chartRef.current).select('svg').remove();
    
    // Define chart dimensions
    const margin = { top: 30, right: 30, bottom: 70, left: isMobile ? 40 : 60 };
    const width = chartRef.current.clientWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    
    // Create SVG
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    svgRef.current = svg.node()?.parentElement as SVGSVGElement;
    
    // Define x and y scales
    const x = d3.scaleBand()
      .domain(chartData.map(d => d.education_group))
      .range([0, width])
      .padding(0.4);
    
    // Determine y scale based on comparison mode
    const yDomain = comparisonMode === 'absolute' 
      ? d3.extent(chartData, d => d.absolute_change) as [number, number]
      : d3.extent(chartData, d => d.percent_change) as [number, number];
    
    // Ensure the y domain includes zero
    if (yDomain[0] > 0) yDomain[0] = 0;
    if (yDomain[1] < 0) yDomain[1] = 0;
    
    // Add some padding to the domain
    const yPadding = (yDomain[1] - yDomain[0]) * 0.1;
    yDomain[0] -= yPadding;
    yDomain[1] += yPadding;
    
    const y = d3.scaleLinear()
      .domain(yDomain)
      .range([height, 0]);
    
    // Add X axis
    svg.append('g')
      .attr('transform', `translate(0,${y(0)})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-25)')
      .style('text-anchor', 'end')
      .style('font-size', '10px');
    
    // Add Y axis
    svg.append('g')
      .call(d3.axisLeft(y)
        .ticks(5)
        .tickFormat(d => comparisonMode === 'percentage' ? `${d}%` : d.toString()))
      .selectAll('text')
      .style('font-size', '10px');
    
    // Add X axis label
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom - 5)
      .style('font-size', '12px')
      .text('Education Level');
    
    // Add Y axis label
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('transform', `translate(${-margin.left + 15},${height / 2})rotate(-90)`)
      .style('font-size', '12px')
      .text(comparisonMode === 'percentage' ? 'Percentage Change (%)' : 'Absolute Change (births per 1,000)');
    
    // Add zero line
    svg.append('line')
      .attr('x1', 0)
      .attr('y1', y(0))
      .attr('x2', width)
      .attr('y2', y(0))
      .style('stroke', theme.palette.divider)
      .style('stroke-width', 1)
      .style('stroke-dasharray', '3,3');
    
    // Add bars
    svg.selectAll('.bar')
      .data(chartData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.education_group) as number + x.bandwidth() / 4)
      .attr('width', x.bandwidth() / 2)
      .attr('y', d => {
        const value = comparisonMode === 'absolute' ? d.absolute_change : d.percent_change;
        return value >= 0 ? y(value) : y(0);
      })
      .attr('height', d => {
        const value = comparisonMode === 'absolute' ? d.absolute_change : d.percent_change;
        return Math.abs(y(0) - y(value));
      })
      .attr('fill', d => {
        const value = comparisonMode === 'absolute' ? d.absolute_change : d.percent_change;
        // Use color based on whether the change is positive or negative
        return value >= 0 
          ? d3.color(getEducationColor(d.education_group))?.brighter(0.2).toString() as string
          : d3.color(getEducationColor(d.education_group))?.darker(0.2).toString() as string;
      })
      .style('stroke', d => getEducationColor(d.education_group))
      .style('stroke-width', 1)
      .style('opacity', 0.8)
      .on('mouseover', function(event, d) {
        // Show tooltip
        const value = comparisonMode === 'absolute' ? d.absolute_change : d.percent_change;
        const [mouseX, mouseY] = d3.pointer(event);
        
        // Change bar appearance on hover
        d3.select(this)
          .style('opacity', 1)
          .style('stroke-width', 2);
        
        setTooltipData({
          education_group: d.education_group,
          year: selectedPandemicYear,
          fertility_rate: d.pandemic_rate,
          comparison_year: PRE_PANDEMIC_YEAR,
          comparison_rate: d.pre_pandemic_rate,
          percent_change: d.percent_change,
          absolute_change: d.absolute_change,
          x: mouseX + margin.left,
          y: mouseY + margin.top
        });
        setTooltipOpen(true);
      })
      .on('mousemove', function(event) {
        if (!tooltipData) return;
        
        const [mouseX, mouseY] = d3.pointer(event);
        setTooltipData(prev => prev ? {
          ...prev,
          x: mouseX + margin.left,
          y: mouseY + margin.top
        } : null);
      })
      .on('mouseleave', function() {
        // Hide tooltip
        d3.select(this)
          .style('opacity', 0.8)
          .style('stroke-width', 1);
        
        setTooltipOpen(false);
        setTooltipData(null);
      });
    
    // Add labels to bars
    svg.selectAll('.bar-label')
      .data(chartData)
      .enter()
      .append('text')
      .attr('class', 'bar-label')
      .attr('x', d => (x(d.education_group) as number) + x.bandwidth() / 2)
      .attr('y', d => {
        const value = comparisonMode === 'absolute' ? d.absolute_change : d.percent_change;
        // Position labels above or below bars depending on whether they're positive or negative
        return value >= 0 
          ? y(value) - 5 
          : y(value) + 15;
      })
      .attr('text-anchor', 'middle')
      .style('font-size', '9px')
      .style('fill', d => {
        const value = comparisonMode === 'absolute' ? d.absolute_change : d.percent_change;
        return value >= 0 ? theme.palette.text.primary : theme.palette.text.primary;
      })
      .text(d => {
        const value = comparisonMode === 'absolute' ? d.absolute_change : d.percent_change;
        return comparisonMode === 'percentage' 
          ? `${value.toFixed(1)}%` 
          : value.toFixed(1);
      });
    
    // Add title
    if (showTitle) {
      svg.append('text')
        .attr('x', width / 2)
        .attr('y', -margin.top / 2)
        .attr('text-anchor', 'middle')
        .style('font-size', '14px')
        .style('font-weight', 'bold')
        .text(`Pandemic Impact on Fertility Rates (${PRE_PANDEMIC_YEAR} vs. ${selectedPandemicYear})`);
    }
    
    // Add subtitle
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -margin.top / 2 + (showTitle ? 20 : 0))
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', theme.palette.text.secondary)
      .text(comparisonMode === 'absolute' 
        ? 'Change in births per 1,000 women' 
        : 'Percentage change in fertility rates');
    
    // Highlight any interesting insights
    // Find the education group with the largest absolute change
    const largestChangeGroup = [...chartData].sort((a, b) => {
      return Math.abs(b.absolute_change) - Math.abs(a.absolute_change);
    })[0];
    
    if (largestChangeGroup) {
      svg.append('circle')
        .attr('cx', (x(largestChangeGroup.education_group) as number) + x.bandwidth() / 2)
        .attr('cy', comparisonMode === 'absolute' 
          ? y(largestChangeGroup.absolute_change) 
          : y(largestChangeGroup.percent_change))
        .attr('r', 5)
        .attr('fill', 'none')
        .attr('stroke', theme.palette.warning.main)
        .attr('stroke-width', 2)
        .style('stroke-dasharray', '3,2');
    }
    
  }, [loading, error, data, comparisonMode, selectedPandemicYear, theme, isMobile]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      // Redraw chart on window resize
      if (!loading && !error && chartRef.current) {
        const chartData = prepareChartData();
        if (chartData.length > 0) {
          d3.select(chartRef.current).select('svg').remove();
          // Trigger redraw by setting a value in state
          setSelectedPandemicYear(prev => prev);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [loading, error, data]);

  // Render chart controls
  const renderControls = () => {
    return (
      <Stack 
        direction={isMobile ? 'column' : 'row'} 
        spacing={2} 
        sx={{ 
          mb: 2, 
          mt: 1,
          justifyContent: 'center',
          alignItems: 'center' 
        }}
      >
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="pandemic-year-select-label">Pandemic Year</InputLabel>
          <Select
            labelId="pandemic-year-select-label"
            id="pandemic-year-select"
            value={selectedPandemicYear.toString()}
            label="Pandemic Year"
            onChange={handlePandemicYearChange}
          >
            {PANDEMIC_YEARS.map(year => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <ToggleButtonGroup
          size="small"
          value={comparisonMode}
          exclusive
          onChange={handleComparisonModeChange}
          aria-label="comparison mode"
        >
          <ToggleButton value="absolute" aria-label="absolute change">
            Absolute
          </ToggleButton>
          <ToggleButton value="percentage" aria-label="percentage change">
            Percentage
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    );
  };

  // Render tooltip
  const renderTooltip = () => {
    if (!tooltipData) return null;

    // Position tooltip
    const chartWidth = chartRef.current?.clientWidth || 0;
    let left = tooltipData.x;
    // Prevent tooltip from going off the right edge
    if (left > chartWidth - 200) left = chartWidth - 200;
    
    return (
      <Fade in={tooltipOpen}>
        <Box
          ref={tooltipRef}
          sx={{
            position: 'absolute',
            left: `${left}px`,
            top: `${tooltipData.y}px`,
            bgcolor: 'background.paper',
            boxShadow: 3,
            borderRadius: 1,
            p: 1.5,
            zIndex: 1000,
            minWidth: 180,
            maxWidth: 240,
            pointerEvents: 'none',
            border: `1px solid ${theme.palette.divider}`
          }}
        >
          <Typography variant="subtitle2" gutterBottom sx={{ 
            pb: 0.5, 
            borderBottom: `1px solid ${theme.palette.divider}`,
            color: getEducationColor(tooltipData.education_group)
          }}>
            {tooltipData.education_group}
          </Typography>
          
          <Stack spacing={0.5} sx={{ mt: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {tooltipData.comparison_year}:
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 500 }}>
                {tooltipData.comparison_rate.toFixed(2)} per 1,000
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {tooltipData.year}:
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 500 }}>
                {tooltipData.fertility_rate.toFixed(2)} per 1,000
              </Typography>
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              mt: 0.5,
              pt: 0.5,
              borderTop: `1px dashed ${theme.palette.divider}`
            }}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                <CompareArrowsIcon sx={{ fontSize: 12, mr: 0.5, verticalAlign: 'middle' }} />
                Change:
              </Typography>
              <Typography variant="caption" sx={{ 
                fontWeight: 700,
                color: tooltipData.absolute_change >= 0 ? 'success.main' : 'error.main'
              }}>
                {tooltipData.absolute_change >= 0 ? '+' : ''}
                {tooltipData.absolute_change.toFixed(2)} ({tooltipData.percent_change >= 0 ? '+' : ''}
                {tooltipData.percent_change.toFixed(1)}%)
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Fade>
    );
  };

  // Common content to be used in both embedded and standalone modes
  const chartContent = (
    <>
      {showTitle && (
        <Typography 
          variant="h6" 
          component="h2" 
          gutterBottom 
          align="center"
          sx={{ mb: 1 }}
        >
          Pandemic Impact on Fertility Rates
        </Typography>
      )}
      
      {renderControls()}
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : (
        <Box sx={{ position: 'relative', width: '100%', height: 400 }}>
          <Box ref={chartRef} sx={{ width: '100%', height: '100%' }} />
          {renderTooltip()}
        </Box>
      )}
      
      <Typography 
        variant="body2" 
        color="text.secondary" 
        align="center" 
        sx={{ mt: 2, fontSize: '0.75rem' }}
      >
        Comparing pre-pandemic year {PRE_PANDEMIC_YEAR} to pandemic years. Values show changes in fertility rates (births per 1,000 women).
      </Typography>
    </>
  );

  // Return appropriate wrapping depending on embedded mode
  return embedded ? (
    chartContent
  ) : (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 3, 
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {chartContent}
    </Paper>
  );
};

export default FertilityPandemicChart; 