import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { processFSISRecalls } from '../../utils/dataProcessing';

const RecallTimelineChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/src/data/processed_fsis_recalls.csv');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const csvText = await response.text();
        const rawData = d3.csvParse(csvText);
        
        // Process the data using our utility function
        const processedData = rawData.map(processFSISRecalls);
        
        // Group recalls by year and count
        const recallsByYear = d3.rollup(
          processedData,
          v => v.length,
          d => d.year
        );
        
        // Convert to array and sort by year
        const timelineData = Array.from(recallsByYear, ([year, count]) => ({ year, count }))
          .filter(d => d.year) // Filter out null years
          .sort((a, b) => a.year - b.year);
        
        setData(timelineData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Failed to load recall timeline data. Please try again later.');
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  useEffect(() => {
    if (loading || error || !data.length || !svgRef.current) return;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll('*').remove();

    // Chart dimensions
    const width = 800;
    const height = 500;
    const margin = { top: 40, right: 30, bottom: 60, left: 60 };
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
      .text('FSIS Food Recalls by Year');

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.year), d3.max(data, d => d.year)])
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count) * 1.1]) // Add 10% padding
      .range([innerHeight, 0]);

    // Create line generator
    const line = d3.line()
      .x(d => xScale(d.year))
      .y(d => yScale(d.count))
      .curve(d3.curveMonotoneX);

    // Add axes
    const xAxis = d3.axisBottom(xScale)
      .tickFormat(d3.format('d')) // Format as integer
      .ticks(data.length);

    const yAxis = d3.axisLeft(yScale)
      .ticks(10);

    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)');

    g.append('g')
      .call(yAxis);

    // Add axis labels
    g.append('text')
      .attr('x', innerWidth / 2)
      .attr('y', innerHeight + 50)
      .attr('text-anchor', 'middle')
      .text('Year');

    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -innerHeight / 2)
      .attr('y', -40)
      .attr('text-anchor', 'middle')
      .text('Number of Recalls');

    // Add line path
    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#dc3545')
      .attr('stroke-width', 3)
      .attr('d', line);

    // Add data points
    g.selectAll('.data-point')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'data-point')
      .attr('cx', d => xScale(d.year))
      .attr('cy', d => yScale(d.count))
      .attr('r', 5)
      .attr('fill', '#dc3545')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

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
    g.selectAll('.data-point')
      .on('mouseover', function(event, d) {
        d3.select(this)
          .attr('r', 7)
          .attr('stroke-width', 3);
        
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip.html(`<strong>${d.year}</strong><br/>${d.count} recalls`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', function() {
        d3.select(this)
          .attr('r', 5)
          .attr('stroke-width', 2);
        
        tooltip.transition().duration(500).style('opacity', 0);
      });

    // Add trend line
    if (data.length > 2) {
      // Simple linear regression
      const xMean = d3.mean(data, d => d.year);
      const yMean = d3.mean(data, d => d.count);
      
      const ssxy = d3.sum(data, d => (d.year - xMean) * (d.count - yMean));
      const ssxx = d3.sum(data, d => Math.pow(d.year - xMean, 2));
      
      const slope = ssxy / ssxx;
      const intercept = yMean - slope * xMean;
      
      const x1 = d3.min(data, d => d.year);
      const x2 = d3.max(data, d => d.year);
      const y1 = slope * x1 + intercept;
      const y2 = slope * x2 + intercept;
      
      g.append('line')
        .attr('x1', xScale(x1))
        .attr('y1', yScale(y1))
        .attr('x2', xScale(x2))
        .attr('y2', yScale(y2))
        .attr('stroke', '#0d6efd')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5');
    }

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

export default RecallTimelineChart; 