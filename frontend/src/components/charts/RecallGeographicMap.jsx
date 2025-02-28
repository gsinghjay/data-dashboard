import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import { processFSISRecalls } from '../../utils/dataProcessing';

const RecallGeographicMap = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load US states TopoJSON
        const usTopoJson = await fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json')
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          });
        
        // Load FSIS recalls data
        const recallsResponse = await fetch('/src/data/processed_fsis_recalls.csv');
        if (!recallsResponse.ok) {
          throw new Error(`HTTP error! status: ${recallsResponse.status}`);
        }
        
        const csvText = await recallsResponse.text();
        const rawData = d3.csvParse(csvText);
        
        // Process the data using our utility function
        const processedData = rawData.map(processFSISRecalls);
        
        // Convert TopoJSON to GeoJSON
        const usStates = feature(usTopoJson, usTopoJson.objects.states);
        
        // Create a lookup for state names by FIPS code
        const stateNames = new Map(usTopoJson.objects.states.geometries.map(d => [d.id, d.properties.name]));
        
        // Create a lookup for state abbreviations
        const stateAbbreviations = {
          'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA',
          'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA',
          'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA',
          'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
          'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO',
          'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ',
          'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH',
          'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
          'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT',
          'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY',
          'District of Columbia': 'DC'
        };
        
        // Create reverse lookup (abbreviation to name)
        const stateNamesByAbbr = Object.entries(stateAbbreviations).reduce((acc, [name, abbr]) => {
          acc[abbr] = name;
          return acc;
        }, {});
        
        // Count recalls by state
        const recallsByState = {};
        
        // Initialize all states with 0 recalls
        Object.values(stateAbbreviations).forEach(abbr => {
          recallsByState[abbr] = 0;
        });
        
        // Count recalls for each state
        processedData.forEach(recall => {
          if (recall.states && recall.states.length) {
            recall.states.forEach(stateAbbr => {
              if (recallsByState[stateAbbr] !== undefined) {
                recallsByState[stateAbbr]++;
              }
            });
          }
        });
        
        // Combine GeoJSON with recall counts
        const statesWithData = usStates.features.map(feature => {
          const stateName = stateNames.get(feature.id);
          const stateAbbr = stateAbbreviations[stateName];
          return {
            ...feature,
            properties: {
              ...feature.properties,
              name: stateName,
              abbr: stateAbbr,
              recallCount: recallsByState[stateAbbr] || 0
            }
          };
        });
        
        setData({
          states: statesWithData,
          recallsByState,
          stateNamesByAbbr
        });
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Failed to load recall geographic data. Please try again later.');
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  useEffect(() => {
    if (loading || error || !data.states || !svgRef.current) return;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll('*').remove();

    // Chart dimensions
    const width = 960;
    const height = 600;
    const margin = { top: 40, right: 20, bottom: 20, left: 20 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create SVG with responsive container
    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .attr('class', 'rounded-0');

    // Create container group
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 25)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text('FSIS Food Recalls by State');

    // Create color scale
    const colorScale = d3.scaleSequential(d3.interpolateYlOrRd)
      .domain([0, d3.max(data.states, d => d.properties.recallCount)]);

    // Create projection
    const projection = d3.geoAlbersUsa()
      .fitSize([innerWidth, innerHeight], { type: 'FeatureCollection', features: data.states });

    // Create path generator
    const path = d3.geoPath()
      .projection(projection);

    // Add states
    g.selectAll('.state')
      .data(data.states)
      .enter()
      .append('path')
      .attr('class', 'state')
      .attr('d', path)
      .attr('fill', d => d.properties.recallCount === 0 ? '#e9ecef' : colorScale(d.properties.recallCount))
      .attr('stroke', '#fff')
      .attr('stroke-width', 0.5)
      .style('opacity', 0.8)
      .on('mouseover', function(event, d) {
        d3.select(this)
          .style('opacity', 1)
          .attr('stroke-width', 1.5);
      })
      .on('mouseout', function() {
        d3.select(this)
          .style('opacity', 0.8)
          .attr('stroke-width', 0.5);
      });

    // Add state labels
    g.selectAll('.state-label')
      .data(data.states)
      .enter()
      .append('text')
      .attr('class', 'state-label')
      .attr('transform', d => `translate(${path.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .style('font-size', '10px')
      .style('font-weight', 'bold')
      .style('pointer-events', 'none')
      .style('fill', d => d.properties.recallCount > d3.max(data.states, s => s.properties.recallCount) * 0.7 ? '#fff' : '#000')
      .text(d => d.properties.abbr);

    // Add legend
    const legendWidth = 200;
    const legendHeight = 20;
    const legendX = width - margin.right - legendWidth;
    const legendY = height - margin.bottom - 40;

    // Create gradient for legend
    const defs = svg.append('defs');
    const linearGradient = defs.append('linearGradient')
      .attr('id', 'recall-color-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%');

    // Add color stops
    const colorDomain = colorScale.domain();
    const steps = 10;
    for (let i = 0; i <= steps; i++) {
      const value = colorDomain[0] + (i / steps) * (colorDomain[1] - colorDomain[0]);
      linearGradient.append('stop')
        .attr('offset', `${i * 100 / steps}%`)
        .attr('stop-color', colorScale(value));
    }

    // Add legend rectangle
    svg.append('rect')
      .attr('x', legendX)
      .attr('y', legendY)
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .style('fill', 'url(#recall-color-gradient)');

    // Add legend labels
    svg.append('text')
      .attr('x', legendX)
      .attr('y', legendY - 5)
      .style('font-size', '10px')
      .text('0');

    svg.append('text')
      .attr('x', legendX + legendWidth)
      .attr('y', legendY - 5)
      .attr('text-anchor', 'end')
      .style('font-size', '10px')
      .text(Math.round(colorDomain[1]));

    svg.append('text')
      .attr('x', legendX + legendWidth / 2)
      .attr('y', legendY - 5)
      .attr('text-anchor', 'middle')
      .style('font-size', '10px')
      .text('Number of Recalls');

    // Add tooltips
    const tooltip = d3.select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('background', 'rgba(0, 0, 0, 0.7)')
      .style('color', 'white')
      .style('padding', '8px')
      .style('border-radius', '0')
      .style('pointer-events', 'none')
      .style('opacity', 0);

    // Add tooltip interactions
    g.selectAll('.state')
      .on('mouseover', function(event, d) {
        d3.select(this)
          .style('opacity', 1)
          .attr('stroke-width', 1.5);
        
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip.html(`<strong>${d.properties.name}</strong><br/>${d.properties.recallCount} recalls`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', function() {
        d3.select(this)
          .style('opacity', 0.8)
          .attr('stroke-width', 0.5);
        
        tooltip.transition().duration(500).style('opacity', 0);
      });

    // Clean up tooltip on unmount
    return () => {
      d3.select('body').selectAll('.tooltip').remove();
    };
  }, [data, loading, error]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="spinner-border text-primary rounded-0" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger rounded-0 m-3 d-flex align-items-center" role="alert">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        {error}
      </div>
    );
  }

  return (
    <div className="chart-container w-100 h-100 d-flex justify-content-center align-items-center">
      <svg 
        ref={svgRef}
        style={{ width: '100%', height: '100%', minHeight: '400px' }}
        className="rounded-0"
      />
    </div>
  );
};

export default RecallGeographicMap; 