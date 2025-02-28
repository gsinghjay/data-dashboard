import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const FSMAImplementationChart = () => {
  const svgRef = useRef();

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll('*').remove();

    // Chart dimensions
    const width = 800;
    const height = 400;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
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

    // Data for FSMA implementation timeline
    const timelineData = [
      { phase: 'FSMA Enacted', start: 2011, end: 2011, type: 'milestone', obesityRate: 31.48, recalls: 89 },
      { phase: 'Preventive Controls', start: 2011, end: 2016, type: 'implementation', obesityRate: null, recalls: null },
      { phase: 'Produce Safety', start: 2013, end: 2017, type: 'implementation', obesityRate: null, recalls: null },
      { phase: 'Foreign Supplier', start: 2014, end: 2018, type: 'implementation', obesityRate: null, recalls: null },
      { phase: 'Mid-Point (33.2%)', start: 2015, end: 2015, type: 'milestone', obesityRate: 33.2, recalls: 103 },
      { phase: 'Final (35.2%)', start: 2019, end: 2019, type: 'milestone', obesityRate: 35.2, recalls: 112 }
    ];

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([2011, 2019])
      .range([0, innerWidth]);

    const yScale = d3.scaleBand()
      .domain(timelineData.map(d => d.phase))
      .range([0, innerHeight])
      .padding(0.2);

    // Add x-axis
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.format('d')))
      .selectAll('text')
      .style('font-size', '12px');

    // Add y-axis
    g.append('g')
      .call(d3.axisLeft(yScale))
      .selectAll('text')
      .style('font-size', '12px');

    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 25)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text('FSMA Implementation Phases (2011-2019)');

    // Add implementation bars
    g.selectAll('.implementation-bar')
      .data(timelineData.filter(d => d.type === 'implementation'))
      .enter()
      .append('rect')
      .attr('class', 'implementation-bar rounded-0')
      .attr('x', d => xScale(d.start))
      .attr('y', d => yScale(d.phase))
      .attr('width', d => xScale(d.end) - xScale(d.start))
      .attr('height', yScale.bandwidth())
      .attr('fill', '#0d6efd')
      .attr('opacity', 0.7);

    // Add milestone markers
    g.selectAll('.milestone-marker')
      .data(timelineData.filter(d => d.type === 'milestone'))
      .enter()
      .append('circle')
      .attr('class', 'milestone-marker')
      .attr('cx', d => xScale(d.start))
      .attr('cy', d => yScale(d.phase) + yScale.bandwidth() / 2)
      .attr('r', 8)
      .attr('fill', '#dc3545');

    // Add milestone labels
    g.selectAll('.milestone-label')
      .data(timelineData.filter(d => d.type === 'milestone'))
      .enter()
      .append('text')
      .attr('class', 'milestone-label')
      .attr('x', d => xScale(d.start) + 15)
      .attr('y', d => yScale(d.phase) + yScale.bandwidth() / 2 + 5)
      .style('font-size', '12px')
      .text(d => `Obesity: ${d.obesityRate}%, Recalls: ${d.recalls}`);

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

    // Add tooltip interactions for implementation bars
    g.selectAll('.implementation-bar')
      .on('mouseover', function(event, d) {
        d3.select(this).attr('opacity', 1);
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip.html(`<strong>${d.phase}</strong><br/>Period: ${d.start}-${d.end}`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', function() {
        d3.select(this).attr('opacity', 0.7);
        tooltip.transition().duration(500).style('opacity', 0);
      });

    // Add tooltip interactions for milestone markers
    g.selectAll('.milestone-marker')
      .on('mouseover', function(event, d) {
        d3.select(this).attr('r', 10);
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip.html(`<strong>${d.phase}</strong><br/>Year: ${d.start}<br/>Obesity Rate: ${d.obesityRate}%<br/>Annual Recalls: ${d.recalls}`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', function() {
        d3.select(this).attr('r', 8);
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

export default FSMAImplementationChart; 