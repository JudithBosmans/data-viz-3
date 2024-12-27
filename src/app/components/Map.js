import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Map2WithDots = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const width = canvas.offsetWidth || 800; // Fallback width
    const height = canvas.offsetHeight || 400; // Adjusted for 2:1 aspect ratio

    canvas.width = width;
    canvas.height = height;

    // Set up the projection
    const projection = d3
      .geoNaturalEarth1()
      .scale(width / 6.28) // Adjust scale to fit the world map (6.28 = 2π for world circumference)
      .translate([width / 2, height / 2]); // Center the map

    // Get the context
    const ctx = canvas.getContext("2d");

    // Geographic path generator
    const pathGenerator = d3.geoPath(projection, ctx);

    // Load and draw the map
    d3.json("/data/geojson.json") // Local file path
      .then((data) => {
        if (!data) {
          console.error("Failed to load GeoJSON data.");
          return;
        }

        console.log("GeoJSON data loaded:", data);

        // Draw dots for each country
        data.features.forEach((feature, featureIndex) => {
          const bounds = pathGenerator.bounds(feature);
          const [x0, y0] = bounds[0];
          const [x1, y1] = bounds[1];

          // Adjust dot density
          const dotSpacing = 5; // Adjust spacing for better performance

          for (let x = x0; x < x1; x += dotSpacing) {
            for (let y = y0; y < y1; y += dotSpacing) {
              const point = projection.invert([x, y]);
              if (point && d3.geoContains(feature, point)) {
                ctx.beginPath();
                ctx.arc(x, y, 1, 0, 2 * Math.PI);
                ctx.fillStyle = d3.color(
                  d3.interpolateRainbow(featureIndex / data.features.length)
                );
                ctx.fill();
              }
            }
          }
        });

        console.log("Map drawing completed.");
      })
      .catch((error) => {
        console.error("Error loading GeoJSON data:", error);
      });
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="my_dataviz"
      style={{ width: "100%", height: "400px" }} // Adjusted height for 2:1 aspect ratio
    ></canvas>
  );
};

export default Map2WithDots;
