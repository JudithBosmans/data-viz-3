import React, { useState, useEffect } from "react";
import DottedMap from "dotted-map";

const MapComponent = () => {
  const [mapSVG, setMapSVG] = useState("");

  useEffect(() => {
    const map = new DottedMap({
      height: 200,
      width: 200,
      countries: [
        "FRA",
        "BEL",
        "DEU",
        "NLD",
        "ITA",
        "ESP",
        "GBR",
        "SWE",
        "NOR",
        "DNK",
      ],
      grid: "vertical",
      avoidOuterPins: true,
    });

    // Generate the base SVG
    let svg = map.getSVG({
      shape: "circle",
      backgroundColor: "black",
      color: "gray",
      radius: 0.5,
    });

    // Modify SVG directly to make dots in France red
    svg = svg.replace(/<circle.*?data-country="FRA".*?\/>/g, (match) =>
      match.replace('fill="gray"', 'fill="red"')
    );

    setMapSVG(svg);
  }, []);

  return (
    <div
      className="map-container"
      dangerouslySetInnerHTML={{ __html: mapSVG }}
      style={{ width: "50%", height: "auto" }}
    />
  );
};

export default MapComponent;
