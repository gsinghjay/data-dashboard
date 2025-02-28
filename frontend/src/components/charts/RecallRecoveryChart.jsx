import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { processFSISRecalls } from '../../utils/dataProcessing';

const RecallRecoveryChart = () => {
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
          .map(row => ({
            recall_number: row.field_recall_number,
            establishment: row.field_establishment,
            recall_date: row.field_recall_date ? new Date(row.field_recall_date) : null,
            year: row.year ? parseInt(row.year) : null,
            risk_level: row.risk_level,
            qty_recovered: row.field_qty_recovered ? parseFloat(row.field_qty_recovered) : 0,
            product_items: row.field_product_items,
            recall_reason: row.field_recall_reason
          }))
          .filter(d => d.year && d.qty_recovered !== null && !isNaN(d.qty_recovered));
        
        // Group by year and calculate recovery statistics
        const recoveryByYear = d3.rollup(
          processedData,
          v => {
            const totalRecalls = v.length;
            const totalRecovered = d3.sum(v, d => d.qty_recovered);
            const avgRecovered = totalRecovered / totalRecalls;
            
            // Calculate recovery rate distribution
            const recoveryRates = [
              { range: '0-25%', count: v.filter(d => d.qty_recovered >= 0 && d.qty_recovered < 25).length },
              { range: '25-50%', count: v.filter(d => d.qty_recovered >= 25 && d.qty_recovered < 50).length },
              { range: '50-75%', count: v.filter(d => d.qty_recovered >= 50 && d.qty_recovered < 75).length },
              { range: '75-100%', count: v.filter(d => d.qty_recovered >= 75 && d.qty_recovered <= 100).length }
            ];
            
            return {
              totalRecalls,
              totalRecovered,
              avgRecovered,
              recoveryRates
            };
          },
          d => d.year
        );
        
        // Convert to array and sort by year
        const chartData = Array.from(recoveryByYear, ([year, stats]) => ({
          year,
          totalRecalls: stats.totalRecalls,
          totalRecovered: stats.totalRecovered,
          avgRecovered: stats.avgRecovered,
          recoveryRates: stats.recoveryRates
        })).sort((a, b) => a.year - b.year);
        
        setData(chartData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Failed to load recall recovery data. Please try again later.');
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
    const margin = { top: 40, right: 120, bottom: 60, left: 60 };
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
      .text('FSIS Recall Recovery Rates by Year');

    // Create scales
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.year))
      .range([0, innerWidth])
      .padding(0.3);

    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([innerHeight, 0]);

    // Create color scale for stacked bars
    const colorScale = d3.scaleOrdinal()
      .domain(['0-25%', '25-50%', '50-75%', '75-100%'])
      .range(['#dc3545', '#fd7e14', '#ffc107', '#20c997']);

    // Stack the data
    const stackedData = [];
    data.forEach(yearData => {
      yearData.recoveryRates.forEach(rate => {
        stackedData.push({
          year: yearData.year,
          range: rate.range,
          count: rate.count,
          percentage: (rate.count / yearData.totalRecalls) * 100
        });
      });
    });

    // Group stacked data by year
    const nestedData = d3.group(stackedData, d => d.year);

    // Add axes
    const xAxis = d3.axisBottom(xScale)
      .tickFormat(d3.format('d')); // Format as integer

    const yAxis = d3.axisLeft(yScale)
      .ticks(10)
      .tickFormat(d => `${d}%`);

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
      .text('Year');

    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -innerHeight / 2)
      .attr('y', -40)
      .attr('text-anchor', 'middle')
      .text('Percentage of Recalls');

    // Add stacked bars
    nestedData.forEach((yearRates, year) => {
      let cumulative = 0;
      
      yearRates.forEach(d => {
        g.append('rect')
          .attr('x', xScale(parseInt(year)))
          .attr('y', yScale(d.percentage + cumulative))
          .attr('width', xScale.bandwidth())
          .attr('height', innerHeight - yScale(d.percentage))
          .attr('fill', colorScale(d.range))
          .attr('stroke', 'white')
          .attr('stroke-width', 1)
          .attr('class', 'rounded-0')
          .style('opacity', 0.8)
          .attr('data-year', year) // Store year as data attribute
          .attr('data-range', d.range) // Store range as data attribute
          .on('mouseover', function(event) {
            d3.select(this).style('opacity', 1);
          })
          .on('mouseout', function() {
            d3.select(this).style('opacity', 0.8);
          });
        
        cumulative += d.percentage;
      });
    });

    // Add average recovery rate line
    const lineGenerator = d3.line()
      .x(d => xScale(d.year) + xScale.bandwidth() / 2)
      .y(d => yScale(d.avgRecovered))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#0d6efd')
      .attr('stroke-width', 2)
      .attr('d', lineGenerator);

    // Add line points
    g.selectAll('.line-point')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'line-point')
      .attr('cx', d => xScale(d.year) + xScale.bandwidth() / 2)
      .attr('cy', d => yScale(d.avgRecovered))
      .attr('r', 4)
      .attr('fill', '#0d6efd')
      .attr('stroke', 'white')
      .attr('stroke-width', 1)
      .attr('data-year', d => d.year) // Store year as data attribute
      .on('mouseover', function(event) {
        d3.select(this).attr('r', 6);
      })
      .on('mouseout', function() {
        d3.select(this).attr('r', 4);
      });

    // Add legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width - margin.right + 20}, ${margin.top})`);

    // Recovery rate legend
    const recoveryLegend = legend.append('g');
    
    ['0-25%', '25-50%', '50-75%', '75-100%'].forEach((range, i) => {
      const legendRow = recoveryLegend.append('g')
        .attr('transform', `translate(0, ${i * 20})`);
      
      legendRow.append('rect')
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', colorScale(range))
        .attr('class', 'rounded-0');
      
      legendRow.append('text')
        .attr('x', 20)
        .attr('y', 12.5)
        .attr('text-anchor', 'start')
        .style('font-size', '12px')
        .text(range);
    });

    // Average line legend
    const lineLegend = legend.append('g')
      .attr('transform', `translate(0, ${4 * 20 + 10})`);
    
    lineLegend.append('line')
      .attr('x1', 0)
      .attr('y1', 7.5)
      .attr('x2', 15)
      .attr('y2', 7.5)
      .attr('stroke', '#0d6efd')
      .attr('stroke-width', 2);
    
    lineLegend.append('text')
      .attr('x', 20)
      .attr('y', 12.5)
      .attr('text-anchor', 'start')
      .style('font-size', '12px')
      .text('Avg Recovery Rate');

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

    // Add tooltip interactions for stacked bars
    g.selectAll('rect')
      .on('mouseover', function(event, d) {
        const rect = d3.select(this);
        const year = rect.attr('data-year');
        const range = rect.attr('data-range');
        
        // Find the corresponding data
        const yearData = data.find(item => item.year === parseInt(year));
        if (!yearData) return;
        
        const rangeData = stackedData.find(item => 
          item.year === parseInt(year) && item.range === range
        );
        if (!rangeData) return;
        
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip.html(`
          <strong>Year: ${year}</strong><br/>
          <strong>${range} Recovery:</strong> ${rangeData.count} recalls (${rangeData.percentage.toFixed(1)}%)<br/>
          <strong>Total Recalls:</strong> ${yearData.totalRecalls}<br/>
          <strong>Avg Recovery Rate:</strong> ${yearData.avgRecovered.toFixed(1)}%
        `)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', function() {
        tooltip.transition().duration(500).style('opacity', 0);
      });

    // Add tooltip interactions for line points
    g.selectAll('.line-point')
      .on('mouseover', function(event, d) {
        const year = d3.select(this).attr('data-year');
        const yearData = data.find(item => item.year === parseInt(year));
        if (!yearData) return;
        
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip.html(`
          <strong>Year: ${yearData.year}</strong><br/>
          <strong>Avg Recovery Rate:</strong> ${yearData.avgRecovered.toFixed(1)}%<br/>
          <strong>Total Recalls:</strong> ${yearData.totalRecalls}
        `)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', function() {
        tooltip.transition().duration(500).style('opacity', 0);
      });

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

export default RecallRecoveryChart; 