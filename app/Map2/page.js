"use client";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useRouter } from "next/navigation";

const revenueBreakpoints = [0, 1e9, 2e9, 3e9, 4e9];
const revenueColors = ["#FFC0CB", "#fcae91", "#fb6a4a", "#de2d26", "#a50f15"];
const costBreakpoints = [0, 1e9, 2e9, 3e9, 4e9];
const costColors = ["#e0f7fa", "#80deea", "#26c6da", "#00acc1", "#006064"];

const Map2WithDots = ({ onLoadComplete }) => {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipStyle, setTooltipStyle] = useState({});
  const [isChecked, setIsChecked] = useState(false); // Toggle state
  const router = useRouter();

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
  };

  const getColor = (value, breakpoints, colors) => {
    for (let i = breakpoints.length - 1; i >= 0; i--) {
      if (value >= breakpoints[i]) {
        return colors[i];
      }
    }
    return "gray"; // Default for no data
  };

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);

    const width = 800; // Fixed width
    const height = 400; // Fixed height

    svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    const projection = d3
      .geoNaturalEarth1()
      .scale(width / 6.28)
      .translate([width / 2, height / 2]);

    const pathGenerator = d3.geoPath(projection);

    d3.json("/data/geojson.json")
      .then((data) => {
        if (!data || !data.features) {
          throw new Error("Invalid GeoJSON data");
        }

        svg.selectAll("*").remove();

        const countryGroups = svg.append("g");

        data.features.forEach((feature) => {
          const group = countryGroups
            .append("g")
            .attr("data-country", feature.properties.name);

          const countryData = isChecked
            ? feature.countryInfo?.cost
            : feature.countryInfo?.revenue;

          const totalValue = countryData
            ? Object.values(countryData).reduce((acc, val) => acc + val, 0)
            : 0;

          const breakpoints = isChecked ? costBreakpoints : revenueBreakpoints;
          const colors = isChecked ? costColors : revenueColors;
          const countryColor = getColor(totalValue, breakpoints, colors);

          const bounds = pathGenerator.bounds(feature);
          if (!bounds) return;

          const [x0, y0] = bounds[0];
          const [x1, y1] = bounds[1];

          const dotSpacing = 4;
          const dots = [];

          for (let x = x0; x < x1; x += dotSpacing) {
            for (let y = y0; y < y1; y += dotSpacing) {
              const point = projection.invert([x, y]);
              if (point && d3.geoContains(feature, point)) {
                const projected = projection(point);
                if (projected) dots.push({ x: projected[0], y: projected[1] });
              }
            }
          }

          group
            .append("path")
            .attr("d", pathGenerator(feature))
            .attr("fill", "transparent")
            .attr("stroke", "none")
            .on("mouseover", (event) => {
              group.selectAll("circle").attr("fill", "white");

              setTooltipContent(
                `${feature.properties.name || "Unknown"}: ${
                  isChecked ? "Cost" : "Revenue"
                } = ${totalValue || "No data"}`
              );
              setTooltipStyle({
                display: "block",
                left: `${event.pageX + 10}px`,
                top: `${event.pageY + 10}px`,
              });
            })
            .on("mouseout", () => {
              group
                .selectAll("circle")
                .attr("fill", totalValue ? countryColor : "#D3D3D3");

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

          group
            .selectAll("circle")
            .data(dots)
            .enter()
            .append("circle")
            .attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y)
            .attr("r", 1.3) // Dot size
            .attr("fill", totalValue ? countryColor : "#D3D3D3");
        });

        if (onLoadComplete) onLoadComplete();
      })
      .catch((error) => console.error("Error loading GeoJSON data:", error));
  }, [isChecked, onLoadComplete]);

  return (
    <div style={{ position: "relative" }}>
      <div className="flex flex-row">
        <div className="text-white ml-[5%] absolute bottom-[5%]">
          <label className="themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="sr-only"
            />
            <span
              className={`slider mr-2 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${
                isChecked ? "bg-[#225c99]" : "bg-[#e74d4d]"
              }`}
            >
              <span
                className={`dot h-6 w-6 rounded-full bg-white duration-200 ${
                  isChecked ? "translate-x-[28px]" : ""
                }`}
              ></span>
            </span>
            <span className="label flex items-center text-sm font-medium text-white">
              {isChecked ? "costs" : "revenue"}
            </span>
          </label>
          <div className="flex flex-row mt-5">
            <div
              className="w-[3vw] mr-2"
              style={{
                backgroundColor: isChecked ? costColors[0] : revenueColors[0],
              }}
            ></div>
            $0
          </div>
          <div className="flex flex-row mt-5">
            <div
              className="w-[3vw] mr-2"
              style={{
                backgroundColor: isChecked ? costColors[1] : revenueColors[1],
              }}
            ></div>
            $1B
          </div>
          <div className="flex flex-row mt-5">
            <div
              className="w-[3vw] mr-2"
              style={{
                backgroundColor: isChecked ? costColors[2] : revenueColors[2],
              }}
            ></div>
            $2B
          </div>
          <div className="flex flex-row mt-5">
            <div
              className="w-[3vw] mr-2"
              style={{
                backgroundColor: isChecked ? costColors[3] : revenueColors[3],
              }}
            ></div>
            $3B
          </div>
          <div className="flex flex-row mt-5">
            <div
              className="w-[3vw] mr-2"
              style={{
                backgroundColor: isChecked ? costColors[4] : revenueColors[4],
              }}
            ></div>
            $4B
          </div>
        </div>
        <svg ref={svgRef} style={{ width: "100%", height: "auto" }}></svg>
      </div>
      <div
        ref={tooltipRef}
        style={{
          position: "absolute",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "#fff",
          borderRadius: "5px",
          padding: "5px",
          fontSize: "14px",
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
