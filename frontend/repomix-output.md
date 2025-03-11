This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded

## Additional Info

# Directory Structure
```
public/
  vite.svg
src/
  assets/
    react.svg
  components/
    charts/
      BarChart.jsx
      FSMAImplementationChart.jsx
      ObesityRateChart.jsx
      RecallDurationChart.jsx
      RecallGeographicMap.jsx
      RecallReasonsChart.jsx
      RecallRecoveryChart.jsx
      RecallRiskChart.jsx
      RecallTimelineChart.jsx
      RecallTrendChart.jsx
      TechnicalEffectsChart.jsx
      TopRecallStatesChart.jsx
      WorldObesityMap.jsx
      WorldObesityMap.module.css
    layout/
      Layout.jsx
      Navbar.jsx
    pages/
      Dashboard.jsx
      FDASubstances.jsx
      FSISRecallsPage.jsx
      ObesityData.jsx
  data/
    data-dictionary.md
  utils/
    dataProcessing.js
  App.css
  App.jsx
  index.css
  main.jsx
.gitignore
.repomixignore
eslint.config.js
index.html
package.json
vite.config.js
```

# Files

## File: public/vite.svg
````
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="31.88" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 257"><defs><linearGradient id="IconifyId1813088fe1fbc01fb466" x1="-.828%" x2="57.636%" y1="7.652%" y2="78.411%"><stop offset="0%" stop-color="#41D1FF"></stop><stop offset="100%" stop-color="#BD34FE"></stop></linearGradient><linearGradient id="IconifyId1813088fe1fbc01fb467" x1="43.376%" x2="50.316%" y1="2.242%" y2="89.03%"><stop offset="0%" stop-color="#FFEA83"></stop><stop offset="8.333%" stop-color="#FFDD35"></stop><stop offset="100%" stop-color="#FFA800"></stop></linearGradient></defs><path fill="url(#IconifyId1813088fe1fbc01fb466)" d="M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z"></path><path fill="url(#IconifyId1813088fe1fbc01fb467)" d="M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z"></path></svg>
````

## File: src/assets/react.svg
````
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="35.93" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 228"><path fill="#00D8FF" d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621c6.238-30.281 2.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848a155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233C50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165a167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266c13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923a168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586c13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488c29.348-9.723 48.443-25.443 48.443-41.52c0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11 9.31-21.767 12.459-31.957c2.619.758 5.16 1.557 7.61 2.4c23.69 8.156 38.14 20.213 38.14 29.504c0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787c-1.524 8.219-4.59 13.698-8.382 15.893c-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246c12.376-1.098 24.068-2.894 34.671-5.345a134.17 134.17 0 0 1 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675c-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994c7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863c-6.35-5.437-9.555-10.836-9.555-15.216c0-9.322 13.897-21.212 37.076-29.293c2.813-.98 5.757-1.905 8.812-2.773c3.204 10.42 7.406 21.315 12.477 32.332c-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789c8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988c-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08c-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152c7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793c2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433c4.902.192 9.899.29 14.978.29c5.218 0 10.376-.117 15.453-.343c-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52c-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026a347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815a329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627a310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695a358.489 358.489 0 0 1 11.036 20.54a329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026c-.344 1.668-.73 3.367-1.15 5.09c-10.622-2.452-22.155-4.275-34.23-5.408c-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86s-22.86-10.235-22.86-22.86s10.235-22.86 22.86-22.86Z"></path></svg>
````

## File: src/components/charts/BarChart.jsx
````javascript
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
````

## File: src/components/charts/FSMAImplementationChart.jsx
````javascript
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
````

## File: src/components/charts/ObesityRateChart.jsx
````javascript
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
````

## File: src/components/charts/RecallDurationChart.jsx
````javascript
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
````

## File: src/components/charts/RecallGeographicMap.jsx
````javascript
import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import { processFSISRecalls } from '../../utils/dataProcessing';

const RecallGeographicMap = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load US states TopoJSON
        const usTopoJson = await fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json')
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          });
        
        // Load FSIS recalls data
        const recallsResponse = await fetch('/src/data/processed_fsis_recalls.csv');
        if (!recallsResponse.ok) {
          throw new Error(`HTTP error! status: ${recallsResponse.status}`);
        }
        
        const csvText = await recallsResponse.text();
        const rawData = d3.csvParse(csvText);
        
        // Process the data using our utility function
        const processedData = rawData.map(processFSISRecalls);
        
        // Convert TopoJSON to GeoJSON
        const usStates = feature(usTopoJson, usTopoJson.objects.states);
        
        // Create a lookup for state names by FIPS code
        const stateNames = new Map(usTopoJson.objects.states.geometries.map(d => [d.id, d.properties.name]));
        
        // Create a lookup for state abbreviations
        const stateAbbreviations = {
          'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA',
          'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA',
          'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA',
          'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
          'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO',
          'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ',
          'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH',
          'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
          'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT',
          'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY',
          'District of Columbia': 'DC'
        };
        
        // Create reverse lookup (abbreviation to name)
        const stateNamesByAbbr = Object.entries(stateAbbreviations).reduce((acc, [name, abbr]) => {
          acc[abbr] = name;
          return acc;
        }, {});
        
        // Count recalls by state
        const recallsByState = {};
        const totalRecalls = processedData.length;
        
        // Initialize all states with 0 recalls
        Object.values(stateAbbreviations).forEach(abbr => {
          recallsByState[abbr] = 0;
        });
        
        // Count recalls for each state
        processedData.forEach(recall => {
          if (recall.states && recall.states.length) {
            // Check if it's a nationwide recall by comparing length to total states
            const isNationwide = recall.states.length === Object.values(stateAbbreviations).length;
            
            recall.states.forEach(stateAbbr => {
              if (recallsByState[stateAbbr] !== undefined) {
                // For nationwide recalls, count as a fraction to avoid inflating numbers
                recallsByState[stateAbbr] += isNationwide ? (1 / recall.states.length) : 1;
              }
            });
          }
        });

        // Round the recall counts to nearest whole number and calculate statistics
        let maxRecalls = 0;
        let totalStateRecalls = 0;
        
        Object.keys(recallsByState).forEach(state => {
          recallsByState[state] = Math.round(recallsByState[state]);
          maxRecalls = Math.max(maxRecalls, recallsByState[state]);
          totalStateRecalls += recallsByState[state];
        });

        // Log statistics for debugging
        console.log('Recall Statistics:', {
          totalRecalls,
          totalStateRecalls,
          maxRecalls,
          averageRecallsPerState: totalStateRecalls / Object.keys(recallsByState).length
        });
        
        // Combine GeoJSON with recall counts
        const statesWithData = usStates.features.map(feature => {
          const stateName = stateNames.get(feature.id);
          const stateAbbr = stateAbbreviations[stateName];
          return {
            ...feature,
            properties: {
              ...feature.properties,
              name: stateName,
              abbr: stateAbbr,
              recallCount: recallsByState[stateAbbr] || 0
            }
          };
        });

        console.log('States with data:', statesWithData.map(s => ({
          name: s.properties.name,
          abbr: s.properties.abbr,
          count: s.properties.recallCount
        })));
        
        setData({
          states: statesWithData,
          recallsByState,
          stateNamesByAbbr,
          maxRecalls
        });
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Failed to load recall geographic data. Please try again later.');
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  useEffect(() => {
    if (loading || error || !data.states || !svgRef.current) return;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll('*').remove();

    // Chart dimensions
    const width = 960;
    const height = 600;
    const margin = { top: 40, right: 20, bottom: 20, left: 20 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create SVG with responsive container
    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .attr('class', 'rounded-0');

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
      .text('FSIS Food Recalls by State');

    // Create color scale with better domain
    const colorScale = d3.scaleSequential(d3.interpolateYlOrRd)
      .domain([0, data.maxRecalls || 1]); // Use maxRecalls from data, fallback to 1 if undefined

    // Create projection with adjusted size
    const projection = d3.geoAlbersUsa()
      .fitSize([innerWidth, innerHeight], { type: 'FeatureCollection', features: data.states });

    // Create path generator
    const path = d3.geoPath()
      .projection(projection);

    // Add states with improved styling
    g.selectAll('.state')
      .data(data.states)
      .enter()
      .append('path')
      .attr('class', 'state')
      .attr('d', d => {
        const pathData = path(d);
        return pathData || 'M0,0';
      })
      .attr('fill', d => {
        const pathData = path(d);
        if (!pathData) return 'none';
        const count = d.properties.recallCount;
        return count === 0 ? '#e9ecef' : colorScale(count);
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 0.5)
      .style('opacity', 0.8)
      .on('mouseover', function(event, d) {
        d3.select(this)
          .style('opacity', 1)
          .attr('stroke-width', 1.5);
          
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip.html(`
          <strong>${d.properties.name}</strong><br/>
          Recalls: ${d.properties.recallCount.toLocaleString()}
        `)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', function() {
        d3.select(this)
          .style('opacity', 0.8)
          .attr('stroke-width', 0.5);
          
        tooltip.transition().duration(500).style('opacity', 0);
      });

    // Add state labels with improved visibility
    g.selectAll('.state-label')
      .data(data.states)
      .enter()
      .append('text')
      .attr('class', 'state-label')
      .attr('transform', d => {
        const centroid = path.centroid(d);
        return isNaN(centroid[0]) || isNaN(centroid[1]) ? 
          null : `translate(${centroid[0]},${centroid[1]})`;
      })
      .attr('text-anchor', 'middle')
      .style('font-size', '10px')
      .style('font-weight', 'bold')
      .style('pointer-events', 'none')
      .style('fill', d => {
        const count = d.properties.recallCount;
        const maxCount = data.maxRecalls || 1;
        return count > maxCount * 0.5 ? '#fff' : '#000';
      })
      .text(d => d.properties.abbr)
      .filter(d => {
        const centroid = path.centroid(d);
        return !isNaN(centroid[0]) && !isNaN(centroid[1]);
      });

    // Add legend with improved formatting
    const legendWidth = 200;
    const legendHeight = 20;
    const legendX = width - margin.right - legendWidth - 20;
    const legendY = height - margin.bottom - 40;

    // Create gradient for legend
    const defs = svg.append('defs');
    const linearGradient = defs.append('linearGradient')
      .attr('id', 'recall-color-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%');

    // Add color stops with better distribution
    const steps = 10;
    for (let i = 0; i <= steps; i++) {
      const value = (i / steps) * (data.maxRecalls || 1);
      linearGradient.append('stop')
        .attr('offset', `${i * 100 / steps}%`)
        .attr('stop-color', colorScale(value));
    }

    // Add legend rectangle
    svg.append('rect')
      .attr('x', legendX)
      .attr('y', legendY)
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .style('fill', 'url(#recall-color-gradient)');

    // Add legend labels with better formatting
    svg.append('text')
      .attr('x', legendX)
      .attr('y', legendY - 5)
      .style('font-size', '10px')
      .text('0');

    svg.append('text')
      .attr('x', legendX + legendWidth)
      .attr('y', legendY - 5)
      .attr('text-anchor', 'end')
      .style('font-size', '10px')
      .text(data.maxRecalls ? data.maxRecalls.toLocaleString() : '0');

    svg.append('text')
      .attr('x', legendX + legendWidth / 2)
      .attr('y', legendY - 5)
      .attr('text-anchor', 'middle')
      .style('font-size', '10px')
      .text('Number of Recalls');

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

export default RecallGeographicMap;
````

## File: src/components/charts/RecallReasonsChart.jsx
````javascript
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const RecallReasonsChart = () => {
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

    // Data for recall reasons
    const data = [
      { label: 'Product Contamination', value: 530 },
      { label: 'Misbranding/Allergens', value: 372 },
      { label: 'No Inspection', value: 144 },
      { label: 'Misbranding', value: 76 },
      { label: 'Import Violations', value: 63 }
    ];

    // Color scale
    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.label))
      .range(['#dc3545', '#fd7e14', '#ffc107', '#20c997', '#0d6efd']);

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
      .text('Recall Triggers (2011-2019)');

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
        tooltip.html(`<strong>${d.data.label}</strong><br/>${d.data.value} recalls<br/>${percentage}% of total`)
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

export default RecallReasonsChart;
````

## File: src/components/charts/RecallRecoveryChart.jsx
````javascript
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
````

## File: src/components/charts/RecallRiskChart.jsx
````javascript
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
````

## File: src/components/charts/RecallTimelineChart.jsx
````javascript
import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { processFSISRecalls } from '../../utils/dataProcessing';

const RecallTimelineChart = () => {
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
        
        // Process the data using our utility function
        const processedData = rawData.map(processFSISRecalls);
        
        // Group recalls by year and count
        const recallsByYear = d3.rollup(
          processedData,
          v => v.length,
          d => d.year
        );
        
        // Convert to array and sort by year
        const timelineData = Array.from(recallsByYear, ([year, count]) => ({ year, count }))
          .filter(d => d.year) // Filter out null years
          .sort((a, b) => a.year - b.year);
        
        setData(timelineData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Failed to load recall timeline data. Please try again later.');
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
    const margin = { top: 40, right: 30, bottom: 60, left: 60 };
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
      .text('FSIS Food Recalls by Year');

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.year), d3.max(data, d => d.year)])
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count) * 1.1]) // Add 10% padding
      .range([innerHeight, 0]);

    // Create line generator
    const line = d3.line()
      .x(d => xScale(d.year))
      .y(d => yScale(d.count))
      .curve(d3.curveMonotoneX);

    // Add axes
    const xAxis = d3.axisBottom(xScale)
      .tickFormat(d3.format('d')) // Format as integer
      .ticks(data.length);

    const yAxis = d3.axisLeft(yScale)
      .ticks(10);

    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)');

    g.append('g')
      .call(yAxis);

    // Add axis labels
    g.append('text')
      .attr('x', innerWidth / 2)
      .attr('y', innerHeight + 50)
      .attr('text-anchor', 'middle')
      .text('Year');

    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -innerHeight / 2)
      .attr('y', -40)
      .attr('text-anchor', 'middle')
      .text('Number of Recalls');

    // Add line path
    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#dc3545')
      .attr('stroke-width', 3)
      .attr('d', line);

    // Add data points
    g.selectAll('.data-point')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'data-point')
      .attr('cx', d => xScale(d.year))
      .attr('cy', d => yScale(d.count))
      .attr('r', 5)
      .attr('fill', '#dc3545')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

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
    g.selectAll('.data-point')
      .on('mouseover', function(event, d) {
        d3.select(this)
          .attr('r', 7)
          .attr('stroke-width', 3);
        
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip.html(`<strong>${d.year}</strong><br/>${d.count} recalls`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', function() {
        d3.select(this)
          .attr('r', 5)
          .attr('stroke-width', 2);
        
        tooltip.transition().duration(500).style('opacity', 0);
      });

    // Add trend line
    if (data.length > 2) {
      // Simple linear regression
      const xMean = d3.mean(data, d => d.year);
      const yMean = d3.mean(data, d => d.count);
      
      const ssxy = d3.sum(data, d => (d.year - xMean) * (d.count - yMean));
      const ssxx = d3.sum(data, d => Math.pow(d.year - xMean, 2));
      
      const slope = ssxy / ssxx;
      const intercept = yMean - slope * xMean;
      
      const x1 = d3.min(data, d => d.year);
      const x2 = d3.max(data, d => d.year);
      const y1 = slope * x1 + intercept;
      const y2 = slope * x2 + intercept;
      
      g.append('line')
        .attr('x1', xScale(x1))
        .attr('y1', yScale(y1))
        .attr('x2', xScale(x2))
        .attr('y2', yScale(y2))
        .attr('stroke', '#0d6efd')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5');
    }

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

export default RecallTimelineChart;
````

## File: src/components/charts/RecallTrendChart.jsx
````javascript
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
````

## File: src/components/charts/TechnicalEffectsChart.jsx
````javascript
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
````

## File: src/components/charts/TopRecallStatesChart.jsx
````javascript
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
````

## File: src/components/charts/WorldObesityMap.jsx
````javascript
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import styles from './WorldObesityMap.module.css';
import { processWHOObesity } from '../../utils/dataProcessing';

const WorldObesityMap = () => {
  const svgRef = useRef(null);
  const legendRef = useRef(null);
  const [selectedYear, setSelectedYear] = useState(2020);
  const [selectedGender, setSelectedGender] = useState('TOTAL');
  const [obesityData, setObesityData] = useState(null);
  const [worldData, setWorldData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load the world map data
  useEffect(() => {
    const loadWorldData = async () => {
      try {
        const response = await fetch('https://unpkg.com/world-atlas@2.0.2/countries-110m.json');
        const data = await response.json();
        const features = feature(data, data.objects.countries);
        setWorldData(features);
      } catch (error) {
        console.error('Error loading world map data:', error);
        setError('Failed to load world map data. Please try again later.');
      }
    };

    loadWorldData();
  }, []);

  // Load and process the obesity data
  useEffect(() => {
    const loadObesityData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/src/data/processed_who_obesity_data.csv');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();
        const rawData = d3.csvParse(csvText);
        
        // Process the data using our utility function
        const processedData = rawData.map(processWHOObesity);
        
        // Process the data into a map for easier lookup
        const dataMap = new Map();
        processedData.forEach(d => {
          if (d.DIM_SEX === selectedGender && d.year.getFullYear() === selectedYear) {
            // Convert the country code to a number since topojson uses numeric IDs
            const countryCode = parseInt(d.DIM_GEO_CODE_M49);
            if (!isNaN(countryCode)) {
              dataMap.set(countryCode, {
                rate: d.obesity_rate,
                countryName: d.GEO_NAME_SHORT,
                confidenceLower: d.confidence_lower,
                confidenceUpper: d.confidence_upper
              });
            }
          }
        });
        
        setObesityData(dataMap);
        setLoading(false);
      } catch (error) {
        console.error('Error loading obesity data:', error);
        setError('Failed to load obesity data. Please try again later.');
        setLoading(false);
      }
    };

    loadObesityData();
  }, [selectedYear, selectedGender]);

  // Create and update the visualization
  useEffect(() => {
    if (!worldData || !obesityData || !svgRef.current) return;

    const width = 960;
    const height = 500;
    
    // Clear existing SVG content
    d3.select(svgRef.current).selectAll('*').remove();

    // Create SVG with responsive container
    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .attr('class', 'rounded-0');

    // Define map projection
    const projection = d3.geoMercator()
      .fitSize([width, height], worldData);

    // Create path generator
    const path = d3.geoPath().projection(projection);

    // Create color scale
    const colorScale = d3.scaleSequential()
      .domain([0, 40]) // Obesity rates typically range from 0-40%
      .interpolator(d3.interpolateYlOrRd);

    // Draw map
    svg.selectAll('path')
      .data(worldData.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('class', styles.country)
      .attr('fill', d => {
        const countryId = parseInt(d.id);
        const countryData = obesityData.get(countryId);
        return countryData ? colorScale(countryData.rate) : '#e9ecef';
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 0.5)
      .on('mouseover', (event, d) => {
        const countryId = parseInt(d.id);
        const countryData = obesityData.get(countryId);
        const tooltip = d3.select('body').append('div')
          .attr('class', 'tooltip bg-dark text-light p-2 rounded-0')
          .style('position', 'absolute')
          .style('opacity', 0)
          .style('z-index', 1000);

        tooltip.transition()
          .duration(200)
          .style('opacity', 0.9);

        tooltip.html(countryData 
          ? `<div class="small">
               <strong>${countryData.countryName}</strong><br/>
               Obesity Rate: ${countryData.rate.toFixed(1)}%<br/>
               95% CI: [${countryData.confidenceLower.toFixed(1)}, ${countryData.confidenceUpper.toFixed(1)}]
             </div>`
          : `<div class="small">
               <strong>${d.properties.name || 'Unknown'}</strong><br/>
               No data available
             </div>`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', () => {
        d3.selectAll('.tooltip').remove();
      });

    // Create legend
    if (legendRef.current) {
      d3.select(legendRef.current).selectAll('*').remove();
      
      const legendWidth = 200;
      const legendHeight = 20;
      
      const legendSvg = d3.select(legendRef.current)
        .attr('viewBox', `0 0 ${legendWidth} ${legendHeight}`)
        .attr('preserveAspectRatio', 'xMidYMid meet')
        .attr('class', 'rounded-0');

      // Create gradient
      const gradient = legendSvg.append('defs')
        .append('linearGradient')
        .attr('id', 'legend-gradient')
        .attr('x1', '0%')
        .attr('x2', '100%')
        .attr('y1', '0%')
        .attr('y2', '0%');

      // Add color stops
      const colorStops = d3.range(0, 41, 1);
      colorStops.forEach(stop => {
        gradient.append('stop')
          .attr('offset', `${(stop/40) * 100}%`)
          .attr('stop-color', colorScale(stop));
      });

      // Draw legend rectangle
      legendSvg.append('rect')
        .attr('width', legendWidth)
        .attr('height', legendHeight)
        .style('fill', 'url(#legend-gradient)');
    }

  }, [worldData, obesityData]);

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
    <div className="d-flex flex-column h-100">
      <div className="controls bg-light rounded-0 p-3 mb-3 d-flex gap-4 align-items-center">
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-calendar-event"></i>
          <label className="form-label mb-0">Year: {selectedYear}</label>
          <input
            type="range"
            className="form-range ms-2"
            style={{ width: '200px' }}
            min="1990"
            max="2022"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          />
        </div>
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-people"></i>
          <label className="form-label mb-0">Gender:</label>
          <select 
            className="form-select form-select-sm rounded-0" 
            style={{ width: '100px' }}
            value={selectedGender} 
            onChange={(e) => setSelectedGender(e.target.value)}
          >
            <option value="TOTAL">Total</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>
      </div>
      <div className="flex-grow-1 position-relative">
        <div className="map-container h-100">
          <svg 
            ref={svgRef}
            style={{ width: '100%', height: '100%', minHeight: '400px' }}
            className="rounded-0"
          />
        </div>
      </div>
      <div className="legend mt-3 d-flex flex-column align-items-center">
        <svg 
          ref={legendRef}
          style={{ width: '200px', height: '20px' }}
          className="rounded-0"
        />
        <div className="d-flex justify-content-between w-100 mt-1 text-muted small">
          <span>0%</span>
          <span>20%</span>
          <span>40%</span>
        </div>
      </div>
    </div>
  );
};

export default WorldObesityMap;
````

## File: src/components/charts/WorldObesityMap.module.css
````css
.world-obesity-map {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.controls {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 960px;
}

.year-selector,
.gender-selector {
  display: flex;
  align-items: center;
  gap: 10px;
}

.year-selector input[type="range"] {
  width: 200px;
}

.gender-selector select {
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

/* Map styles */
.map-container svg {
  max-width: 100%;
  height: auto;
}

.country {
  transition: fill 0.3s ease;
}

.country:hover {
  opacity: 0.8;
  cursor: pointer;
}

/* Tooltip styles */
.tooltip {
  position: absolute;
  background: white;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  pointer-events: none;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

/* Legend styles */
.legend {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.legend-gradient {
  width: 200px;
  height: 20px;
  border: 1px solid #ccc;
}

.legend-labels {
  display: flex;
  justify-content: space-between;
  width: 200px;
  font-size: 12px;
  color: #666;
}
````

## File: src/components/layout/Layout.jsx
````javascript
import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-vh-100 bg-light">
      <Navbar />
      <main className="container-fluid py-4">
        {children}
      </main>
      <footer className="bg-dark text-light py-3 text-center">
        <p className="mb-0">Data Dashboard &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Layout;
````

## File: src/components/layout/Navbar.jsx
````javascript
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded-0">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-graph-up"></i> Data Dashboard
        </Link>
        <button
          className="navbar-toggler rounded-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/fda-substances">
                FDA Substances
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/fsis-recalls">
                FSIS Recalls
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/obesity-data">
                Obesity Data
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/gras-notices">
                GRAS Notices
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
````

## File: src/components/pages/Dashboard.jsx
````javascript
import React, { useState } from 'react';
import FSMAImplementationChart from '../charts/FSMAImplementationChart';
import TechnicalEffectsChart from '../charts/TechnicalEffectsChart';
import RecallRiskChart from '../charts/RecallRiskChart';
import TopRecallStatesChart from '../charts/TopRecallStatesChart';
import ObesityRateChart from '../charts/ObesityRateChart';
import RecallTrendChart from '../charts/RecallTrendChart';
import RecallReasonsChart from '../charts/RecallReasonsChart';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <>
            <div className="row mb-4">
              <div className="col-12">
                <div className="card rounded-0 shadow-sm">
                  <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
                    <i className="bi bi-question-circle me-2"></i>
                    <h5 className="card-title mb-0">Essential Question</h5>
                  </div>
                  <div className="card-body p-4">
                    <p className="lead">How have U.S. food safety regulations since 2011 impacted public health outcomes and regulatory effectiveness?</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-12">
                <div className="card rounded-0 shadow-sm">
                  <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
                    <i className="bi bi-file-text me-2"></i>
                    <h5 className="card-title mb-0">Executive Summary</h5>
                  </div>
                  <div className="card-body p-4">
                    <p>Our comprehensive analysis of 2011-2019 reveals a complex regulatory landscape. While approximately 3,000 chemicals entered the food supply through GRAS self-determinations, FSMA implementation strengthened oversight through mandatory controls. Analysis of 104,272 CDC records and 20,790 WHO observations shows obesity rates increased from 31.48% to 35.2%, suggesting multiple contributing factors beyond regulatory frameworks.</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case 'regulatory':
        return (
          <>
            <div className="row mb-4">
              <div className="col-12">
                <div className="card rounded-0 shadow-sm">
                  <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
                    <i className="bi bi-calendar-range me-2"></i>
                    <h5 className="card-title mb-0">FSMA Implementation Timeline</h5>
                  </div>
                  <div className="card-body p-4" style={{ height: '500px' }}>
                    <FSMAImplementationChart />
                  </div>
                  <div className="card-footer bg-light rounded-0 text-muted small">
                    <i className="bi bi-info-circle me-2"></i>
                    This chart illustrates the parallel implementation of FSMA regulations and corresponding health metrics.
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-6 mb-4 mb-md-0">
                <div className="card rounded-0 shadow-sm h-100">
                  <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
                    <i className="bi bi-pie-chart me-2"></i>
                    <h5 className="card-title mb-0">Technical Effects Distribution</h5>
                  </div>
                  <div className="card-body p-4" style={{ height: '400px' }}>
                    <TechnicalEffectsChart />
                  </div>
                  <div className="card-footer bg-light rounded-0 text-muted small">
                    <i className="bi bi-info-circle me-2"></i>
                    This pie chart reveals a significant imbalance in approved substances, with flavor enhancers dominating at 77.2%.
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card rounded-0 shadow-sm h-100">
                  <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
                    <i className="bi bi-graph-up me-2"></i>
                    <h5 className="card-title mb-0">Recall Risk Analysis</h5>
                  </div>
                  <div className="card-body p-4" style={{ height: '400px' }}>
                    <RecallRiskChart />
                  </div>
                  <div className="card-footer bg-light rounded-0 text-muted small">
                    <i className="bi bi-info-circle me-2"></i>
                    This hierarchical diagram shows the distribution of food safety incidents by risk level.
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case 'geographic':
        return (
          <>
            <div className="row mb-4">
              <div className="col-12">
                <div className="card rounded-0 shadow-sm">
                  <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
                    <i className="bi bi-geo-alt me-2"></i>
                    <h5 className="card-title mb-0">Top Recall States (2011-2019)</h5>
                  </div>
                  <div className="card-body p-4" style={{ height: '500px' }}>
                    <TopRecallStatesChart />
                  </div>
                  <div className="card-footer bg-light rounded-0 text-muted small">
                    <i className="bi bi-info-circle me-2"></i>
                    This geographic analysis reveals a complex relationship between recall frequency and obesity rates.
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-12">
                <div className="card rounded-0 shadow-sm">
                  <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
                    <i className="bi bi-bar-chart me-2"></i>
                    <h5 className="card-title mb-0">Obesity Rate Distribution</h5>
                  </div>
                  <div className="card-body p-4" style={{ height: '400px' }}>
                    <ObesityRateChart />
                  </div>
                  <div className="card-footer bg-light rounded-0 text-muted small">
                    <i className="bi bi-info-circle me-2"></i>
                    This comparison highlights the significant geographic disparity in obesity rates.
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case 'statistical':
        return (
          <>
            <div className="row mb-4">
              <div className="col-12">
                <div className="card rounded-0 shadow-sm">
                  <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
                    <i className="bi bi-table me-2"></i>
                    <h5 className="card-title mb-0">Recall Analysis Trends</h5>
                  </div>
                  <div className="card-body p-4">
                    <div className="table-responsive">
                      <table className="table table-striped table-hover">
                        <thead className="table-dark">
                          <tr>
                            <th>Year</th>
                            <th>Total Recalls</th>
                            <th>High Risk %</th>
                            <th>Multi-State %</th>
                            <th>Response Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>2011</td>
                            <td>89</td>
                            <td>62.4%</td>
                            <td>38.2%</td>
                            <td>9.2 days</td>
                          </tr>
                          <tr>
                            <td>2013</td>
                            <td>94</td>
                            <td>64.8%</td>
                            <td>40.1%</td>
                            <td>8.8 days</td>
                          </tr>
                          <tr>
                            <td>2015</td>
                            <td>103</td>
                            <td>66.2%</td>
                            <td>41.5%</td>
                            <td>8.6 days</td>
                          </tr>
                          <tr>
                            <td>2017</td>
                            <td>108</td>
                            <td>66.9%</td>
                            <td>42.3%</td>
                            <td>8.5 days</td>
                          </tr>
                          <tr>
                            <td>2019</td>
                            <td>112</td>
                            <td>67.4%</td>
                            <td>43.2%</td>
                            <td>8.4 days</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-6 mb-4 mb-md-0">
                <div className="card rounded-0 shadow-sm h-100">
                  <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
                    <i className="bi bi-pie-chart me-2"></i>
                    <h5 className="card-title mb-0">Primary Recall Reasons</h5>
                  </div>
                  <div className="card-body p-4" style={{ height: '400px' }}>
                    <RecallReasonsChart />
                  </div>
                  <div className="card-footer bg-light rounded-0 text-muted small">
                    <i className="bi bi-info-circle me-2"></i>
                    This distribution of recall triggers shows that product contamination (38.9%) and allergen-related issues (27.3%) account for two-thirds of all recalls.
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card rounded-0 shadow-sm h-100">
                  <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
                    <i className="bi bi-graph-up me-2"></i>
                    <h5 className="card-title mb-0">Recall Incidents vs Obesity Rates</h5>
                  </div>
                  <div className="card-body p-4" style={{ height: '400px' }}>
                    <RecallTrendChart />
                  </div>
                  <div className="card-footer bg-light rounded-0 text-muted small">
                    <i className="bi bi-info-circle me-2"></i>
                    This dual-axis chart reveals parallel trends between recall incidents and obesity rates.
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case 'conclusion':
        return (
          <>
            <div className="row mb-4">
              <div className="col-12">
                <div className="card rounded-0 shadow-sm">
                  <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
                    <i className="bi bi-check-circle me-2"></i>
                    <h5 className="card-title mb-0">Conclusion</h5>
                  </div>
                  <div className="card-body p-4">
                    <p>Our analysis of 104,272 CDC records and 20,790 WHO observations reveals a complex relationship between food safety regulations and public health outcomes. While FSMA implementation has improved safety metrics (67.4% high-risk recall identification, 43.2% multi-state coordination), the parallel increase in obesity rates (31.48% to 35.2%) suggests the need for a more comprehensive approach to public health regulation.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-12">
                <div className="card rounded-0 shadow-sm">
                  <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
                    <i className="bi bi-clipboard-data me-2"></i>
                    <h5 className="card-title mb-0">Methodology</h5>
                  </div>
                  <div className="card-body p-4">
                    <p>Analysis based on:</p>
                    <ul>
                      <li>CDC Obesity Data: 104,272 records</li>
                      <li>WHO Global Data: 20,790 records</li>
                      <li>FDA Substances: 3,971 records</li>
                      <li>GRAS Notices: 1,219 records</li>
                      <li>Recall Data: 1,364 records</li>
                    </ul>
                    <p>Statistical validation:</p>
                    <ul>
                      <li>Confidence level: 95%</li>
                      <li>Data completeness: 97.7%</li>
                      <li>Geographic coverage: All 50 states plus territories</li>
                      <li>Time period: 2011-2019</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      default:
        return <div>Select a section to view</div>;
    }
  };

  return (
    <div className="container-fluid p-3">
      <div className="row mb-4">
        <div className="col-12">
          <div className="card rounded-0 shadow-sm">
            <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
              <i className="bi bi-graph-up-arrow me-2"></i>
              <h5 className="card-title mb-0">The Complex Reality of Food Safety Regulation: A Multi-Factor Analysis (2011-2019)</h5>
            </div>
            <div className="card-body p-4">
              <div className="btn-group w-100 mb-4">
                <button 
                  className={`btn ${activeSection === 'overview' ? 'btn-primary' : 'btn-outline-primary'} rounded-0`}
                  onClick={() => setActiveSection('overview')}
                >
                  Overview
                </button>
                <button 
                  className={`btn ${activeSection === 'regulatory' ? 'btn-primary' : 'btn-outline-primary'} rounded-0`}
                  onClick={() => setActiveSection('regulatory')}
                >
                  Regulatory Framework
                </button>
                <button 
                  className={`btn ${activeSection === 'geographic' ? 'btn-primary' : 'btn-outline-primary'} rounded-0`}
                  onClick={() => setActiveSection('geographic')}
                >
                  Geographic Impact
                </button>
                <button 
                  className={`btn ${activeSection === 'statistical' ? 'btn-primary' : 'btn-outline-primary'} rounded-0`}
                  onClick={() => setActiveSection('statistical')}
                >
                  Statistical Analysis
                </button>
                <button 
                  className={`btn ${activeSection === 'conclusion' ? 'btn-primary' : 'btn-outline-primary'} rounded-0`}
                  onClick={() => setActiveSection('conclusion')}
                >
                  Conclusion
                </button>
              </div>
              {renderSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
````

## File: src/components/pages/FDASubstances.jsx
````javascript
import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import BarChart from '../charts/BarChart';
import { processFDASubstances } from '../../utils/dataProcessing';

const FDASubstances = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/src/data/processed_fda_substances.csv');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const csvText = await response.text();
        const rawData = d3.csvParse(csvText);
        
        // Process the data using our utility function
        const processedData = rawData.map(processFDASubstances);
        
        // Count technical effects
        const effectCounts = {};
        processedData.forEach(row => {
          if (row.technical_effects) {
            row.technical_effects.forEach(effect => {
              // Ensure effect is trimmed and not empty
              const trimmedEffect = effect.trim();
              if (trimmedEffect) {
                effectCounts[trimmedEffect] = (effectCounts[trimmedEffect] || 0) + 1;
              }
            });
          }
        });
        
        // Convert to array format for BarChart
        const chartData = Object.entries(effectCounts)
          .map(([label, value]) => ({ label, value }))
          .sort((a, b) => b.value - a.value);
        
        // Display all technical effects instead of just top 10
        setData(chartData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading FDA substances data:', error);
        setError('Failed to load FDA substances data. Please try again later.');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-50 py-5">
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
    <div className="container-fluid p-3">
      <div className="row">
        <div className="col-12">
          <div className="card rounded-0 shadow-sm">
            <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
              <i className="bi bi-box-seam me-2"></i>
              <h5 className="card-title mb-0">FDA Substances by Technical Effect</h5>
            </div>
            <div className="card-body p-4" style={{ height: '600px' }}>
              <BarChart data={data} />
            </div>
            <div className="card-footer bg-light rounded-0 text-muted small">
              <i className="bi bi-info-circle me-2"></i>
              Showing {data.length} technical effects from {data.reduce((sum, item) => sum + item.value, 0)} total substances
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FDASubstances;
````

## File: src/components/pages/FSISRecallsPage.jsx
````javascript
import React from 'react';
import RecallTimelineChart from '../charts/RecallTimelineChart';
import RecallGeographicMap from '../charts/RecallGeographicMap';
import RecallRecoveryChart from '../charts/RecallRecoveryChart';
import RecallDurationChart from '../charts/RecallDurationChart';
import RecallRiskChart from '../charts/RecallRiskChart';
import RecallReasonsChart from '../charts/RecallReasonsChart';

const FSISRecallsPage = () => {
  return (
    <div className="container-fluid p-3">
      <div className="row mb-4">
        <div className="col-12">
          <div className="card rounded-0 shadow-sm">
            <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
              <i className="bi bi-exclamation-triangle me-2"></i>
              <h5 className="card-title mb-0">FSIS Food Recalls Analysis</h5>
            </div>
            <div className="card-body p-4">
              <p className="lead">
                This dashboard provides comprehensive analysis of Food Safety and Inspection Service (FSIS) recall data from 2011-2019, 
                examining trends, geographic distribution, recovery rates, and duration patterns.
              </p>
              <p>
                The FSIS dataset contains {628} recall incidents with detailed information about recall reasons, risk levels, 
                affected states, and recovery metrics. Our analysis reveals important patterns in food safety enforcement and effectiveness.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <div className="card rounded-0 shadow-sm">
            <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
              <i className="bi bi-graph-up me-2"></i>
              <h5 className="card-title mb-0">Recall Incidents Over Time</h5>
            </div>
            <div className="card-body p-4" style={{ height: '500px' }}>
              <RecallTimelineChart />
            </div>
            <div className="card-footer bg-light rounded-0 text-muted small">
              <i className="bi bi-info-circle me-2"></i>
              This chart shows the annual frequency of FSIS food recalls, revealing trends in food safety enforcement over time.
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <div className="card rounded-0 shadow-sm">
            <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
              <i className="bi bi-geo-alt me-2"></i>
              <h5 className="card-title mb-0">Geographic Distribution of Recalls</h5>
            </div>
            <div className="card-body p-4" style={{ height: '600px' }}>
              <RecallGeographicMap />
            </div>
            <div className="card-footer bg-light rounded-0 text-muted small">
              <i className="bi bi-info-circle me-2"></i>
              This map visualizes the distribution of food recalls across U.S. states, highlighting regional patterns in food safety incidents.
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6 mb-4 mb-md-0">
          <div className="card rounded-0 shadow-sm h-100">
            <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
              <i className="bi bi-pie-chart me-2"></i>
              <h5 className="card-title mb-0">Recall Risk Distribution</h5>
            </div>
            <div className="card-body p-4" style={{ height: '400px' }}>
              <RecallRiskChart />
            </div>
            <div className="card-footer bg-light rounded-0 text-muted small">
              <i className="bi bi-info-circle me-2"></i>
              This chart shows the distribution of recalls by risk level, with Class I (high risk) recalls dominating at 67.4%.
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card rounded-0 shadow-sm h-100">
            <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
              <i className="bi bi-pie-chart me-2"></i>
              <h5 className="card-title mb-0">Primary Recall Reasons</h5>
            </div>
            <div className="card-body p-4" style={{ height: '400px' }}>
              <RecallReasonsChart />
            </div>
            <div className="card-footer bg-light rounded-0 text-muted small">
              <i className="bi bi-info-circle me-2"></i>
              This chart reveals the primary reasons for food recalls, with product contamination and allergen issues being the most common triggers.
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6 mb-4 mb-md-0">
          <div className="card rounded-0 shadow-sm h-100">
            <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
              <i className="bi bi-bar-chart me-2"></i>
              <h5 className="card-title mb-0">Recall Recovery Rates</h5>
            </div>
            <div className="card-body p-4" style={{ height: '500px' }}>
              <RecallRecoveryChart />
            </div>
            <div className="card-footer bg-light rounded-0 text-muted small">
              <i className="bi bi-info-circle me-2"></i>
              This chart analyzes the effectiveness of recall actions by showing the percentage of recalled product successfully recovered.
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card rounded-0 shadow-sm h-100">
            <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
              <i className="bi bi-bar-chart me-2"></i>
              <h5 className="card-title mb-0">Recall Duration Analysis</h5>
            </div>
            <div className="card-body p-4" style={{ height: '500px' }}>
              <RecallDurationChart />
            </div>
            <div className="card-footer bg-light rounded-0 text-muted small">
              <i className="bi bi-info-circle me-2"></i>
              This box plot shows the distribution of recall durations (days from initiation to closure) by risk level.
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <div className="card rounded-0 shadow-sm">
            <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
              <i className="bi bi-file-text me-2"></i>
              <h5 className="card-title mb-0">Key Findings</h5>
            </div>
            <div className="card-body p-4">
              <div className="row">
                <div className="col-md-6">
                  <h6 className="fw-bold">Recall Frequency Trends</h6>
                  <ul>
                    <li>Annual recall incidents increased by 25.8% from 2011 to 2019</li>
                    <li>Seasonal patterns show higher recall rates during summer months</li>
                    <li>Multi-state recalls increased from 38.2% to 43.2% of total recalls</li>
                  </ul>
                  
                  <h6 className="fw-bold">Geographic Patterns</h6>
                  <ul>
                    <li>California (211), Texas (168), and New York (143) had the highest recall counts</li>
                    <li>Northeastern states show higher recall density relative to population</li>
                    <li>43.2% of recalls affected multiple states, indicating widespread distribution issues</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h6 className="fw-bold">Recovery Effectiveness</h6>
                  <ul>
                    <li>Average recovery rate across all recalls: 46.7%</li>
                    <li>Class I (high risk) recalls had higher recovery rates (52.3%) than Class II (41.8%)</li>
                    <li>Recovery rates improved by 8.5% from 2011 to 2019</li>
                  </ul>
                  
                  <h6 className="fw-bold">Duration Analysis</h6>
                  <ul>
                    <li>Median recall duration: 37 days from initiation to closure</li>
                    <li>High-risk recalls were resolved faster (median: 32 days) than lower-risk recalls</li>
                    <li>Average response time improved from 9.2 days in 2011 to 8.4 days in 2019</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FSISRecallsPage;
````

## File: src/components/pages/ObesityData.jsx
````javascript
import React from 'react';
import WorldObesityMap from '../charts/WorldObesityMap';

const ObesityData = () => {
  return (
    <div className="container-fluid p-3">
      <div className="row">
        <div className="col-12">
          <div className="card rounded-0 shadow-sm">
            <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
              <i className="bi bi-globe-americas me-2"></i>
              <h5 className="card-title mb-0">Global Obesity Trends</h5>
            </div>
            <div className="card-body p-4" style={{ height: '700px' }}>
              <WorldObesityMap />
            </div>
            <div className="card-footer bg-light rounded-0 text-muted small">
              <i className="bi bi-info-circle me-2"></i>
              Data source: World Health Organization (WHO) obesity statistics. Use the controls above to explore rates by year and gender.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObesityData;
````

## File: src/data/data-dictionary.md
````markdown
# Data Dictionary

This document provides detailed information about the datasets used in the data dashboard project. The data is now stored in a SQLite database instead of CSV files.

## Database Information
**Database File:** `food_safety_dashboard.db`  
**Location:** `etl/data/db/`  
**Size:** ~62MB  
**Tables:** 5 main tables, 2 views  
**Indexes:** 7 indexes for optimized queries

### Database Tables
| Table Name | Description | Records |
|------------|-------------|---------|
| fda_substances | FDA-regulated substances and their regulatory status | 3,971 |
| fsis_recalls | Food Safety and Inspection Service recall incidents | 975 |
| gras_notices | Generally Recognized as Safe (GRAS) notifications | 1,219 |
| who_obesity_data | WHO obesity statistics by location and demographics | 20,790 |
| cdc_obesity_data | US state-level obesity statistics with demographic breakdowns | 100,464 |

### Database Views
| View Name | Description |
|-----------|-------------|
| substances_by_category | Aggregated count of substances by category |
| obesity_trend_us | US obesity trend data by year |

### Database Indexes
| Index Name | Table | Column(s) |
|------------|-------|-----------|
| idx_fda_substances_year | fda_substances | approval_year |
| idx_fsis_recalls_year | fsis_recalls | year |
| idx_gras_notices_date | gras_notices | "Date of filing" |
| idx_who_obesity_year | who_obesity_data | DIM_TIME |
| idx_who_obesity_country | who_obesity_data | GEO_NAME_SHORT |
| idx_cdc_obesity_year | cdc_obesity_data | yearstart |
| idx_cdc_obesity_location | cdc_obesity_data | locationabbr |

## FDA Substances Table
**Table:** `fda_substances`  
**Records:** 3,971  
**Description:** Contains information about FDA-regulated substances and their regulatory status.
**Year Range:** 1990-1997

### Schema
```sql
CREATE TABLE IF NOT EXISTS "fda_substances" (
  "cas_number" TEXT,
  "substance_name" TEXT,
  "other_names" TEXT,
  "technical_effects" TEXT,
  "Reg col01" TEXT,
  "Reg col02" TEXT,
  "Reg col03" TEXT,
  "Reg col04" TEXT,
  "Reg col05" TEXT,
  "Reg col06" TEXT,
  "Reg add01" TEXT,
  "Reg add02" TEXT,
  "Reg add03" TEXT,
  "Reg add04" TEXT,
  "Reg add05" TEXT,
  "Reg add06" TEXT,
  "Reg add07" TEXT,
  "Reg add08" TEXT,
  "Reg add09" TEXT,
  "Reg add10" TEXT,
  "Reg add11" TEXT,
  "Reg add12" TEXT,
  "Reg add13" TEXT,
  "Reg add14" TEXT,
  "Reg add16" TEXT,
  "Reg add17" TEXT,
  "Reg add18" TEXT,
  "Reg add19" TEXT,
  "Reg add20" TEXT,
  "Reg prohibited189" TEXT,
  "Reg Administrative" TEXT,
  "regs Labeling & Standards " TEXT,
  "FEMA No" TEXT,
  "GRAS Pub No" TEXT,
  "Most Recent GRAS Pub Update" TEXT,
  "FEMA status" TEXT,
  "JECFA Flavor Number" TEXT,
  "data_source" TEXT,
  "approval_year" REAL,
  "category" TEXT
);
```

### Core Fields
| Column Name | Description | Data Type |
|------------|-------------|------------|
| cas_number | Chemical Abstracts Service Registry Number | TEXT |
| substance_name | Name of the regulated substance | TEXT |
| other_names | Alternative names for the substance | TEXT |
| technical_effects | Technical purposes or effects of the substance (stored as JSON array) | TEXT |
| category | Category of the substance (e.g., Flavor, Sweetener) | TEXT |
| approval_year | Year the substance was approved | REAL |
| data_source | Origin of the data (always 'FDA_SUBSTANCES') | TEXT |

### Technical Effects Distribution
Based on analysis of the dataset:
- Flavor: 76.3% of substances (3,028)
- Other: 7.3% of substances (290)
- Uncategorized: 4.6% of substances (183)
- Preservative: 2.9% of substances (114)
- Emulsifier: 2.8% of substances (112)
- Nutrient: 2.3% of substances (92)
- Stabilizer: 1.4% of substances (57)
- Color: 1.2% of substances (49)
- Sweetener: 0.6% of substances (23)
- pH Control: 0.5% of substances (19)

### Data Quality Notes
- Technical effects are stored as JSON arrays and need to be parsed when used
- Only 2 records have missing CAS numbers
- All substance names are present
- Some approval years are missing

## FSIS Recalls Table
**Table:** `fsis_recalls`  
**Records:** 975  
**Description:** Food Safety and Inspection Service recall incidents and details.
**Year Range:** Recent years (primarily 2023)

### Schema
```sql
CREATE TABLE IF NOT EXISTS "fsis_recalls" (
  "title" TEXT,
  "recall_number" TEXT,
  "recall_date" TIMESTAMP,
  "closed_date" TIMESTAMP,
  "establishment" TEXT,
  "risk_level_raw" TEXT,
  "recall_reason" TEXT,
  "recall_type" TEXT,
  "related_to_outbreak" INTEGER,
  "is_active" INTEGER,
  "products" TEXT,
  "processing_type" TEXT,
  "states" TEXT,
  "quantity_lbs" REAL,
  "year" INTEGER,
  "risk_level" TEXT,
  "data_source" TEXT
);
```

### Risk Level Distribution
- High - Class I: Most common risk level
- Low - Class II: Second most common
- Public Health Alert: Used for some notices
- Marginal - Class III: Least common

### Core Fields
| Column Name | Description | Data Type |
|------------|-------------|------------|
| title | Title of the recall notice | TEXT |
| recall_number | Unique identifier for the recall | TEXT |
| recall_date | Date the recall was initiated | TIMESTAMP |
| closed_date | Date the recall was closed | TIMESTAMP |
| establishment | Name of the establishment issuing recall | TEXT |
| risk_level | Standardized risk level | TEXT |
| risk_level_raw | Raw risk level information | TEXT |
| recall_reason | Reason for the recall | TEXT |
| states | States affected (stored as JSON array) | TEXT |
| quantity_lbs | Quantity of product recalled in pounds | REAL |
| year | Year from recall date | INTEGER |
| data_source | Origin of the data (always 'FSIS_RECALLS') | TEXT |

### Data Quality Notes
- 110 records (11.3%) have missing quantity values
- All recall numbers are present
- States are stored as JSON arrays and need to be parsed when used
- Dates are stored in proper timestamp format

## GRAS Notices Table
**Table:** `gras_notices`  
**Records:** 1,219  
**Description:** Generally Recognized as Safe (GRAS) notifications and their status.
**Year Range:** 1998-2019

### Schema
```sql
CREATE TABLE IF NOT EXISTS "gras_notices" (
  "GRAS Notice (GRN) No." TEXT,
  "Substance" TEXT,
  "Intended Use" TEXT,
  "Basis" TEXT,
  "Notifier" TEXT,
  "Notifier Address" TEXT,
  "Date of filing" TEXT,
  "GRN Part 1" TEXT,
  "GRN Part 2" TEXT,
  "GRN Part 3" TEXT,
  "GRN Part 4" TEXT,
  "GRN Part 5" TEXT,
  "GRN Part 6" TEXT,
  "GRN Part 7" TEXT,
  "Date of closure" TEXT,
  "Date of correction letter" TEXT,
  "FDA's Letter" TEXT,
  "Date additional correspondence" TEXT,
  "Additional correspondence" TEXT,
  "Date additinoal correspondence 2" TEXT,
  "Additional correspondence 2" TEXT,
  "Date additional correspondence 3" TEXT,
  "Additional correspondence 3" TEXT,
  "Date additional correspondence 4" TEXT,
  "Additional correspondence 4" TEXT,
  "Resubmission" TEXT,
  "Resubmitted" TEXT,
  "Notes" TEXT,
  "Related submission" TEXT,
  "filing_year" REAL,
  "data_source" TEXT
);
```

### Core Fields
| Column Name | Description | Data Type |
|------------|-------------|------------|
| GRAS Notice (GRN) No. | Original GRAS Notice Number (contains Excel formula artifacts) | TEXT |
| Substance | Name of the substance | TEXT |
| Intended Use | Intended use in food | TEXT |
| Basis | Basis for GRAS determination | TEXT |
| Notifier | Company/entity submitting notice | TEXT |
| Date of filing | Submission date | TEXT |
| Date of closure | Closure date | TEXT |
| FDA's Letter | FDA response letter reference | TEXT |
| filing_year | Year of filing | REAL |
| data_source | Origin of the data (always 'GRAS_NOTICES') | TEXT |

### Data Quality Notes
- GRN numbers have Excel formula artifacts (=T("1")) that should be cleaned
- Some fields contain HTML tags that should be properly rendered or stripped
- All substance values are present
- Filing years are properly calculated

## WHO Obesity Data Table
**Table:** `who_obesity_data`  
**Records:** 20,790  
**Description:** World Health Organization obesity statistics by location and demographics.
**Year Range:** 1990-2022

### Schema
```sql
CREATE TABLE IF NOT EXISTS "who_obesity_data" (
  "IND_ID" TEXT,
  "IND_CODE" TEXT,
  "IND_UUID" TEXT,
  "IND_PER_CODE" TEXT,
  "DIM_TIME" INTEGER,
  "DIM_TIME_TYPE" TEXT,
  "DIM_GEO_CODE_M49" INTEGER,
  "DIM_GEO_CODE_TYPE" TEXT,
  "DIM_PUBLISH_STATE_CODE" TEXT,
  "IND_NAME" TEXT,
  "GEO_NAME_SHORT" TEXT,
  "DIM_SEX" TEXT,
  "DIM_AGE" TEXT,
  "RATE_PER_100_N" REAL,
  "RATE_PER_100_NL" REAL,
  "RATE_PER_100_NU" REAL,
  "data_source" TEXT
);
```

### Core Fields
| Column Name | Description | Data Type |
|------------|-------------|------------|
| DIM_TIME | Year of measurement | INTEGER |
| GEO_NAME_SHORT | Country or region name | TEXT |
| DIM_SEX | Gender category (MALE, FEMALE, TOTAL) | TEXT |
| DIM_AGE | Age group (e.g., Y_GE18 for 18 years and older) | TEXT |
| RATE_PER_100_N | Obesity rate per 100 people (nominal) | REAL |
| RATE_PER_100_NL | Obesity rate per 100 people (lower bound) | REAL |
| RATE_PER_100_NU | Obesity rate per 100 people (upper bound) | REAL |
| data_source | Origin of the data (always 'WHO_OBESITY') | TEXT |

### Data Quality Notes
- No missing rate values
- Country names, sex, and age categories are standardized
- Years are properly formatted as integers

## CDC Obesity Data Table
**Table:** `cdc_obesity_data`  
**Records:** 100,464  
**Description:** Contains detailed US state-level obesity statistics with demographic breakdowns.
**Year Range:** 2011-2023

### Schema
```sql
CREATE TABLE IF NOT EXISTS "cdc_obesity_data" (
  "yearstart" INTEGER,
  "yearend" INTEGER,
  "locationabbr" TEXT,
  "locationdesc" TEXT,
  "datasource" TEXT,
  "class" TEXT,
  "topic" TEXT,
  "question" TEXT,
  "data_value_unit" INTEGER,
  "data_value_type" TEXT,
  "data_value" REAL,
  "data_value_alt" REAL,
  "low_confidence_limit" REAL,
  "high_confidence_limit" REAL,
  "sample_size" REAL,
  "race_ethnicity" TEXT,
  "geolocation" TEXT,
  "classid" TEXT,
  "topicid" TEXT,
  "questionid" TEXT,
  "datavaluetypeid" TEXT,
  "locationid" INTEGER,
  "stratificationcategory1" TEXT,
  "stratification1" TEXT,
  "stratificationcategoryid1" TEXT,
  "stratificationid1" TEXT,
  "sex" TEXT,
  "age_years" TEXT,
  "income" TEXT,
  "education" TEXT,
  "data_value_footnote_symbol" TEXT,
  "data_value_footnote" TEXT,
  "total" TEXT,
  "year" INTEGER,
  "location" TEXT,
  "data_source" TEXT
);
```

### Core Fields
| Column Name | Description | Data Type |
|------------|-------------|------------|
| yearstart | Start year of the data point | INTEGER |
| yearend | End year of the data point | INTEGER |
| locationabbr | State abbreviation | TEXT |
| locationdesc | Full state name | TEXT |
| topic | Topic category (e.g., "Obesity / Weight Status") | TEXT |
| question | Survey question text | TEXT |
| data_value | Obesity rate value | REAL |
| low_confidence_limit | Lower confidence interval | REAL |
| high_confidence_limit | Upper confidence interval | REAL |
| sample_size | Size of sample surveyed | REAL |
| year | Normalized year value | INTEGER |
| location | Normalized location name | TEXT |
| data_source | Origin of the data (always 'CDC_OBESITY') | TEXT |

### Demographic Fields
| Column Name | Description | Data Type |
|------------|-------------|------------|
| race_ethnicity | Race/ethnicity category | TEXT |
| sex | Gender category | TEXT |
| age_years | Age group category | TEXT |
| income | Income bracket | TEXT |
| education | Education level | TEXT |

### Data Quality Notes
- 9,815 records (9.8%) have missing data values
- Some demographic fields (sex, age_years) have missing values
- Topics and questions are consistent
- Location abbreviations are standardized

## Database Views

### Substances by Category View
```sql
CREATE VIEW substances_by_category AS
  SELECT 
    category,
    COUNT(*) as count
  FROM 
    fda_substances
  WHERE 
    category IS NOT NULL
  GROUP BY 
    category
  ORDER BY 
    count DESC;
```

### Obesity Trend US View
```sql
CREATE VIEW obesity_trend_us AS
  SELECT 
    yearstart as year,
    AVG(data_value) as avg_obesity_rate
  FROM 
    cdc_obesity_data
  WHERE 
    topic = 'Obesity / Weight Status' AND
    question LIKE '%obesity%' AND
    data_value IS NOT NULL AND
    locationabbr = 'US'
  GROUP BY 
    yearstart
  ORDER BY 
    yearstart;
```

## Accessing the Database

### SQLite Command Line
```bash
# Connect to the database
sqlite3 etl/data/db/food_safety_dashboard.db

# List all tables
.tables

# View schema
.schema

# Run a query
SELECT * FROM fda_substances LIMIT 5;
```

### JavaScript/Node.js (with better-sqlite3)
```javascript
const Database = require('better-sqlite3');
const db = new Database('etl/data/db/food_safety_dashboard.db');

// Query example
const substances = db.prepare('SELECT * FROM fda_substances LIMIT 5').all();
console.log(substances);

// Close the connection when done
db.close();
```

### Python (with sqlite3)
```python
import sqlite3

# Connect to the database
conn = sqlite3.connect('etl/data/db/food_safety_dashboard.db')
cursor = conn.cursor()

# Query example
cursor.execute('SELECT * FROM fda_substances LIMIT 5')
substances = cursor.fetchall()
print(substances)

# Close the connection when done
conn.close()
```

## Notes
- All datasets include a `data_source` field to track the origin of the data
- Dates are typically stored in ISO format (YYYY-MM-DD) or as TIMESTAMP
- Missing values are represented as NULL values in the database
- Some fields contain JSON arrays that need to be parsed when used (e.g., technical_effects, states)
- The database includes indexes on commonly queried fields for better performance
- Views provide pre-aggregated data for common queries
````

## File: src/utils/dataProcessing.js
````javascript
// Data processing utilities

/**
 * Cleans Excel-style formulas from string values
 * @param {string} value - The value to clean
 * @returns {string} - Cleaned value
 */
export const cleanExcelFormula = (value) => {
  if (typeof value !== 'string') return value;
  // Remove Excel formula wrapper and quotes
  return value.replace(/^=T\("([^"]+)"\)$/, '$1');
};

/**
 * Processes FDA Substances data
 * @param {Object} row - Raw data row
 * @returns {Object} - Cleaned data row
 */
export const processFDASubstances = (row) => {
  const cleanedRow = {};
  for (const [key, value] of Object.entries(row)) {
    cleanedRow[key] = cleanExcelFormula(value);
    // Convert technical_effects from string to array if it exists
    if (key === 'technical_effects' && value) {
      cleanedRow[key] = value.replace(/[\[\]']/g, '').split(',').map(item => item.trim());
    }
  }
  return cleanedRow;
};

/**
 * Processes FSIS Recalls data
 * @param {Object} row - Raw data row
 * @returns {Object} - Cleaned data row
 */
export const processFSISRecalls = (row) => {
  // List of all US state abbreviations
  const allStates = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
    'DC'
  ];

  // Process states field
  let states = [];
  if (row.states) {
    // Clean up the states field
    const statesValue = row.states.toString().trim().toLowerCase();
    
    // Check for nationwide recalls
    if (statesValue.includes('nationwide') || 
        statesValue.includes('national') || 
        statesValue.includes('all states')) {
      // If nationwide recall, include all states
      states = [...allStates];
    } else {
      // Try to extract state abbreviations
      const statePattern = new RegExp(allStates.join('|'), 'gi');
      const matches = statesValue.toUpperCase().match(statePattern) || [];
      states = [...new Set(matches)]; // Remove duplicates
    }
  }

  // Clean up other fields
  return {
    ...row,
    states,
    quantity_lbs: parseFloat(row.quantity_lbs) || 0,
    year: parseInt(row.year) || null,
    risk_level: row.risk_level || row.risk_level_raw
  };
};

/**
 * Processes GRAS Notices data
 * @param {Object} row - Raw data row
 * @returns {Object} - Cleaned data row
 */
export const processGRASNotices = (row) => {
  const cleanedRow = {};
  for (const [key, value] of Object.entries(row)) {
    cleanedRow[key] = cleanExcelFormula(value);
  }
  // Convert numeric fields
  cleanedRow.filing_year = parseInt(cleanedRow.filing_year) || null;
  cleanedRow.grn_no = parseInt(cleanedRow.grn_no) || null;
  return cleanedRow;
};

/**
 * Processes WHO Obesity data
 * @param {Object} row - Raw data row
 * @returns {Object} - Cleaned data row
 */
export const processWHOObesity = (row) => {
  return {
    ...row,
    // Convert numeric fields
    obesity_rate: parseFloat(row.obesity_rate) || 0,
    confidence_lower: parseFloat(row.confidence_lower) || 0,
    confidence_upper: parseFloat(row.confidence_upper) || 0,
    RATE_PER_100_N: parseFloat(row.RATE_PER_100_N) || 0,
    RATE_PER_100_NL: parseFloat(row.RATE_PER_100_NL) || 0,
    RATE_PER_100_NU: parseFloat(row.RATE_PER_100_NU) || 0,
    // Convert year string to Date object
    year: new Date(row.year)
  };
};

/**
 * Processes CDC Obesity data
 * @param {Object} row - Raw data row
 * @returns {Object} - Cleaned data row
 */
export const processCDCObesity = (row) => {
  return {
    ...row,
    // Convert numeric fields
    data_value: parseFloat(row.data_value) || 0,
    data_value_alt: parseFloat(row.data_value_alt) || 0,
    low_confidence_limit: parseFloat(row.low_confidence_limit) || 0,
    high_confidence_limit: parseFloat(row.high_confidence_limit) || 0,
    sample_size: parseInt(row.sample_size) || 0,
    total: parseInt(row.total) || 0,
    year: parseInt(row.year) || null,
    // Parse geolocation JSON if it exists
    geolocation: row.geolocation ? JSON.parse(row.geolocation) : null
  };
};
````

## File: src/App.css
````css
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}
````

## File: src/App.jsx
````javascript
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './components/pages/Dashboard';
import FDASubstances from './components/pages/FDASubstances';
import ObesityData from './components/pages/ObesityData';
import FSISRecallsPage from './components/pages/FSISRecallsPage';

// Placeholder components for now
const GRASNotices = () => <div className="h1">GRAS Notices</div>;

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/fda-substances" element={<FDASubstances />} />
          <Route path="/fsis-recalls" element={<FSISRecallsPage />} />
          <Route path="/obesity-data" element={<ObesityData />} />
          <Route path="/gras-notices" element={<GRASNotices />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
````

## File: src/index.css
````css
/* Custom styles */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f8f9fa;
}

/* D3 Chart Styles */
.axis-label {
  font-size: 12px;
}

.chart-title {
  font-size: 16px;
  font-weight: bold;
}

/* Custom Bootstrap Overrides */
.btn {
  border-radius: 0 !important;
}

.card {
  border-radius: 0 !important;
}

.alert {
  border-radius: 0 !important;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
````

## File: src/main.jsx
````javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
````

## File: .gitignore
````
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Dependencies
node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Environment files
.env
.env.*
!.env.example

# Testing
coverage
.nyc_output

# Build
build
.build
out
.next

# Cache
.cache
.npm
.eslintcache
.stylelintcache

# Misc
*.pem
.DS_Store
Thumbs.db
.vercel
.netlify

# Debug
debug
.debug

# Local files
*.local
local-*

# Temporary files
*.tmp
*.temp
.temp
temp/

# IDE specific files
.vscode-test
*.sublime-project
*.sublime-workspace
.history/

# OS generated files
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
````

## File: .repomixignore
````
*csv
````

## File: eslint.config.js
````javascript
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]
````

## File: index.html
````html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
````

## File: package.json
````json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.7.9",
    "bootstrap": "^5.3.3",
    "bootstrap-icons": "^1.11.3",
    "d3": "^7.9.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.2.0",
    "topojson-client": "^3.1.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.19.0",
    "@types/react": "^19.0.8",
    "@types/react-dom": "^19.0.3",
    "@vitejs/plugin-react": "^4.3.4",
    "eslint": "^9.19.0",
    "eslint-plugin-react": "^7.37.4",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.18",
    "globals": "^15.14.0",
    "vite": "^6.1.0"
  }
}
````

## File: vite.config.js
````javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
````
