import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const TopRecallStatesChart = () => {
  const svgRef = useRef();

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll('*').remove();

    // Chart dimensions
    const width = 800;
    const height = 500;
    const margin = { top: 50, right: 50, bottom: 70, left: 80 };
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

    // Data for top recall states
    const data = [
      { state: 'California', recalls: 211, obesityRate: 36.2 },
      { state: 'Texas', recalls: 168, obesityRate: 35.8 },
      { state: 'New York', recalls: 143, obesityRate: 34.9 },
      { state: 'Pennsylvania', recalls: 125, obesityRate: 35.1 },
      { state: 'Illinois', recalls: 122, obesityRate: 35.7 }
    ];

    // Create scales
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.state))
      .range([0, innerWidth])
      .padding(0.3);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.recalls) * 1.1])
      .nice()
      .range([innerHeight, 0]);

    const colorScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.obesityRate), d3.max(data, d => d.obesityRate)])
      .range(['#0d6efd', '#dc3545']);

    // Add x-axis
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .style('font-size', '12px')
      .style('text-anchor', 'middle');

    // Add x-axis label
    g.append('text')
      .attr('x', innerWidth / 2)
      .attr('y', innerHeight + 40)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .text('State');

    // Add y-axis
    g.append('g')
      .call(d3.axisLeft(yScale))
      .selectAll('text')
      .style('font-size', '12px');

    // Add y-axis label
    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -innerHeight / 2)
      .attr('y', -60)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .text('Number of Recalls');

    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 25)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text('Top Recall States (2011-2019)');

    // Add bars
    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar rounded-0')
      .attr('x', d => xScale(d.state))
      .attr('y', d => yScale(d.recalls))
      .attr('width', xScale.bandwidth())
      .attr('height', d => innerHeight - yScale(d.recalls))
      .attr('fill', d => colorScale(d.obesityRate))
      .style('opacity', 0.8)
      .on('mouseover', function() {
        d3.select(this).style('opacity', 1);
      })
      .on('mouseout', function() {
        d3.select(this).style('opacity', 0.8);
      });

    // Add value labels on top of bars
    g.selectAll('.value-label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'value-label')
      .attr('x', d => xScale(d.state) + xScale.bandwidth() / 2)
      .attr('y', d => yScale(d.recalls) - 5)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .text(d => d.recalls);

    // Add obesity rate labels
    g.selectAll('.obesity-label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'obesity-label')
      .attr('x', d => xScale(d.state) + xScale.bandwidth() / 2)
      .attr('y', innerHeight + 25)
      .attr('text-anchor', 'middle')
      .style('font-size', '10px')
      .text(d => `${d.obesityRate}% obesity`);

    // Add color legend
    const legendWidth = 200;
    const legendHeight = 20;
    const legendX = innerWidth - legendWidth;
    const legendY = -30;

    // Create gradient for legend
    const defs = svg.append('defs');
    const gradient = defs.append('linearGradient')
      .attr('id', 'obesity-gradient')
      .attr('x1', '0%')
      .attr('x2', '100%')
      .attr('y1', '0%')
      .attr('y2', '0%');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', colorScale.range()[0]);

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', colorScale.range()[1]);

    // Add legend rectangle
    g.append('rect')
      .attr('x', legendX)
      .attr('y', legendY)
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .attr('fill', 'url(#obesity-gradient)')
      .attr('class', 'rounded-0');

    // Add legend title
    g.append('text')
      .attr('x', legendX + legendWidth / 2)
      .attr('y', legendY - 10)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .text('Obesity Rate');

    // Add legend labels
    g.append('text')
      .attr('x', legendX)
      .attr('y', legendY + legendHeight + 15)
      .attr('text-anchor', 'start')
      .style('font-size', '10px')
      .text(`${d3.min(data, d => d.obesityRate).toFixed(1)}%`);

    g.append('text')
      .attr('x', legendX + legendWidth)
      .attr('y', legendY + legendHeight + 15)
      .attr('text-anchor', 'end')
      .style('font-size', '10px')
      .text(`${d3.max(data, d => d.obesityRate).toFixed(1)}%`);

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
    g.selectAll('.bar')
      .on('mouseover', function(event, d) {
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip.html(`<strong>${d.state}</strong><br/>${d.recalls} recalls<br/>${d.obesityRate}% obesity rate`)
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
        style={{ width: '100%', height: '100%', minHeight: '400px' }}
        className="rounded-0"
      />
    </div>
  );
};

export default TopRecallStatesChart; 