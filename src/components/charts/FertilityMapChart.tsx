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
  Stack
} from '@mui/material';
import { useData } from '@/contexts/DataContext';
import { fetchStateComparison } from '@/utils/api';
import { getChoroplethColor, getChoroplethColorScale, chartStyles, getAccessibleTextColor } from '@/utils/chartHelpers';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

interface StateComparisonData {
  year: number;
  state_code: string;
  state_name: string;
  education_group: string;
  women_count: number;
  births: number;
  fertility_rate: number;
}

interface TooltipData {
  stateName: string;
  stateCode: string;
  educationGroup: string;
  fertilityRate: number;
  x: number;
  y: number;
}

interface FertilityMapChartProps {
  showTitle?: boolean;
  embedded?: boolean;
}

// Utility function to help debug state mappings
function debugStateMappings(states: any[], stateMap: Map<string, StateComparisonData>) {
  const stateMapKeys = Array.from(stateMap.keys());
  console.log(`State map has ${stateMapKeys.length} entries`);
  
  // Known territory codes we're intentionally filtering out
  const knownTerritories = ['60', '66', '69', '72', '78'];
  
  // Check for missing matches that aren't the known territories
  const missingMatches = states
    .filter(state => !stateMap.has(state.id) && !knownTerritories.includes(state.id.toString()))
    .map(state => state.id);
  
  if (missingMatches.length > 0) {
    console.warn(`Unexpected missing matches for ${missingMatches.length} states:`, missingMatches);
  } else {
    console.log('All expected states have matching data');
  }
  
  // Log a sample of state codes for debugging
  console.log('Sample of 5 TopoJSON state IDs:', states.slice(0, 5).map(s => s.id));
  console.log('Sample of 5 data state codes:', stateMapKeys.slice(0, 5));
}

const FertilityMapChart: React.FC<FertilityMapChartProps> = ({ 
  showTitle = true,
  embedded = false 
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<StateComparisonData[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(2023);
  const [selectedEducationGroup, setSelectedEducationGroup] = useState<string>('All');
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const { state } = useData();
  const chartRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Theme and responsive design
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));

  // Available years range (2008-2023)
  const availableYears = Array.from({ length: 2023 - 2008 + 1 }, (_, i) => 2023 - i);
  
  // Available education groups
  const educationGroups = [
    'All',
    'Less than High School',
    'High School Diploma',
    'Some College',
    'Associate\'s Degree',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'Professional/Doctorate Degree'
  ];
  
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      // Reset tooltip state when fetching new data
      setTooltipOpen(false);
      setTooltipData(null);
      
      try {
        const stateComparison = await fetchStateComparison({
          year: selectedYear,
          education: selectedEducationGroup === 'All' ? undefined : selectedEducationGroup
        });
        console.log('API response:', stateComparison);
        setData(stateComparison);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [selectedYear, selectedEducationGroup]);
  
  // Handle year selection change
  const handleYearChange = (event: SelectChangeEvent) => {
    setSelectedYear(Number(event.target.value));
  };
  
  // Handle education group selection change
  const handleEducationGroupChange = (event: SelectChangeEvent) => {
    setSelectedEducationGroup(event.target.value);
  };
  
  // Close tooltip when mouse leaves map area
  const handleMouseLeave = () => {
    setTooltipOpen(false);
  };
  
  // Draw map with D3
  useEffect(() => {
    if (loading || error || !data.length || !chartRef.current) return;

    console.log('Drawing map with data:', data);

    // Reset tooltip state when redrawing map
    setTooltipOpen(false);
    setTooltipData(null);

    // Clear previous chart
    d3.select(chartRef.current).select('svg').remove();

    // Set dimensions
    const chartWidth = chartRef.current.clientWidth;
    const chartHeight = isMobile ? 400 : 700;
    const margin = {
      top: chartStyles.margin.top,
      right: chartStyles.margin.right,
      bottom: chartStyles.margin.bottom + 50,
      left: chartStyles.margin.left
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
      .attr('aria-label', `Choropleth map showing fertility rates by state for ${selectedYear}`)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Fix the type casting for SVG element
    const parentElement = svg.node()?.parentElement;
    svgRef.current = parentElement instanceof SVGSVGElement ? parentElement : null;

    // Define the projection
    const projection = d3.geoAlbersUsa()
      .scale(width)
      .translate([width / 2, height / 2]);

    // Create path generator
    const path = d3.geoPath()
      .projection(projection);

    // Load US states TopoJSON
    d3.json('/data/us-states.json')
      .then((us: any) => {
        if (!us || !us.objects || !us.objects.states) {
          throw new Error('Invalid TopoJSON format: missing objects.states');
        }
        
        console.log('TopoJSON loaded successfully');
        // Extract states feature
        const statesFeature = topojson.feature(us, us.objects.states);
        const states = (statesFeature as any).features;
        console.log('First few states from TopoJSON:', states.slice(0, 3));
        
        // Create a map of state codes to data
        const stateMap = new Map<string, StateComparisonData>();
        data.forEach(d => {
          // Pad state codes with leading zero if needed to match TopoJSON format
          const paddedStateCode = d.state_code.toString().padStart(2, '0');
          stateMap.set(paddedStateCode, d);
        });
        
        // Debug state mappings
        debugStateMappings(states, stateMap);
        
        // Find min and max values for color scaling
        const fertilityValues = data.map(d => d.fertility_rate).filter(v => !isNaN(v) && v !== null);
        const minValue = d3.min(fertilityValues) || 0;
        const maxValue = d3.max(fertilityValues) || 100;
        
        console.log(`Color scale range: ${minValue} to ${maxValue}`);
        
        // Filter out territories that we don't have data for
        const mainlandStates = states.filter(d => {
          const id = d.id.toString();
          return !(id === '60' || id === '66' || id === '69' || id === '72' || id === '78');
        });
        
        // Draw states
        svg.selectAll('.state')
          .data(mainlandStates)
          .enter()
          .append('path')
          .attr('class', 'state')
          .attr('d', path as any)
          .attr('fill', (d: any) => {
            const stateCode = d.id;
            const stateData = stateMap.get(stateCode);
            if (!stateData) {
              console.log(`No data found for state with code: ${stateCode}`);
              return '#ccc'; // Default color for missing data
            }
            
            return getChoroplethColor(
              stateData.fertility_rate,
              minValue,
              maxValue,
              {
                min: theme.palette.choropleth.min,
                max: theme.palette.choropleth.max
              }
            );
          })
          .attr('stroke', theme.palette.background.paper)
          .attr('stroke-width', 0.5)
          .attr('data-state-code', (d: any) => d.id)
          .attr('data-state-name', (d: any) => d.properties.name)
          .on('mouseover', (event: MouseEvent, d: any) => {
            const stateCode = d.id;
            const stateData = stateMap.get(stateCode);
            
            if (stateData) {
              // Get mouse position relative to chart container
              const rect = chartRef.current?.getBoundingClientRect();
              const x = event.clientX - (rect?.left || 0);
              const y = event.clientY - (rect?.top || 0);
              
              setTooltipData({
                stateName: stateData.state_name,
                stateCode: stateData.state_code,
                educationGroup: stateData.education_group,
                fertilityRate: stateData.fertility_rate,
                x,
                y
              });
              setTooltipOpen(true);
            }
          })
          .on('mousemove', (event: MouseEvent) => {
            if (tooltipData) {
              // Get mouse position relative to chart container
              const rect = chartRef.current?.getBoundingClientRect();
              const x = event.clientX - (rect?.left || 0);
              const y = event.clientY - (rect?.top || 0);
              
              setTooltipData({
                ...tooltipData,
                x,
                y
              });
            }
          })
          .on('mouseout', () => {
            setTooltipOpen(false);
          });
        
        // Add legend
        const legendWidth = 200;
        const legendHeight = 20;
        const legendX = width - legendWidth - 20;
        const legendY = height - 40;
        
        const legend = svg.append('g')
          .attr('transform', `translate(${legendX}, ${legendY})`);
        
        // Create gradient legend
        const legendScale = d3.scaleLinear()
          .domain([minValue, maxValue])
          .range([0, legendWidth]);
        
        // Add legend title
        legend.append('text')
          .attr('x', 0)
          .attr('y', -10)
          .attr('text-anchor', 'start')
          .style('font-size', '12px')
          .style('font-family', 'Inter, sans-serif')
          .text('Fertility Rate (births per 1,000 women)');
        
        // Add colored rectangles for each segment of the legend
        const numSegments = 7;
        const segmentWidth = legendWidth / numSegments;
        
        for (let i = 0; i < numSegments; i++) {
          const value = minValue + (i / (numSegments - 1)) * (maxValue - minValue);
          const color = getChoroplethColor(
            value,
            minValue,
            maxValue,
            {
              min: theme.palette.choropleth.min,
              max: theme.palette.choropleth.max
            }
          );
          
          legend.append('rect')
            .attr('x', i * segmentWidth)
            .attr('y', 0)
            .attr('width', segmentWidth)
            .attr('height', legendHeight)
            .attr('fill', color);
        }
        
        // Add legend axis with ticks
        const legendAxis = d3.axisBottom(legendScale)
          .ticks(numSegments)
          .tickFormat(d => d3.format('.0f')(d as number));
        
        legend.append('g')
          .attr('transform', `translate(0, ${legendHeight})`)
          .call(legendAxis);
      })
      .catch(err => {
        console.error('Error loading or processing TopoJSON:', err);
        setError(`Failed to load map data: ${err.message}`);
      });

  }, [loading, error, data, selectedYear, selectedEducationGroup, theme, isMobile]);
  
  // Loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }
  
  // Error state
  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Error loading data: {error}
      </Alert>
    );
  }
  
  // Calculate the container component (Paper or direct content)
  const ChartContent = (
    <>
      {showTitle && (
        <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2 }}>
          Geographic Fertility Rate Patterns
        </Typography>
      )}
      
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={2} 
        sx={{ mb: 2 }}
        alignItems="center"
      >
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="year-select-label">Year</InputLabel>
          <Select
            labelId="year-select-label"
            id="year-select"
            value={selectedYear.toString()}
            label="Year"
            onChange={handleYearChange}
            size="small"
          >
            {availableYears.map(year => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="education-select-label">Education Level</InputLabel>
          <Select
            labelId="education-select-label"
            id="education-select"
            value={selectedEducationGroup}
            label="Education Level"
            onChange={handleEducationGroupChange}
            size="small"
          >
            {educationGroups.map(group => (
              <MenuItem key={group} value={group}>{group}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      
      <Box 
        ref={chartRef} 
        sx={{ 
          width: '100%', 
          height: isMobile ? 400 : 700,
          mb: 4,
          position: 'relative',
          overflow: 'visible'
        }}
        onMouseLeave={handleMouseLeave}
      >
        {tooltipOpen && tooltipData && (
          <Fade in={tooltipOpen}>
            <Box
              sx={{
                position: 'absolute',
                top: tooltipData.y - 30,
                left: tooltipData.x + 10,
                backgroundColor: 'rgba(38, 50, 56, 0.95)',
                color: 'white',
                padding: 1.5,
                borderRadius: 1,
                zIndex: 1500,
                maxWidth: 220,
                pointerEvents: 'none',
                boxShadow: theme.shadows[3],
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5, color: 'white' }}>
                {tooltipData.stateName}
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5, color: 'white' }}>
                {tooltipData.educationGroup || 'All Education Levels'}
              </Typography>
              <Typography variant="body2" sx={{ color: 'white' }}>
                Fertility Rate: <strong>{tooltipData.fertilityRate.toFixed(1)}</strong>
              </Typography>
            </Box>
          </Fade>
        )}
      </Box>
    </>
  );
  
  return embedded ? ChartContent : (
    <Paper 
      elevation={1} 
      sx={{ 
        p: 3, 
        borderRadius: 2,
        mb: 4,
        overflow: 'visible'
      }}
    >
      {ChartContent}
    </Paper>
  );
};

export default FertilityMapChart; 