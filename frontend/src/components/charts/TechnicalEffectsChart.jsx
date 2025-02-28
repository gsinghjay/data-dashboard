import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const TechnicalEffectsChart = () => {
  const svgRef = useRef();

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll('*').remove();

    // Chart dimensions
    const width = 600;
    const height = 400;
    const margin = { top: 40, right: 20, bottom: 40, left: 20 };
    const radius = Math.min(width - margin.left - margin.right, height - margin.top - margin.bottom) / 2;

    // Create SVG with responsive container
    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .attr('class', 'rounded-0');

    // Create container group
    const g = svg.append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Data for technical effects distribution
    const data = [
      { label: 'FLAVOR', value: 3077 },
      { label: 'TEXTURE', value: 292 },
      { label: 'PROCESSING', value: 222 },
      { label: 'NUTRIENT', value: 189 },
      { label: 'COLOR', value: 128 },
      { label: 'PRESERVATIVE', value: 114 }
    ];

    // Color scale
    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.label))
      .range(['#0d6efd', '#6610f2', '#6f42c1', '#d63384', '#dc3545', '#fd7e14']);

    // Create pie generator
    const pie = d3.pie()
      .value(d => d.value)
      .sort(null);

    // Create arc generator
    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    // Create outer arc for labels
    const outerArc = d3.arc()
      .innerRadius(radius * 1.1)
      .outerRadius(radius * 1.1);

    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 25)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text('FDA Approved Substances Analysis');

    // Add pie slices
    const slices = g.selectAll('.slice')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'slice');

    slices.append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.label))
      .attr('stroke', 'white')
      .attr('stroke-width', 2)
      .style('opacity', 0.8)
      .on('mouseover', function() {
        d3.select(this).style('opacity', 1);
      })
      .on('mouseout', function() {
        d3.select(this).style('opacity', 0.8);
      });

    // Add percentage labels inside slices
    slices.append('text')
      .attr('transform', d => {
        const centroid = arc.centroid(d);
        return `translate(${centroid[0]},${centroid[1]})`;
      })
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .style('fill', 'white')
      .text(d => {
        const percentage = (d.data.value / d3.sum(data, d => d.value) * 100).toFixed(1);
        return percentage > 5 ? `${percentage}%` : '';
      });

    // Add polylines for labels
    slices.append('polyline')
      .attr('points', d => {
        const pos = outerArc.centroid(d);
        pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
        return [arc.centroid(d), outerArc.centroid(d), pos];
      })
      .style('fill', 'none')
      .style('stroke', d => color(d.data.label))
      .style('stroke-width', 1)
      .style('opacity', d => {
        const percentage = (d.data.value / d3.sum(data, d => d.value) * 100);
        return percentage > 3 ? 1 : 0;
      });

    // Add external labels
    slices.append('text')
      .attr('transform', d => {
        const pos = outerArc.centroid(d);
        pos[0] = radius * (midAngle(d) < Math.PI ? 1.1 : -1.1);
        return `translate(${pos[0]},${pos[1]})`;
      })
      .attr('text-anchor', d => midAngle(d) < Math.PI ? 'start' : 'end')
      .style('font-size', '12px')
      .style('opacity', d => {
        const percentage = (d.data.value / d3.sum(data, d => d.value) * 100);
        return percentage > 3 ? 1 : 0;
      })
      .text(d => `${d.data.label} (${d.data.value})`);

    // Helper function to calculate the middle angle of an arc
    function midAngle(d) {
      return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }

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
    slices.selectAll('path')
      .on('mouseover', function(event, d) {
        const percentage = (d.data.value / d3.sum(data, d => d.value) * 100).toFixed(1);
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip.html(`<strong>${d.data.label}</strong><br/>${d.data.value} substances<br/>${percentage}% of total`)
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

export default TechnicalEffectsChart; 