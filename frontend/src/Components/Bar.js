import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

const Bar = ({ width, height }) => {
  const svgRef = useRef();
  const [bar, setBar] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBar();
  }, []);

  const fetchBar = async () => {
    try {
      const flag = "country"; // Or any other value you want to pass
      const response = await fetch(`/countries/${flag}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setBar(jsonData);
    } catch (error) {
      setError('Failed to fetch data');
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (!bar || bar.length === 0) return;

    const svg = d3.select(svgRef.current);

    // Clear previous contents
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const x = d3.scaleBand()
      .domain(bar.map(d => d.country))
      .range([0, innerWidth])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(bar, d => d.frequency)])
      .range([innerHeight, 0]);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .call(yAxis);

    svg.append('g')
      .attr('transform', `translate(${margin.left},${innerHeight + margin.top})`)
      .call(xAxis);

    svg.selectAll('.bar')
      .data(bar)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.country) + margin.left)
      .attr('y', d => y(d.frequency) + margin.top)
      .attr('width', x.bandwidth())
      .attr('height', d => innerHeight - y(d.frequency))
      .attr('fill', 'steelblue');
  }, [bar, width, height]);

  return <svg ref={svgRef} width={width} height={height}>
    <g className="x-axis" />
    <g className="y-axis" />
  </svg>;
};

export default Bar;