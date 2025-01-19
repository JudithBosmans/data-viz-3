"use client";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const MiniMap = ({ selectedCountry }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const width = svg.node().clientWidth || 400;
    const height = width / 1.5;

    svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    const projection = d3
      .geoNaturalEarth1()
      .scale(width / 6.28)
      .translate([width / 2, height / 2]);

    const pathGenerator = d3.geoPath(projection);

    // Fetch GeoJSON data
    d3.json("/data/geojson.json")
      .then((data) => {
        svg.selectAll("*").remove(); // Clear previous map if any

        // Draw countries with dots
        data.features.forEach((feature) => {
          const bounds = pathGenerator.bounds(feature);
          const [x0, y0] = bounds[0];
          const [x1, y1] = bounds[1];

          const dotSpacing = 5;
          const dots = [];

          for (let x = x0; x < x1; x += dotSpacing) {
            for (let y = y0; y < y1; y += dotSpacing) {
              const point = projection.invert([x, y]);
              if (point && d3.geoContains(feature, point)) {
                dots.push({
                  x,
                  y,
                  isSelected:
                    feature.properties.name.toLowerCase() ===
                    selectedCountry.toLowerCase(),
                });
              }
            }
          }

          svg
            .append("g")
            .selectAll("circle")
            .data(dots)
            .enter()
            .append("circle")
            .attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y)
            .attr("r", 1.5)
            .attr("fill", (d) => (d.isSelected ? "orange" : "white")); // White for selected country, grey for others
        });
      })
      .catch((error) => console.error("Error loading GeoJSON data:", error));
  }, [selectedCountry]); // Re-run effect if the selected country changes

  return (
    <div style={{ position: "relative" }}>
      <svg ref={svgRef} style={{ width: "100%", height: "auto" }}></svg>
    </div>
  );
};

export default MiniMap;
