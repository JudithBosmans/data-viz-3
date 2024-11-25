import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { motion } from "framer-motion";
import "../../styles/data.css";

const HexbinChart = () => {
  const [data, setData] = useState(null);

  const width = 900;
  const height = 900;
  const margin = { top: 20, right: 30, bottom: 80, left: 80 };
  const circlePadding = 15;
  const columnOffset = 20;
  const maxDots = 5;
  const categoryGap = 15;

  useEffect(() => {
    d3.json("/data/dataOly.json")
      .then((fetchedData) => setData(fetchedData))
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  if (!data) return null;

  // D3 scales
  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.year))
    .range([margin.left, width - margin.right])
    .padding(0.2);

  const revenueColor = d3.scaleOrdinal(d3.schemeBlues[4]);
  const costColor = d3.scaleOrdinal(d3.schemeReds[3]);

  return (
    <svg width={width} height={height} className="mainCont mx-auto">
      {/* X-axis */}
      <g transform={`translate(0, ${height - margin.bottom})`}>
        {data.map((d) => (
          <text
            key={d.year}
            x={xScale(d.year) + xScale.bandwidth() / 2}
            y={15}
            textAnchor="end"
            transform={`rotate(-45, ${
              xScale(d.year) + xScale.bandwidth() / 2
            }, 15)`}
            className="text-xs font-medium text-white"
          >
            {d.year}
          </text>
        ))}
      </g>

      {/* Paths and Circles */}
      {data.map((d) => {
        const xPos = xScale(d.year) + xScale.bandwidth() / 2;

        let currentCostY = height - margin.bottom - 20;
        let currentRevenueY = height - margin.bottom - 20;

        return (
          <g key={d.year}>
            {/* Cost Path */}
            {Object.entries(d.cost).map(([key, value]) => {
              const numDots = Math.min(maxDots, Math.ceil(value / 500000));
              const points = Array.from({ length: numDots }).map((_, k) => {
                const y = currentCostY - k * (15 + circlePadding);
                return [xPos - columnOffset, y];
              });

              currentCostY -= numDots * (15 + circlePadding) + categoryGap;

              const pathData = d3.line()(points);

              return (
                <g key={`${d.year}-cost-${key}`}>
                  {/* Line Animation */}
                  <motion.path
                    d={pathData}
                    stroke={costColor(key)}
                    strokeWidth={2}
                    fill="none"
                    initial={{
                      strokeDasharray: "1000",
                      strokeDashoffset: "1000",
                    }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 1 }}
                  />
                  {/* Circles on the Path */}
                  {points.map(([x, y], i) => (
                    <motion.circle
                      key={`${d.year}-cost-circle-${key}-${i}`}
                      cx={x}
                      cy={y}
                      r={8}
                      fill={costColor(key)}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.6,
                        delay: 1 + i * 0.1, // After line animation
                      }}
                    />
                  ))}
                </g>
              );
            })}

            {/* Revenue Path */}
            {Object.entries(d.revenue).map(([key, value]) => {
              const numDots = Math.min(maxDots, Math.ceil(value / 500000));
              const points = Array.from({ length: numDots }).map((_, k) => {
                const y = currentRevenueY - k * (15 + circlePadding);
                return [xPos + columnOffset, y];
              });

              currentRevenueY -= numDots * (15 + circlePadding) + categoryGap;

              const pathData = d3.line()(points);

              return (
                <g key={`${d.year}-revenue-${key}`}>
                  {/* Line Animation */}
                  <motion.path
                    d={pathData}
                    stroke={revenueColor(key)}
                    strokeWidth={2}
                    fill="none"
                    initial={{
                      strokeDasharray: "1000",
                      strokeDashoffset: "1000",
                    }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 1 }}
                  />
                  {/* Circles on the Path */}
                  {points.map(([x, y], i) => (
                    <motion.circle
                      key={`${d.year}-revenue-circle-${key}-${i}`}
                      cx={x}
                      cy={y}
                      r={8}
                      fill={revenueColor(key)}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.6,
                        delay: 1 + i * 0.1, // After line animation
                      }}
                    />
                  ))}
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
};

export default HexbinChart;
