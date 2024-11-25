"use client";
import Data from "./routes/Data";
import Detail from "./routes/Detail";
import HomeElements from "./routes/HomeElements";

export default function Home() {
  return (
    <div>
      <HomeElements />
      <Data />
      {/* <Detail /> */}
    </div>
  );
}
