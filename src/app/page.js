"use client";

import { useState, useEffect } from "react";

import HomeElements from "./components/HomeElements";
import Map from "./components/Map";
import Map2 from "./components/Map2";
import Map3 from "./components/Map3";

import Nav from "../app/components/Nav";
import LoadingScreen from "../app/components/Loading";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const handleMapLoadComplete = () => {
    setIsLoading(false); // Hide loading screen when Map2 is ready
  };

  useEffect(() => {
    // Simulate a loading delay (e.g., fetching data)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the delay as needed

    return () => clearTimeout(timer); // Cleanup
  }, []);
  return (
    <div>
      {/* <Map3 /> */}
      {isLoading && <LoadingScreen />} 
      <Nav onLoadComplete={handleMapLoadComplete} />
      <Map2 onLoadComplete={handleMapLoadComplete} />
      {/* <Map /> */}
      {/* <Data />
      <HomeElements /> */}
    </div>
  );
}
