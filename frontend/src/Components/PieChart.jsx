import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

const PieChart = ({ width, height }) => {
  const svgRef = useRef();
  const [data, setData] = useState([]);
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
      setData(jsonData);
    } catch (error) {
      setError('Failed to fetch data');
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(svgRef.current);

    // Clear previous contents
    svg.selectAll('*').remove();

    // Set up dimensions
    const radius = Math.min(width, height) / 2;
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const pie = d3.pie().value(d => d.frequency); // Corrected typo here

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // Create pie chart
    const arcs = svg.selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => colorScale(i));

    arcs.append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .text(d => d.data.label);

    // Add country names as labels
    arcs.append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('dy', '1.2em') // Offset vertically to avoid overlap
      .text(d => d.data.country);
  }, [data, width, height]);

  return (
    <svg ref={svgRef} width={width} height={height}></svg>
  );
};

export default PieChart;
