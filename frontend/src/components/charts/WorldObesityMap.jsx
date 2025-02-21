import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import styles from './WorldObesityMap.module.css';

const WorldObesityMap = () => {
  const svgRef = useRef(null);
  const legendRef = useRef(null);
  const [selectedYear, setSelectedYear] = useState(2020);
  const [selectedGender, setSelectedGender] = useState('TOTAL');
  const [obesityData, setObesityData] = useState(null);
  const [worldData, setWorldData] = useState(null);

  // Load the world map data
  useEffect(() => {
    const loadWorldData = async () => {
      try {
        const response = await fetch('https://unpkg.com/world-atlas@2.0.2/countries-110m.json');
        const data = await response.json();
        const features = feature(data, data.objects.countries);
        console.log('World map data loaded:', features.features[0]); // Log first feature to check structure
        setWorldData(features);
      } catch (error) {
        console.error('Error loading world map data:', error);
      }
    };

    loadWorldData();
  }, []);

  // Load and process the obesity data
  useEffect(() => {
    const loadObesityData = async () => {
      try {
        const response = await fetch('/src/data/processed_who_obesity_data.csv');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();
        const parsedData = d3.csvParse(csvText);
        console.log('First row of CSV data:', parsedData[0]); // Log first row to check structure
        
        // Process the data into a map for easier lookup
        const dataMap = new Map();
        parsedData.forEach(d => {
          if (d.DIM_SEX === selectedGender && d.DIM_TIME === selectedYear.toString()) {
            // Convert the country code to a number since topojson uses numeric IDs
            const countryCode = parseInt(d.DIM_GEO_CODE_M49);
            if (!isNaN(countryCode)) {
              dataMap.set(countryCode, {
                rate: +d.RATE_PER_100_N,
                countryName: d.GEO_NAME_SHORT
              });
            }
          }
        });
        
        console.log('Processed data map size:', dataMap.size); // Log map size
        if (dataMap.size > 0) {
          console.log('Sample data entry:', Array.from(dataMap.entries())[0]); // Log first entry
        } else {
          console.log('No data found for selected year and gender');
        }
        
        setObesityData(dataMap);
      } catch (error) {
        console.error('Error loading obesity data:', error);
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

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

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
        // Convert the feature ID to a number to match with our data
        const countryId = parseInt(d.id);
        const countryData = obesityData.get(countryId);
        console.log('Country ID:', countryId, 'Name:', d.properties.name, 'Data:', countryData); // Log each country's data match
        return countryData ? colorScale(countryData.rate) : '#ccc';
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 0.5)
      .on('mouseover', (event, d) => {
        // Convert the feature ID to a number to match with our data
        const countryId = parseInt(d.id);
        const countryData = obesityData.get(countryId);
        const tooltip = d3.select('body').append('div')
          .attr('class', styles.tooltip)
          .style('position', 'absolute')
          .style('background', 'white')
          .style('padding', '8px')
          .style('border', '1px solid #ccc')
          .style('border-radius', '4px')
          .style('pointer-events', 'none')
          .style('opacity', 0);

        tooltip.transition()
          .duration(200)
          .style('opacity', 0.9);

        tooltip.html(countryData 
          ? `${countryData.countryName}: ${countryData.rate.toFixed(1)}%`
          : `${d.properties.name || 'Unknown'}: No data`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', () => {
        d3.selectAll(`.${styles.tooltip}`).remove();
      });

    // Create legend
    if (legendRef.current) {
      d3.select(legendRef.current).selectAll('*').remove();
      
      const legendWidth = 200;
      const legendHeight = 20;
      
      const legendSvg = d3.select(legendRef.current)
        .attr('width', legendWidth)
        .attr('height', legendHeight);

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

  return (
    <div className={styles['world-obesity-map']}>
      <div className={styles.controls}>
        <div className={styles['year-selector']}>
          <label>Year: {selectedYear}</label>
          <input
            type="range"
            min="1990"
            max="2022"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          />
        </div>
        <div className={styles['gender-selector']}>
          <label>Gender:</label>
          <select value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)}>
            <option value="TOTAL">Total</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>
      </div>
      <div className={styles['map-container']}>
        <svg ref={svgRef}></svg>
      </div>
      <div className={styles.legend}>
        <svg ref={legendRef}></svg>
        <div className={styles['legend-labels']}>
          <span>0%</span>
          <span>20%</span>
          <span>40%</span>
        </div>
      </div>
    </div>
  );
};

export default WorldObesityMap; 