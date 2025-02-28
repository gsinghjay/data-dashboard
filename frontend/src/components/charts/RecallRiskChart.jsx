import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const RecallRiskChart = () => {
  const svgRef = useRef();

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll('*').remove();

    // Chart dimensions
    const width = 600;
    const height = 400;
    const margin = { top: 40, right: 20, bottom: 40, left: 20 };
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

    // Data for recall risk analysis
    const data = {
      name: "Food Safety Risk Distribution",
      children: [
        {
          name: "High Risk - Class I",
          value: 919,
          color: "#dc3545"
        },
        {
          name: "Low Risk - Class II",
          value: 255,
          color: "#ffc107"
        },
        {
          name: "Public Health Alert",
          value: 118,
          color: "#fd7e14"
        },
        {
          name: "Marginal Risk - Class III",
          value: 72,
          color: "#20c997"
        }
      ]
    };

    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 25)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text('Food Safety Risk Distribution');

    // Create treemap layout
    const treemap = d3.treemap()
      .size([innerWidth, innerHeight])
      .padding(1)
      .round(true);

    // Create hierarchy
    const root = d3.hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);

    // Apply treemap layout
    treemap(root);

    // Create cells
    const cell = g.selectAll('g')
      .data(root.leaves())
      .enter()
      .append('g')
      .attr('transform', d => `translate(${d.x0},${d.y0})`);

    // Add rectangles
    cell.append('rect')
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .attr('fill', d => d.data.color || '#0d6efd')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .attr('class', 'rounded-0')
      .style('opacity', 0.8)
      .on('mouseover', function() {
        d3.select(this).style('opacity', 1);
      })
      .on('mouseout', function() {
        d3.select(this).style('opacity', 0.8);
      });

    // Add text labels
    cell.append('text')
      .attr('x', d => (d.x1 - d.x0) / 2)
      .attr('y', d => (d.y1 - d.y0) / 2)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .style('fill', 'white')
      .style('pointer-events', 'none')
      .text(d => d.data.name);

    // Add value labels
    cell.append('text')
      .attr('x', d => (d.x1 - d.x0) / 2)
      .attr('y', d => (d.y1 - d.y0) / 2 + 16)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .style('font-size', '12px')
      .style('fill', 'white')
      .style('pointer-events', 'none')
      .text(d => {
        const percentage = (d.value / root.value * 100).toFixed(1);
        return `${d.value} (${percentage}%)`;
      });

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
    cell.selectAll('rect')
      .on('mouseover', function(event, d) {
        const percentage = (d.value / root.value * 100).toFixed(1);
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip.html(`<strong>${d.data.name}</strong><br/>${d.value} recalls<br/>${percentage}% of total`)
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

export default RecallRiskChart; 