"use client";
import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import Link from "next/link";
import { motion } from "framer-motion";

import Nav from "../Nav/page";
import "../../styles/data.css";

const HexbinChart = () => {
  const [data, setData] = useState(null);

  const width = 2800;
  const height = 800;
  const margin = { top: 20, right: 0, bottom: 80, left: 0 };
  const lineThickness = 10;
  const spacing = 15;
  const columnOffset = 10;

  useEffect(() => {
    d3.json("/data/dataOly.json")
      .then((fetchedData) => {
        const filteredData = fetchedData.filter((d) => d.year !== "");
        setData(filteredData);
      })
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  if (!data) return null;

  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.year))
    .range([margin.left, width - margin.right])
    .padding(0.2);

  const yScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, (d) =>
        Math.max(
          d3.sum(Object.values(d.revenue)),
          d3.sum(Object.values(d.cost))
        )
      ),
    ])
    .range([height - margin.bottom, margin.top]);

  const revenueCategories = [
    "ticket_sales",
    "broadcasting",
    "domesticSponsorship",
    "internationalSponsorship",
    "totalRevenue",
  ];

  const costCategories = ["venues", "organization", "other", "totalCost"];

  const revenueColor = d3
    .scaleOrdinal()
    .domain(revenueCategories)
    .range(d3.schemeReds[revenueCategories.length]);

  const costColor = d3
    .scaleOrdinal()
    .domain(costCategories)
    .range(d3.schemeBlues[costCategories.length]);

  return (
    <div>
      <Nav />
      <div className="text-white ml-[5%] absolute bottom-[10%]">
        <p>revenue</p>
        <div className="flex flex-row mt-5">
          <div className="w-[3vw] mr-2 bg-red-200"></div>
          ticket sales
        </div>
        <div className="flex flex-row mt-5">
          <div className="w-[3vw] mr-2 bg-red-300"></div>
          broadcasting
        </div>
        <div className="flex flex-row mt-5">
          <div className="w-[3vw] mr-2 bg-red-400"></div>
          domestic sponsorship
        </div>
        <div className="flex flex-row mt-5">
          <div className="w-[3vw] mr-2 bg-red-500"></div>
          international sponsorship
        </div>
        <div className="flex flex-row mt-5">
          <div className="w-[3vw] mr-2 bg-red-600"></div>
          total revenue
        </div>
        <p className="mt-[15%]">costs</p>
        <div className="flex flex-row mt-5">
          <div className="w-[3vw] mr-2 bg-blue-200"></div>
          venues
        </div>
        <div className="flex flex-row mt-5">
          <div className="w-[3vw] mr-2 bg-blue-300"></div>
          organization
        </div>
        <div className="flex flex-row mt-5">
          <div className="w-[3vw] mr-2 bg-blue-400"></div>
          other
        </div>
        <div className="flex flex-row mt-5">
          <div className="w-[3vw] mr-2 bg-blue-500"></div>
          totalCost
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-semibold mb-4">Data Visualization</h1>
        <div className="overflow-x-auto w-full max-w-[75vw] absolute right-0">
          <svg width={width} height={height} className="mainCont mx-auto">
            {/* X-axis labels */}
            <g transform={`translate(0, ${height - margin.bottom})`}>
              {data.map((d) => (
                <text
                  x={xScale(d.year) + xScale.bandwidth() / 1.8}
                  key={`year-${d.year}`}
                  y={35}
                  textAnchor="end"
                  fill="white"
                  className="text-xs font-medium text-white rounded-full"
                >
                  {d.year}
                </text>
              ))}
            </g>
            {/* Flags */}
            <g transform={`translate(0, ${height - margin.bottom})`}>
              {data.map((d, index) => (
                <image
                  key={`flag-${index}-${d.year}`}
                  x={xScale(d.year) + xScale.bandwidth() / 2 - 18}
                  y={40}
                  href={d.flag}
                  width="30"
                  height="20"
                  className="flag-image"
                />
              ))}
            </g>

            {/* Revenue and Cost Bars */}
            {data.map((d, dataIndex) => {
              const xPos = xScale(d.year) + xScale.bandwidth() / 2;

              let currentRevenueY = yScale(0);
              let currentCostY = yScale(0);

              const revenueLines = revenueCategories.map((key) => {
                const value = d.revenue[key];
                if (!value) return null;

                const lineHeight = yScale(0) - yScale(value);
                const yEnd = currentRevenueY - lineHeight;
                const yStart = currentRevenueY;
                currentRevenueY = yEnd - spacing;

                return (
                  <Link
                    key={`${d.year}-revenue-${key}`}
                    href={`/detail/${d.year}`}
                  >
                    <motion.line
                      x1={xPos + columnOffset}
                      y1={yStart}
                      x2={xPos + columnOffset}
                      y2={yEnd}
                      stroke={revenueColor(key)}
                      strokeWidth={lineThickness}
                      strokeLinecap="round"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 1 }}
                      className="cursor-pointer"
                    />
                  </Link>
                );
              });

              const costLines = costCategories.map((key) => {
                const value = d.cost[key];
                if (!value) return null;

                const lineHeight = yScale(0) - yScale(value);
                const yEnd = currentCostY - lineHeight;
                const yStart = currentCostY;
                currentCostY = yEnd - spacing;

                return (
                  <Link
                    key={`${d.year}-cost-${key}`}
                    href={{
                      pathname: `/detail/country/${d.country}`,
                      query: { data: JSON.stringify(d) },
                    }}
                  >
                    <motion.line
                      x1={xPos - columnOffset}
                      y1={yStart}
                      x2={xPos - columnOffset}
                      y2={yEnd}
                      stroke={costColor(key)}
                      strokeWidth={lineThickness}
                      strokeLinecap="round"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 1 }}
                      className="cursor-pointer"
                    />
                  </Link>
                );
              });

              return (
                <g key={`bars-${d.year}-${dataIndex}`}>
                  {revenueLines}
                  {costLines}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HexbinChart;
