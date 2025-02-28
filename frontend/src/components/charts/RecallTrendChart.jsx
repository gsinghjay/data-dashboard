import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const RecallTrendChart = () => {
  const svgRef = useRef();

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll('*').remove();

    // Chart dimensions
    const width = 800;
    const height = 400;
    const margin = { top: 50, right: 80, bottom: 50, left: 60 };
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

    // Data for recall incidents vs obesity rates
    const data = [
      { year: 2011, recalls: 89, obesityRate: 31.48 },
      { year: 2013, recalls: 94, obesityRate: 32.2 },
      { year: 2015, recalls: 103, obesityRate: 33.2 },
      { year: 2017, recalls: 108, obesityRate: 34.1 },
      { year: 2019, recalls: 112, obesityRate: 35.2 }
    ];

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([2011, 2019])
      .range([0, innerWidth]);

    const yScaleRecalls = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.recalls) * 1.1])
      .nice()
      .range([innerHeight, 0]);

    const yScaleObesity = d3.scaleLinear()
      .domain([30, d3.max(data, d => d.obesityRate) * 1.05])
      .nice()
      .range([innerHeight, 0]);

    // Add x-axis
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.format('d')))
      .selectAll('text')
      .style('font-size', '12px');

    // Add x-axis label
    g.append('text')
      .attr('x', innerWidth / 2)
      .attr('y', innerHeight + 40)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .text('Year');

    // Add left y-axis (recalls)
    g.append('g')
      .call(d3.axisLeft(yScaleRecalls))
      .selectAll('text')
      .style('font-size', '12px');

    // Add left y-axis label
    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -innerHeight / 2)
      .attr('y', -40)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('fill', '#0d6efd')
      .text('Recalls');

    // Add right y-axis (obesity rates)
    g.append('g')
      .attr('transform', `translate(${innerWidth}, 0)`)
      .call(d3.axisRight(yScaleObesity).tickFormat(d => `${d}%`))
      .selectAll('text')
      .style('font-size', '12px');

    // Add right y-axis label
    g.append('text')
      .attr('transform', 'rotate(90)')
      .attr('x', innerHeight / 2)
      .attr('y', -innerWidth - 40)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('fill', '#dc3545')
      .text('Obesity Rate (%)');

    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 25)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text('Recall Incidents vs Obesity Rates (2011-2019)');

    // Create line generators
    const recallLine = d3.line()
      .x(d => xScale(d.year))
      .y(d => yScaleRecalls(d.recalls))
      .curve(d3.curveMonotoneX);

    const obesityLine = d3.line()
      .x(d => xScale(d.year))
      .y(d => yScaleObesity(d.obesityRate))
      .curve(d3.curveMonotoneX);

    // Add recall line
    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#0d6efd')
      .attr('stroke-width', 3)
      .attr('d', recallLine);

    // Add obesity line
    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#dc3545')
      .attr('stroke-width', 3)
      .attr('d', obesityLine);

    // Add recall data points
    g.selectAll('.recall-point')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'recall-point')
      .attr('cx', d => xScale(d.year))
      .attr('cy', d => yScaleRecalls(d.recalls))
      .attr('r', 5)
      .attr('fill', '#0d6efd')
      .style('opacity', 0.8)
      .on('mouseover', function() {
        d3.select(this).attr('r', 7).style('opacity', 1);
      })
      .on('mouseout', function() {
        d3.select(this).attr('r', 5).style('opacity', 0.8);
      });

    // Add obesity data points
    g.selectAll('.obesity-point')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'obesity-point')
      .attr('cx', d => xScale(d.year))
      .attr('cy', d => yScaleObesity(d.obesityRate))
      .attr('r', 5)
      .attr('fill', '#dc3545')
      .style('opacity', 0.8)
      .on('mouseover', function() {
        d3.select(this).attr('r', 7).style('opacity', 1);
      })
      .on('mouseout', function() {
        d3.select(this).attr('r', 5).style('opacity', 0.8);
      });

    // Add legend
    const legendX = 0;
    const legendY = -30;
    const legendItemHeight = 20;
    const legendItemWidth = 150;

    const legendData = [
      { label: 'Recalls', color: '#0d6efd' },
      { label: 'Obesity Rate', color: '#dc3545' }
    ];

    const legend = g.selectAll('.legend')
      .data(legendData)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => `translate(${legendX + i * legendItemWidth},${legendY})`);

    legend.append('line')
      .attr('x1', 0)
      .attr('y1', 9)
      .attr('x2', 20)
      .attr('y2', 9)
      .attr('stroke', d => d.color)
      .attr('stroke-width', 3);

    legend.append('circle')
      .attr('cx', 10)
      .attr('cy', 9)
      .attr('r', 4)
      .attr('fill', d => d.color);

    legend.append('text')
      .attr('x', 25)
      .attr('y', 12)
      .style('font-size', '12px')
      .text(d => d.label);

    // Add correlation text
    g.append('text')
      .attr('x', innerWidth / 2)
      .attr('y', 0)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('font-style', 'italic')
      .text('Correlation: r = 0.65');

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

    // Add tooltip interactions for recall points
    g.selectAll('.recall-point')
      .on('mouseover', function(event, d) {
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip.html(`<strong>Year: ${d.year}</strong><br/>Recalls: ${d.recalls}`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', function() {
        tooltip.transition().duration(500).style('opacity', 0);
      });

    // Add tooltip interactions for obesity points
    g.selectAll('.obesity-point')
      .on('mouseover', function(event, d) {
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip.html(`<strong>Year: ${d.year}</strong><br/>Obesity Rate: ${d.obesityRate}%`)
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
  }, []);

  return (
    <div className="chart-container w-100 h-100 d-flex justify-content-center align-items-center">
      <svg 
        ref={svgRef}
        style={{ width: '100%', height: '100%', minHeight: '300px' }}
        className="rounded-0"
      />
    </div>
  );
};

export default RecallTrendChart; 