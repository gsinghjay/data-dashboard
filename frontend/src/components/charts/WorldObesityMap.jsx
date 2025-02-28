import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import styles from './WorldObesityMap.module.css';
import { processWHOObesity } from '../../utils/dataProcessing';

const WorldObesityMap = () => {
  const svgRef = useRef(null);
  const legendRef = useRef(null);
  const [selectedYear, setSelectedYear] = useState(2020);
  const [selectedGender, setSelectedGender] = useState('TOTAL');
  const [obesityData, setObesityData] = useState(null);
  const [worldData, setWorldData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load the world map data
  useEffect(() => {
    const loadWorldData = async () => {
      try {
        const response = await fetch('https://unpkg.com/world-atlas@2.0.2/countries-110m.json');
        const data = await response.json();
        const features = feature(data, data.objects.countries);
        setWorldData(features);
      } catch (error) {
        console.error('Error loading world map data:', error);
        setError('Failed to load world map data. Please try again later.');
      }
    };

    loadWorldData();
  }, []);

  // Load and process the obesity data
  useEffect(() => {
    const loadObesityData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/src/data/processed_who_obesity_data.csv');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();
        const rawData = d3.csvParse(csvText);
        
        // Process the data using our utility function
        const processedData = rawData.map(processWHOObesity);
        
        // Process the data into a map for easier lookup
        const dataMap = new Map();
        processedData.forEach(d => {
          if (d.DIM_SEX === selectedGender && d.year.getFullYear() === selectedYear) {
            // Convert the country code to a number since topojson uses numeric IDs
            const countryCode = parseInt(d.DIM_GEO_CODE_M49);
            if (!isNaN(countryCode)) {
              dataMap.set(countryCode, {
                rate: d.obesity_rate,
                countryName: d.GEO_NAME_SHORT,
                confidenceLower: d.confidence_lower,
                confidenceUpper: d.confidence_upper
              });
            }
          }
        });
        
        setObesityData(dataMap);
        setLoading(false);
      } catch (error) {
        console.error('Error loading obesity data:', error);
        setError('Failed to load obesity data. Please try again later.');
        setLoading(false);
      }
    };

    loadObesityData();
  }, [selectedYear, selectedGender]);

  // Create and update the visualization
  useEffect(() => {
    if (!worldData || !obesityData || !svgRef.current) return;

    const width = 960;
    const height = 500;
    
    // Clear existing SVG content
    d3.select(svgRef.current).selectAll('*').remove();

    // Create SVG with responsive container
    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .attr('class', 'rounded-0');

    // Define map projection
    const projection = d3.geoMercator()
      .fitSize([width, height], worldData);

    // Create path generator
    const path = d3.geoPath().projection(projection);

    // Create color scale
    const colorScale = d3.scaleSequential()
      .domain([0, 40]) // Obesity rates typically range from 0-40%
      .interpolator(d3.interpolateYlOrRd);

    // Draw map
    svg.selectAll('path')
      .data(worldData.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('class', styles.country)
      .attr('fill', d => {
        const countryId = parseInt(d.id);
        const countryData = obesityData.get(countryId);
        return countryData ? colorScale(countryData.rate) : '#e9ecef';
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 0.5)
      .on('mouseover', (event, d) => {
        const countryId = parseInt(d.id);
        const countryData = obesityData.get(countryId);
        const tooltip = d3.select('body').append('div')
          .attr('class', 'tooltip bg-dark text-light p-2 rounded-0')
          .style('position', 'absolute')
          .style('opacity', 0)
          .style('z-index', 1000);

        tooltip.transition()
          .duration(200)
          .style('opacity', 0.9);

        tooltip.html(countryData 
          ? `<div class="small">
               <strong>${countryData.countryName}</strong><br/>
               Obesity Rate: ${countryData.rate.toFixed(1)}%<br/>
               95% CI: [${countryData.confidenceLower.toFixed(1)}, ${countryData.confidenceUpper.toFixed(1)}]
             </div>`
          : `<div class="small">
               <strong>${d.properties.name || 'Unknown'}</strong><br/>
               No data available
             </div>`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', () => {
        d3.selectAll('.tooltip').remove();
      });

    // Create legend
    if (legendRef.current) {
      d3.select(legendRef.current).selectAll('*').remove();
      
      const legendWidth = 200;
      const legendHeight = 20;
      
      const legendSvg = d3.select(legendRef.current)
        .attr('viewBox', `0 0 ${legendWidth} ${legendHeight}`)
        .attr('preserveAspectRatio', 'xMidYMid meet')
        .attr('class', 'rounded-0');

      // Create gradient
      const gradient = legendSvg.append('defs')
        .append('linearGradient')
        .attr('id', 'legend-gradient')
        .attr('x1', '0%')
        .attr('x2', '100%')
        .attr('y1', '0%')
        .attr('y2', '0%');

      // Add color stops
      const colorStops = d3.range(0, 41, 1);
      colorStops.forEach(stop => {
        gradient.append('stop')
          .attr('offset', `${(stop/40) * 100}%`)
          .attr('stop-color', colorScale(stop));
      });

      // Draw legend rectangle
      legendSvg.append('rect')
        .attr('width', legendWidth)
        .attr('height', legendHeight)
        .style('fill', 'url(#legend-gradient)');
    }

  }, [worldData, obesityData]);

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
    <div className="d-flex flex-column h-100">
      <div className="controls bg-light rounded-0 p-3 mb-3 d-flex gap-4 align-items-center">
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-calendar-event"></i>
          <label className="form-label mb-0">Year: {selectedYear}</label>
          <input
            type="range"
            className="form-range ms-2"
            style={{ width: '200px' }}
            min="1990"
            max="2022"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          />
        </div>
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-people"></i>
          <label className="form-label mb-0">Gender:</label>
          <select 
            className="form-select form-select-sm rounded-0" 
            style={{ width: '100px' }}
            value={selectedGender} 
            onChange={(e) => setSelectedGender(e.target.value)}
          >
            <option value="TOTAL">Total</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>
      </div>
      <div className="flex-grow-1 position-relative">
        <div className="map-container h-100">
          <svg 
            ref={svgRef}
            style={{ width: '100%', height: '100%', minHeight: '400px' }}
            className="rounded-0"
          />
        </div>
      </div>
      <div className="legend mt-3 d-flex flex-column align-items-center">
        <svg 
          ref={legendRef}
          style={{ width: '200px', height: '20px' }}
          className="rounded-0"
        />
        <div className="d-flex justify-content-between w-100 mt-1 text-muted small">
          <span>0%</span>
          <span>20%</span>
          <span>40%</span>
        </div>
      </div>
    </div>
  );
};

export default WorldObesityMap; 