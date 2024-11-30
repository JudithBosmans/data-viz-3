"use client";
import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import Link from "next/link";
import { motion } from "framer-motion";
import "../../styles/data.css";

const HexbinChart = () => {
  const [data, setData] = useState(null);

  const width = 5000;
  const height = 1200;
  const margin = { top: 20, right: 30, bottom: 80, left: 0 };
  const circlePadding = 15;
  const columnOffset = 25;
  const maxDots = 10;
  const categoryGap = 0;

  useEffect(() => {
    d3.json("/data/dataOly.json")
      .then((fetchedData) => setData(fetchedData))
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  if (!data) return null;

  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.year))
    .range([margin.left, width - margin.right])
    .padding(0.2);

  const revenueColor = d3.scaleOrdinal(d3.schemeBlues[4]);
  const costColor = d3.scaleOrdinal(d3.schemeReds[3]);
  if (!data) return <p>No data available for this year.</p>;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-semibold mb-4">Data Visualization</h1>
      <div className="overflow-x-auto w-full max-w-5xl">
        <svg width={width} height={height} className="mainCont mx-auto">
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
                      <Link href={`/detail/${d.year}`}>
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
                          className="cursor-pointer"
                        />
                      </Link>
                      {points.map(([x, y], i) => (
                        <Link
                          key={`${d.year}-cost-circle-${key}-${i}`}
                          href={`/detail/${d.year}`}
                        >
                          <motion.circle
                            cx={x}
                            cy={y}
                            r={8}
                            fill={costColor(key)}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.6,
                              delay: 1 + i * 0.1,
                            }}
                            className="cursor-pointer"
                          />
                        </Link>
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

                  currentRevenueY -=
                    numDots * (15 + circlePadding) + categoryGap;

                  const pathData = d3.line()(points);

                  return (
                    <g key={`${d.year}-revenue-${key}`}>
                      <Link href={`/detail/${d.year}`}>
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
                          className="cursor-pointer"
                        />
                      </Link>
                      {points.map(([x, y], i) => (
                        <Link
                          key={`${d.year}-revenue-circle-${key}-${i}`}
                          href={`/detail/${d.year}`}
                        >
                          <motion.circle
                            cx={x}
                            cy={y}
                            r={8}
                            fill={revenueColor(key)}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.6,
                              delay: 1 + i * 0.1,
                            }}
                            className="cursor-pointer"
                          />
                        </Link>
                      ))}
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default HexbinChart;
