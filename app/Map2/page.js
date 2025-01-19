"use client";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useRouter } from "next/navigation";

const Map2WithDots = ({ onLoadComplete }) => {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipStyle, setTooltipStyle] = useState({});
  const router = useRouter();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);

    const width = svg.node().clientWidth || 800;
    const height = width / 2;

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
        svg.selectAll("*").remove();

        // Add countries group
        const countryGroups = svg.append("g");

        // Add paths for each country
        data.features.forEach((feature) => {
          const group = countryGroups
            .append("g")
            .attr("data-country", feature.properties.name);

          // Add a path for the country's surface
          group
            .append("path")
            .attr("d", pathGenerator(feature))
            .attr("fill", "transparent")
            .attr("stroke", "none")
            .on("mouseover", (event) => {
              group.selectAll("circle").attr("fill", "orange");

              // Set cursor style to pointer
              d3.select(event.target).style("cursor", "pointer");

              // Update tooltip content and style
              setTooltipContent(feature.properties.name || "Unknown");
              setTooltipStyle({
                display: "block",
                left: `${event.pageX + 10}px`,
                top: `${event.pageY + 10}px`,
              });
            })
            .on("mouseout", () => {
              group.selectAll("circle").attr("fill", "white");
              d3.select(event.target).style("cursor", "default");
              setTooltipStyle({ display: "none" });
            })
            .on("mouseout", () => {
              group.selectAll("circle").attr("fill", "white");
              setTooltipStyle({ display: "none" });
            })
            .on("click", () => {
              const countryName = feature.properties.name.toLowerCase();
              const countryInfo = feature.countryInfo;

              if (countryInfo) {
                const serializedData = encodeURIComponent(
                  JSON.stringify(countryInfo)
                );
                router.push(
                  `/detail/country/${countryName}?data=${serializedData}`
                );
              } else {
                alert(
                  `${feature.properties.name} has not hosted the Olympic Games yet.`
                );
              }
            });

          // Add dots for the country
          const bounds = pathGenerator.bounds(feature);
          const [x0, y0] = bounds[0];
          const [x1, y1] = bounds[1];

          const dotSpacing = 5;
          const dots = [];

          for (let x = x0; x < x1; x += dotSpacing) {
            for (let y = y0; y < y1; y += dotSpacing) {
              const point = projection.invert([x, y]);
              if (point && d3.geoContains(feature, point)) {
                dots.push({ x, y });
              }
            }
          }

          group
            .selectAll("circle")
            .data(dots)
            .enter()
            .append("circle")
            .attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y)
            .attr("r", 1.5)
            .attr("fill", "white");
        });
        if (onLoadComplete) onLoadComplete();
      })
      .catch((error) => console.error("Error loading GeoJSON data:", error));
  }, [onLoadComplete]);

  return (
    <div style={{ position: "relative" }}>
      <svg
        ref={svgRef}
        style={{ width: "100vw", height: "auto", marginTop: "10%" }}
      ></svg>
      <div
        ref={tooltipRef}
        style={{
          position: "absolute",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "#fff",
          padding: "5px",
          fontSize: "12px",
          pointerEvents: "none",
          ...tooltipStyle,
        }}
      >
        {tooltipContent}
      </div>
    </div>
  );
};

export default Map2WithDots;
