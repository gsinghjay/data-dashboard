import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { processFSISRecalls } from '../../utils/dataProcessing';

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
            const recallDate = row.field_recall_date ? new Date(row.field_recall_date) : null;
            const closedDate = row.field_closed_date ? new Date(row.field_closed_date) : null;
            
            // Calculate duration in days
            let duration = null;
            if (recallDate && closedDate) {
              duration = Math.round((closedDate - recallDate) / (1000 * 60 * 60 * 24));
            }
            
            return {
              recall_number: row.field_recall_number,
              establishment: row.field_establishment,
              recall_date: recallDate,
              closed_date: closedDate,
              year: row.year ? parseInt(row.year) : null,
              risk_level: row.risk_level,
              recall_reason: row.field_recall_reason,
              duration: duration
            };
          })
          .filter(d => d.year && d.duration !== null && d.duration >= 0);
        
        // Group by risk level and calculate duration statistics
        const durationByRiskLevel = d3.rollup(
          processedData,
          v => {
            // Calculate quartiles, min, max for box plot
            const durations = v.map(d => d.duration).sort(d3.ascending);
            const q1 = d3.quantile(durations, 0.25);
            const median = d3.quantile(durations, 0.5);
            const q3 = d3.quantile(durations, 0.75);
            const iqr = q3 - q1;
            const min = Math.max(0, d3.min(durations));
            const max = d3.max(durations);
            
            // Calculate whiskers (1.5 * IQR)
            const whiskerLow = Math.max(min, q1 - 1.5 * iqr);
            const whiskerHigh = Math.min(max, q3 + 1.5 * iqr);
            
            // Find outliers
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
        
        // Convert to array and sort by median duration
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
    const width = 800;
    const height = 500;
    const margin = { top: 40, right: 30, bottom: 60, left: 80 };
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
      .text('FSIS Recall Duration by Risk Level');

    // Create scales
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.riskLevel))
      .range([0, innerWidth])
      .padding(0.3);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.max) * 1.1]) // Add 10% padding
      .range([innerHeight, 0]);

    // Create color scale
    const colorScale = d3.scaleOrdinal()
      .domain(data.map(d => d.riskLevel))
      .range(['#dc3545', '#fd7e14', '#ffc107', '#20c997']);

    // Add axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale)
      .ticks(10);

    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'middle');

    g.append('g')
      .call(yAxis);

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

    // Add box plots
    const boxWidth = xScale.bandwidth();
    
    data.forEach(d => {
      const x = xScale(d.riskLevel);
      const color = colorScale(d.riskLevel);
      
      // Add box
      g.append('rect')
        .attr('x', x)
        .attr('y', yScale(d.q3))
        .attr('width', boxWidth)
        .attr('height', yScale(d.q1) - yScale(d.q3))
        .attr('fill', color)
        .attr('stroke', '#000')
        .attr('stroke-width', 1)
        .attr('opacity', 0.7)
        .attr('class', 'rounded-0');
      
      // Add median line
      g.append('line')
        .attr('x1', x)
        .attr('x2', x + boxWidth)
        .attr('y1', yScale(d.median))
        .attr('y2', yScale(d.median))
        .attr('stroke', '#000')
        .attr('stroke-width', 2);
      
      // Add whiskers
      g.append('line')
        .attr('x1', x + boxWidth / 2)
        .attr('x2', x + boxWidth / 2)
        .attr('y1', yScale(d.whiskerLow))
        .attr('y2', yScale(d.q1))
        .attr('stroke', '#000')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '3,3');
      
      g.append('line')
        .attr('x1', x + boxWidth / 2)
        .attr('x2', x + boxWidth / 2)
        .attr('y1', yScale(d.q3))
        .attr('y2', yScale(d.whiskerHigh))
        .attr('stroke', '#000')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '3,3');
      
      // Add whisker caps
      g.append('line')
        .attr('x1', x + boxWidth * 0.25)
        .attr('x2', x + boxWidth * 0.75)
        .attr('y1', yScale(d.whiskerLow))
        .attr('y2', yScale(d.whiskerLow))
        .attr('stroke', '#000')
        .attr('stroke-width', 1);
      
      g.append('line')
        .attr('x1', x + boxWidth * 0.25)
        .attr('x2', x + boxWidth * 0.75)
        .attr('y1', yScale(d.whiskerHigh))
        .attr('y2', yScale(d.whiskerHigh))
        .attr('stroke', '#000')
        .attr('stroke-width', 1);
      
      // Add mean marker
      g.append('circle')
        .attr('cx', x + boxWidth / 2)
        .attr('cy', yScale(d.mean))
        .attr('r', 4)
        .attr('fill', '#fff')
        .attr('stroke', '#000')
        .attr('stroke-width', 1);
      
      // Add outliers
      d.outliers.forEach(outlier => {
        g.append('circle')
          .attr('cx', x + boxWidth / 2 + (Math.random() - 0.5) * boxWidth * 0.5)
          .attr('cy', yScale(outlier))
          .attr('r', 3)
          .attr('fill', '#000')
          .attr('opacity', 0.5);
      });
      
      // Add count label
      g.append('text')
        .attr('x', x + boxWidth / 2)
        .attr('y', yScale(d.max) - 10)
        .attr('text-anchor', 'middle')
        .style('font-size', '10px')
        .text(`n = ${d.count}`);
    });

    // Add annotations
    g.append('text')
      .attr('x', innerWidth / 2)
      .attr('y', 10)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('font-style', 'italic')
      .text('Box: 25th to 75th percentile, Line: Median, Circle: Mean, Whiskers: 1.5 × IQR');

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

    // Add tooltip interactions for boxes
    g.selectAll('rect')
      .on('mouseover', function(event, d) {
        const riskData = data.find(item => item.riskLevel === d3.select(this.parentNode).datum().riskLevel);
        
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip.html(`
          <strong>Risk Level: ${riskData.riskLevel}</strong><br/>
          <strong>Median Duration:</strong> ${Math.round(riskData.median)} days<br/>
          <strong>Mean Duration:</strong> ${Math.round(riskData.mean)} days<br/>
          <strong>Q1 (25%):</strong> ${Math.round(riskData.q1)} days<br/>
          <strong>Q3 (75%):</strong> ${Math.round(riskData.q3)} days<br/>
          <strong>Min:</strong> ${Math.round(riskData.min)} days<br/>
          <strong>Max:</strong> ${Math.round(riskData.max)} days<br/>
          <strong>Count:</strong> ${riskData.count} recalls
        `)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', function() {
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

export default RecallDurationChart; 