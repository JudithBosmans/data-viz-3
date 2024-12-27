"use client";

import React, { useState, useEffect } from "react";
import DottedMap from "dotted-map";
import * as d3 from "d3";

console.log("Hello World from Map2 component!");

const Map2 = () => {
  const [mapSVG, setMapSVG] = useState("");

  useEffect(() => {
    console.log("useEffect executed!");

    const generateMap = async () => {
      try {
        console.log("Starting map generation...");

        // Fetch GeoJSON data
        const response = await fetch("/data/geojson.json");
        if (!response.ok) {
          throw new Error(`Failed to fetch GeoJSON: ${response.statusText}`);
        }
        const geoData = await response.json();
        console.log("GeoJSON data loaded:", geoData);

        const width = 800; // Fixed width
        const height = 400; // Adjusted for a 2:1 aspect ratio

        // Set up the projection
        const projection = d3
          .geoNaturalEarth1()
          .scale(width / 6.28) // Adjust scale for the map
          .translate([width / 2, height / 2]); // Center the map
        console.log("Projection set up.");

        // Create a new DottedMap instance
        const map = new DottedMap({
          height: 60, // Grid size of the dotted map
          grid: "diagonal", // Diagonal grid for dots
        });
        console.log("DottedMap instance created.");

        // Add dots within each country's shape
        geoData.features.forEach((feature, featureIndex) => {
          const pathGenerator = d3.geoPath(projection);
          const bounds = pathGenerator.bounds(feature);
          console.log(`Bounds for feature ${feature.properties.name}:`, bounds);

          const [x0, y0] = bounds[0];
          const [x1, y1] = bounds[1];

          // Dot density
          const dotSpacing = 5; // Adjust for performance and density

          for (let x = x0; x < x1; x += dotSpacing) {
            for (let y = y0; y < y1; y += dotSpacing) {
              const point = projection.invert([x, y]);
              if (point) {
                const contains = d3.geoContains(feature, point);
                if (contains) {
                  console.log(
                    `Adding pin for country ${feature.properties.name} at point:`,
                    point
                  );
                  map.addPin({
                    lat: point[1],
                    lng: point[0],
                    svgOptions: {
                      color: d3.interpolateRainbow(
                        featureIndex / geoData.features.length
                      ),
                      radius: 0.5,
                    },
                    data: { country: feature.properties.name },
                  });
                }
              }
            }
          }
        });

        console.log("All pins added.");

        // Generate SVG from DottedMap
        const svg = map.getSVG({
          shape: "circle",
          backgroundColor: "black",
          color: "white",
          radius: 0.5, // Default radius for points
        });
        console.log("Generated SVG:", svg);

        setMapSVG(svg);
      } catch (error) {
        console.error("Error generating the map:", error);
      }
    };

    generateMap();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "500px",
        backgroundColor: "#000",
      }}
    >
      {mapSVG ? (
        <div dangerouslySetInnerHTML={{ __html: mapSVG }} />
      ) : (
        <p style={{ color: "white" }}>Loading map...</p>
      )}
    </div>
  );
};

export default Map2;
