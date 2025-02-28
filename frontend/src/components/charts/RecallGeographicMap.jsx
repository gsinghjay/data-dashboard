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
        const totalRecalls = processedData.length;
        
        // Initialize all states with 0 recalls
        Object.values(stateAbbreviations).forEach(abbr => {
          recallsByState[abbr] = 0;
        });
        
        // Count recalls for each state
        processedData.forEach(recall => {
          if (recall.states && recall.states.length) {
            // Check if it's a nationwide recall by comparing length to total states
            const isNationwide = recall.states.length === Object.values(stateAbbreviations).length;
            
            recall.states.forEach(stateAbbr => {
              if (recallsByState[stateAbbr] !== undefined) {
                // For nationwide recalls, count as a fraction to avoid inflating numbers
                recallsByState[stateAbbr] += isNationwide ? (1 / recall.states.length) : 1;
              }
            });
          }
        });

        // Round the recall counts to nearest whole number and calculate statistics
        let maxRecalls = 0;
        let totalStateRecalls = 0;
        
        Object.keys(recallsByState).forEach(state => {
          recallsByState[state] = Math.round(recallsByState[state]);
          maxRecalls = Math.max(maxRecalls, recallsByState[state]);
          totalStateRecalls += recallsByState[state];
        });

        // Log statistics for debugging
        console.log('Recall Statistics:', {
          totalRecalls,
          totalStateRecalls,
          maxRecalls,
          averageRecallsPerState: totalStateRecalls / Object.keys(recallsByState).length
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

        console.log('States with data:', statesWithData.map(s => ({
          name: s.properties.name,
          abbr: s.properties.abbr,
          count: s.properties.recallCount
        })));
        
        setData({
          states: statesWithData,
          recallsByState,
          stateNamesByAbbr,
          maxRecalls
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

    // Create tooltip
    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('background-color', 'white')
      .style('padding', '8px')
      .style('border', '1px solid #ddd')
      .style('border-radius', '0')
      .style('pointer-events', 'none')
      .style('opacity', 0);

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

    // Create color scale with better domain
    const colorScale = d3.scaleSequential(d3.interpolateYlOrRd)
      .domain([0, data.maxRecalls || 1]); // Use maxRecalls from data, fallback to 1 if undefined

    // Create projection with adjusted size
    const projection = d3.geoAlbersUsa()
      .fitSize([innerWidth, innerHeight], { type: 'FeatureCollection', features: data.states });

    // Create path generator
    const path = d3.geoPath()
      .projection(projection);

    // Add states with improved styling
    g.selectAll('.state')
      .data(data.states)
      .enter()
      .append('path')
      .attr('class', 'state')
      .attr('d', d => {
        const pathData = path(d);
        return pathData || 'M0,0';
      })
      .attr('fill', d => {
        const pathData = path(d);
        if (!pathData) return 'none';
        const count = d.properties.recallCount;
        return count === 0 ? '#e9ecef' : colorScale(count);
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 0.5)
      .style('opacity', 0.8)
      .on('mouseover', function(event, d) {
        d3.select(this)
          .style('opacity', 1)
          .attr('stroke-width', 1.5);
          
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip.html(`
          <strong>${d.properties.name}</strong><br/>
          Recalls: ${d.properties.recallCount.toLocaleString()}
        `)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', function() {
        d3.select(this)
          .style('opacity', 0.8)
          .attr('stroke-width', 0.5);
          
        tooltip.transition().duration(500).style('opacity', 0);
      });

    // Add state labels with improved visibility
    g.selectAll('.state-label')
      .data(data.states)
      .enter()
      .append('text')
      .attr('class', 'state-label')
      .attr('transform', d => {
        const centroid = path.centroid(d);
        return isNaN(centroid[0]) || isNaN(centroid[1]) ? 
          null : `translate(${centroid[0]},${centroid[1]})`;
      })
      .attr('text-anchor', 'middle')
      .style('font-size', '10px')
      .style('font-weight', 'bold')
      .style('pointer-events', 'none')
      .style('fill', d => {
        const count = d.properties.recallCount;
        const maxCount = data.maxRecalls || 1;
        return count > maxCount * 0.5 ? '#fff' : '#000';
      })
      .text(d => d.properties.abbr)
      .filter(d => {
        const centroid = path.centroid(d);
        return !isNaN(centroid[0]) && !isNaN(centroid[1]);
      });

    // Add legend with improved formatting
    const legendWidth = 200;
    const legendHeight = 20;
    const legendX = width - margin.right - legendWidth - 20;
    const legendY = height - margin.bottom - 40;

    // Create gradient for legend
    const defs = svg.append('defs');
    const linearGradient = defs.append('linearGradient')
      .attr('id', 'recall-color-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%');

    // Add color stops with better distribution
    const steps = 10;
    for (let i = 0; i <= steps; i++) {
      const value = (i / steps) * (data.maxRecalls || 1);
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

    // Add legend labels with better formatting
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
      .text(data.maxRecalls ? data.maxRecalls.toLocaleString() : '0');

    svg.append('text')
      .attr('x', legendX + legendWidth / 2)
      .attr('y', legendY - 5)
      .attr('text-anchor', 'middle')
      .style('font-size', '10px')
      .text('Number of Recalls');

    // Clean up tooltip when component unmounts
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