"use client";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const MiniMap = ({ selectedCountry }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 800; // Fixed SVG width
    const height = 600; // Fixed SVG height

    svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    const projection = d3
      .geoNaturalEarth1()
      .translate([width / 2, height / 2])
      .scale(150);
    const pathGenerator = d3.geoPath(projection);

    d3.json("/data/geojson.json")
      .then((data) => {
        svg.selectAll("*").remove(); // Clear previous render

        const allDots = [];
        const dotSpacing = 5;

        // Generate dots for all countries
        data.features.forEach((feature) => {
          const bounds = pathGenerator.bounds(feature);
          const [x0, y0] = bounds[0];
          const [x1, y1] = bounds[1];

          for (let x = x0; x < x1; x += dotSpacing) {
            for (let y = y0; y < y1; y += dotSpacing) {
              const geoPoint = projection.invert([x, y]);
              if (geoPoint && d3.geoContains(feature, geoPoint)) {
                const projected = projection(geoPoint);
                if (projected) {
                  allDots.push({
                    x: projected[0],
                    y: projected[1],
                    isSelected:
                      feature.properties.name.toLowerCase() ===
                      selectedCountry.toLowerCase(),
                  });
                }
              }
            }
          }
        });

        // Render all dots
        svg
          .append("g")
          .selectAll("circle")
          .data(allDots)
          .enter()
          .append("circle")
          .attr("cx", (d) => d.x)
          .attr("cy", (d) => d.y)
          .attr("r", 2)
          .attr("fill", (d) => (d.isSelected ? "orange" : "white"));

        console.log(`Selected country: ${selectedCountry}`);
      })
      .catch((error) => console.error("Error loading GeoJSON data:", error));
  }, [selectedCountry]);

  return (
    <div style={{ position: "relative" }}>
      <svg
        ref={svgRef}
        style={{
          width: "100%",
          height: "auto",
          marginTop: "-10%",
          marginLeft: "-10%",
        }}
      ></svg>
    </div>
  );
};

export default MiniMap;
