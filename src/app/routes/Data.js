import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import "../../styles/data.css";

const HexbinChart = () => {
  const [data, setData] = useState(null);
  const svgRef = useRef();

  // Chart dimensions
  const width = 900;
  const height = 900;
  const margin = { top: 20, right: 30, bottom: 80, left: 80 };

  // Padding and offsets
  const circlePadding = 15; // Vertical padding between circles
  const columnOffset = 20; // Horizontal offset for separating cost and revenue columns
  const maxDots = 10; // Maximum dots per category

  useEffect(() => {
    // Fetch the data
    d3.json("/data/dataOly.json")
      .then((fetchedData) => {
        setData(fetchedData);

        // Proceed if data is successfully fetched
        if (fetchedData) {
          const svg = d3.select(svgRef.current);
          svg.selectAll("*").remove(); // Clear any previous content

          // X-Axis scale: each year is a band
          const xScale = d3
            .scaleBand()
            .domain(fetchedData.map((d) => d.year))
            .range([margin.left, width - margin.right])
            .padding(0.2);

          // Append X-axis at the bottom
          svg
            .append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xScale))
            .selectAll("text")
            .attr("class", "text-xs font-medium text-white")
            .attr("transform", "rotate(-45)")
            .style("text-anchor", "end");

          // Color scales for revenue (blue) and cost (red) circles
          const revenueColor = d3.scaleOrdinal(d3.schemeBlues[4]);
          const costColor = d3.scaleOrdinal(d3.schemeReds[3]);

          // Draw circles for each year
          fetchedData.forEach((d) => {
            const xPos = xScale(d.year) + xScale.bandwidth() / 2; // Center position for each year

            // Cost Circles - Centered above the year, stacked upwards
            let currentCostY = height - margin.bottom - 20; // Start stacking from the bottom
            Object.entries(d.cost).forEach(([key, value]) => {
              const numDots = Math.min(maxDots, Math.ceil(value / 500000)); // Limit dots to maxDots
              for (let k = 0; k < numDots; k++) {
                svg
                  .append("circle")
                  .attr("cx", xPos - columnOffset) // Position cost column slightly left
                  .attr("cy", currentCostY - k * (15 + circlePadding)) // Stack upwards
                  .attr("r", 8)
                  .attr("fill", costColor(key))
                  .attr("class", "cost-circle");
              }
              currentCostY -= numDots * (15 + circlePadding); // Adjust y for next category
            });

            // Revenue Circles - Centered above the year, stacked upwards
            let currentRevenueY = height - margin.bottom - 20; // Start stacking from the bottom
            Object.entries(d.revenue).forEach(([key, value]) => {
              const numDots = Math.min(maxDots, Math.ceil(value / 500000)); // Limit dots to maxDots
              for (let k = 0; k < numDots; k++) {
                svg
                  .append("circle")
                  .attr("cx", xPos + columnOffset) // Position revenue column slightly right
                  .attr("cy", currentRevenueY - k * (15 + circlePadding)) // Stack upwards
                  .attr("r", 8)
                  .attr("fill", revenueColor(key))
                  .attr("class", "revenue-circle");
              }
              currentRevenueY -= numDots * (15 + circlePadding); // Adjust y for next category
            });
          });
        }
      })
      .catch((error) => console.error("Error loading data:", error));
  }, [
    height,
    margin.bottom,
    margin.left,
    margin.right,
    margin.top,
    width,
    circlePadding,
    columnOffset,
    maxDots,
  ]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className="mainCont mx-auto"
    />
  );
};

export default HexbinChart;
