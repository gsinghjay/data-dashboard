import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ObesityRateChart = () => {
  const svgRef = useRef();

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll('*').remove();

    // Chart dimensions
    const width = 800;
    const height = 400;
    const margin = { top: 50, right: 50, bottom: 50, left: 80 };
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

    // Data for obesity rate distribution
    const data = [
      { category: 'Highest', states: [
        { name: 'NH', rate: 39.2 },
        { name: 'AK', rate: 39.2 },
        { name: 'MT', rate: 39.2 }
      ]},
      { category: 'Lowest', states: [
        { name: 'PR', rate: 28.8 },
        { name: 'OK', rate: 34.6 },
        { name: 'MO', rate: 34.7 }
      ]}
    ];

    // Flatten data for easier processing
    const flatData = data.flatMap(category => 
      category.states.map(state => ({
        category: category.category,
        name: state.name,
        rate: state.rate
      }))
    );

    // Create scales
    const xScale = d3.scaleBand()
      .domain(flatData.map(d => d.name))
      .range([0, innerWidth])
      .padding(0.3);

    const yScale = d3.scaleLinear()
      .domain([25, 42]) // Set domain to include all values with some padding
      .nice()
      .range([innerHeight, 0]);

    const colorScale = d3.scaleOrdinal()
      .domain(['Highest', 'Lowest'])
      .range(['#dc3545', '#0d6efd']);

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
      .call(d3.axisLeft(yScale).tickFormat(d => `${d}%`))
      .selectAll('text')
      .style('font-size', '12px');

    // Add y-axis label
    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -innerHeight / 2)
      .attr('y', -60)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .text('Obesity Rate (%)');

    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 25)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text('Latest State Obesity Rates (2019)');

    // Add bars
    g.selectAll('.bar')
      .data(flatData)
      .enter()
      .append('rect')
      .attr('class', 'bar rounded-0')
      .attr('x', d => xScale(d.name))
      .attr('y', d => yScale(d.rate))
      .attr('width', xScale.bandwidth())
      .attr('height', d => innerHeight - yScale(d.rate))
      .attr('fill', d => colorScale(d.category))
      .style('opacity', 0.8)
      .on('mouseover', function() {
        d3.select(this).style('opacity', 1);
      })
      .on('mouseout', function() {
        d3.select(this).style('opacity', 0.8);
      });

    // Add value labels on top of bars
    g.selectAll('.value-label')
      .data(flatData)
      .enter()
      .append('text')
      .attr('class', 'value-label')
      .attr('x', d => xScale(d.name) + xScale.bandwidth() / 2)
      .attr('y', d => yScale(d.rate) - 5)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .text(d => `${d.rate}%`);

    // Add category labels
    g.selectAll('.category-label')
      .data(flatData)
      .enter()
      .append('text')
      .attr('class', 'category-label')
      .attr('x', d => xScale(d.name) + xScale.bandwidth() / 2)
      .attr('y', d => yScale(d.rate) + 20)
      .attr('text-anchor', 'middle')
      .style('font-size', '10px')
      .style('fill', 'white')
      .style('font-weight', 'bold')
      .text(d => d.category);

    // Add legend
    const legendX = innerWidth - 150;
    const legendY = 0;
    const legendItemHeight = 20;
    const legendItemWidth = 150;

    const legend = g.selectAll('.legend')
      .data(colorScale.domain())
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => `translate(${legendX},${legendY + i * legendItemHeight})`);

    legend.append('rect')
      .attr('width', 15)
      .attr('height', 15)
      .attr('fill', d => colorScale(d))
      .attr('class', 'rounded-0');

    legend.append('text')
      .attr('x', 20)
      .attr('y', 12)
      .style('font-size', '12px')
      .text(d => d);

    // Add gap indicator
    g.append('text')
      .attr('x', innerWidth / 2)
      .attr('y', innerHeight + 25)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('font-style', 'italic')
      .text('10.4 percentage point gap between highest and lowest');

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
        tooltip.html(`<strong>${d.name}</strong><br/>${d.category} Rate<br/>${d.rate}% obesity`)
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

export default ObesityRateChart; 