import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const RecallDurationChart = () => {
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
        
        // Process the data
        const processedData = rawData
          .map(row => {
            const recallDate = row.recall_date ? new Date(row.recall_date) : null;
            const closedDate = row.closed_date ? new Date(row.closed_date) : null;
            
            // Calculate duration in days
            let duration = null;
            if (recallDate && closedDate) {
              duration = Math.round((closedDate - recallDate) / (1000 * 60 * 60 * 24));
            }
            
            return {
              recall_number: row.recall_number,
              establishment: row.establishment,
              recall_date: recallDate,
              closed_date: closedDate,
              year: row.year ? parseInt(row.year) : null,
              risk_level: row.risk_level,
              recall_reason: row.recall_reason,
              duration: duration
            };
          })
          .filter(d => d.year && d.duration !== null && d.duration >= 0 && d.risk_level);
        
        // Group by risk level and calculate duration statistics
        const durationByRiskLevel = d3.rollup(
          processedData,
          v => {
            const durations = v.map(d => d.duration).sort(d3.ascending);
            const q1 = d3.quantile(durations, 0.25);
            const median = d3.quantile(durations, 0.5);
            const q3 = d3.quantile(durations, 0.75);
            const iqr = q3 - q1;
            const min = Math.max(0, d3.min(durations));
            const max = d3.max(durations);
            
            const whiskerLow = Math.max(min, q1 - 1.5 * iqr);
            const whiskerHigh = Math.min(max, q3 + 1.5 * iqr);
            
            const outliers = durations.filter(d => d < whiskerLow || d > whiskerHigh);
            
            return {
              count: v.length,
              min,
              q1,
              median,
              q3,
              max,
              whiskerLow,
              whiskerHigh,
              outliers,
              mean: d3.mean(durations),
              durations
            };
          },
          d => d.risk_level
        );
        
        const chartData = Array.from(durationByRiskLevel, ([riskLevel, stats]) => ({
          riskLevel,
          ...stats
        })).sort((a, b) => b.median - a.median);
        
        setData(chartData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Failed to load recall duration data. Please try again later.');
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
    const margin = { top: 40, right: 30, bottom: 60, left: 80 };
    const width = 800;
    const height = 500;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');

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
      .text('FSIS Recall Duration by Risk Level');

    // Create scales
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.riskLevel))
      .range([0, innerWidth])
      .padding(0.3);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.max) * 1.1])
      .range([innerHeight, 0]);

    // Create color scale
    const colorScale = d3.scaleOrdinal()
      .domain(data.map(d => d.riskLevel))
      .range(['#dc3545', '#fd7e14', '#ffc107', '#20c997']);

    // Add axes
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .style('text-anchor', 'middle');

    g.append('g')
      .call(d3.axisLeft(yScale).ticks(10));

    // Add axis labels
    g.append('text')
      .attr('x', innerWidth / 2)
      .attr('y', innerHeight + 40)
      .attr('text-anchor', 'middle')
      .text('Risk Level');

    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -innerHeight / 2)
      .attr('y', -60)
      .attr('text-anchor', 'middle')
      .text('Duration (Days)');

    // Create tooltip
    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('display', 'none')
      .style('background-color', 'rgba(255, 255, 255, 0.95)')
      .style('padding', '10px')
      .style('border', '1px solid #ddd')
      .style('border-radius', '0')
      .style('box-shadow', '0 2px 4px rgba(0,0,0,0.1)')
      .style('font-size', '12px')
      .style('z-index', '1000')
      .style('pointer-events', 'none');

    // Add box plots
    const boxWidth = xScale.bandwidth();
    
    const boxPlots = g.selectAll('.boxplot')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'boxplot')
      .attr('transform', d => `translate(${xScale(d.riskLevel)},0)`);

    // Add boxes
    boxPlots.append('rect')
      .attr('x', 0)
      .attr('y', d => yScale(d.q3))
      .attr('width', boxWidth)
      .attr('height', d => yScale(d.q1) - yScale(d.q3))
      .attr('fill', d => colorScale(d.riskLevel))
      .attr('stroke', '#000')
      .attr('stroke-width', 1)
      .attr('opacity', 0.7)
      .on('mouseover', function(event, d) {
        d3.select(this).attr('opacity', 1);
        tooltip
          .style('display', 'block')
          .html(`
            <div style="font-weight: bold; margin-bottom: 5px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">
              ${d.riskLevel}
            </div>
            <div style="display: grid; grid-template-columns: auto auto; gap: 4px;">
              <div>Count:</div><div style="text-align: right">${d.count} recalls</div>
              <div>Median:</div><div style="text-align: right">${Math.round(d.median)} days</div>
              <div>Mean:</div><div style="text-align: right">${Math.round(d.mean)} days</div>
              <div>Q1 (25%):</div><div style="text-align: right">${Math.round(d.q1)} days</div>
              <div>Q3 (75%):</div><div style="text-align: right">${Math.round(d.q3)} days</div>
              <div>Min:</div><div style="text-align: right">${Math.round(d.min)} days</div>
              <div>Max:</div><div style="text-align: right">${Math.round(d.max)} days</div>
            </div>
          `)
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 10}px`);
      })
      .on('mousemove', function(event) {
        tooltip
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 10}px`);
      })
      .on('mouseout', function() {
        d3.select(this).attr('opacity', 0.7);
        tooltip.style('display', 'none');
      });

    // Add median lines
    boxPlots.append('line')
      .attr('x1', 0)
      .attr('x2', boxWidth)
      .attr('y1', d => yScale(d.median))
      .attr('y2', d => yScale(d.median))
      .attr('stroke', '#000')
      .attr('stroke-width', 2);

    // Add whiskers
    boxPlots.append('line')
      .attr('class', 'whisker')
      .attr('x1', boxWidth / 2)
      .attr('x2', boxWidth / 2)
      .attr('y1', d => yScale(d.whiskerLow))
      .attr('y2', d => yScale(d.q1))
      .attr('stroke', '#000')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '3,3');

    boxPlots.append('line')
      .attr('class', 'whisker')
      .attr('x1', boxWidth / 2)
      .attr('x2', boxWidth / 2)
      .attr('y1', d => yScale(d.q3))
      .attr('y2', d => yScale(d.whiskerHigh))
      .attr('stroke', '#000')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '3,3');

    // Add whisker caps
    boxPlots.append('line')
      .attr('class', 'whisker-cap')
      .attr('x1', boxWidth * 0.25)
      .attr('x2', boxWidth * 0.75)
      .attr('y1', d => yScale(d.whiskerLow))
      .attr('y2', d => yScale(d.whiskerLow))
      .attr('stroke', '#000')
      .attr('stroke-width', 1);

    boxPlots.append('line')
      .attr('class', 'whisker-cap')
      .attr('x1', boxWidth * 0.25)
      .attr('x2', boxWidth * 0.75)
      .attr('y1', d => yScale(d.whiskerHigh))
      .attr('y2', d => yScale(d.whiskerHigh))
      .attr('stroke', '#000')
      .attr('stroke-width', 1);

    // Add outliers
    boxPlots.each(function(d) {
      d3.select(this).selectAll('.outlier')
        .data(d.outliers)
        .enter()
        .append('circle')
        .attr('class', 'outlier')
        .attr('cx', boxWidth / 2)
        .attr('cy', value => yScale(value))
        .attr('r', 3)
        .attr('fill', colorScale(d.riskLevel))
        .attr('stroke', '#000')
        .attr('stroke-width', 1)
        .attr('opacity', 0.6);
    });

    // Cleanup function
    return () => {
      d3.select('body').selectAll('.tooltip').remove();
    };
  }, [data, loading, error]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-3" role="alert">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        {error}
      </div>
    );
  }

  return (
    <div className="chart-container">
      <svg 
        ref={svgRef}
        style={{ width: '100%', height: '100%', minHeight: '500px' }}
      />
    </div>
  );
};

export default RecallDurationChart; 