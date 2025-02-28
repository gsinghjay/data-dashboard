import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data, width = 800, height = 500, margin = { top: 30, right: 30, bottom: 90, left: 60 } }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || !data.length) return;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll('*').remove();

    // Create SVG with responsive container
    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .attr('class', 'rounded-0');

    // Calculate dimensions
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create scales
    const x = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([0, innerWidth])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) * 1.1]) // Add 10% padding to top
      .nice()
      .range([innerHeight, 0]);

    // Create container group
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add bars
    g.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.label))
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => innerHeight - y(d.value))
      .attr('class', 'rounded-0')
      .attr('fill', '#0d6efd');

    // Add value labels on top of bars with improved visibility
    g.selectAll('.value-label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'value-label')
      .attr('x', d => x(d.label) + x.bandwidth() / 2)
      .attr('y', d => y(d.value) - 10) // Increased distance from bar top
      .attr('text-anchor', 'middle')
      .style('font-size', '14px') // Increased font size
      .style('font-weight', 'bold') // Made text bold
      .style('fill', '#000') // Ensured text color is black
      .text(d => d.value);

    // Add a white background to the text for better visibility
    g.selectAll('.value-label-bg')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'value-label-bg')
      .attr('x', d => x(d.label) + x.bandwidth() / 2)
      .attr('y', d => y(d.value) - 10) // Same position as the text
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .style('stroke', 'white')
      .style('stroke-width', '3px')
      .style('fill', 'none')
      .style('paint-order', 'stroke')
      .text(d => d.value);

    // Add x-axis with rotated labels
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .style('font-size', '12px');

    // Add y-axis
    g.append('g')
      .call(d3.axisLeft(y))
      .selectAll('text')
      .style('font-size', '12px');

    // Add y-axis label
    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -margin.left + 20)
      .attr('x', -innerHeight / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .text('Number of Substances');

    // Add hover effects
    g.selectAll('rect')
      .on('mouseover', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('fill', '#0b5ed7');

        const tooltip = d3.select('body').append('div')
          .attr('class', 'tooltip bg-dark text-light p-2 rounded-0')
          .style('position', 'absolute')
          .style('opacity', 0);

        tooltip.transition()
          .duration(200)
          .style('opacity', 0.9);

        tooltip.html(`
          <div class="small">
            <strong>${d.label}</strong><br/>
            ${d.value} substances
          </div>
        `)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('fill', '#0d6efd');
        
        d3.selectAll('.tooltip').remove();
      });

  }, [data, width, height, margin]);

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

export default BarChart; 