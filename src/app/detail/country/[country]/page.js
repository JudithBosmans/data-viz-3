"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import MiniMap from "../../../components/MiniMap";
import Nav from "../../../components/Nav";

const CountryDetail = ({ params }) => {
  const [country, setCountry] = useState(null); // State to store the unwrapped country param
  const searchParams = useSearchParams();
  const rawData = searchParams.get("data");
  let countryInfo;

  try {
    // Decode and parse the country data
    countryInfo = rawData ? JSON.parse(decodeURIComponent(rawData)) : null;
  } catch (error) {
    console.error("Error decoding country data:", error);
    countryInfo = null;
  }

  // Unwrap `params` using useEffect
  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params;
      setCountry(resolvedParams.country);
    }
    fetchParams();
  }, [params]);

  return (
    <div>
      <Nav />
      <div className="w-[80%] bodyFont centerCont">
        <header className="mt-[5%]">
          <Link href="/">
            <svg
              className="w-6 h-6 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14M5 12l4-4m-4 4 4 4"
              />
            </svg>
          </Link>
        </header>
        <div className="mt-[20%] flex flex-row justify-between">
          <div className="w-[60%]">
            {country && <MiniMap selectedCountry={country} />}
          </div>
          <div className="w-[40%] ">
            {country ? <h1></h1> : <h1>Loading country details...</h1>}
            {countryInfo ? (
              <div className="bodyFont ml-[5%]">
                <h2 className="bodyLilBigger italic">{countryInfo.year}</h2>
                <h2 className="littleSubtitle">
                  {countryInfo.city}, {countryInfo.country}
                </h2>
                {/* <img
              className="w-[10px]"
              src={countryInfo.flag}
              alt={`${country} flag`}
            /> */}
                <p className="mt-[2%] w-[90%]">
                  {countryInfo.explanationIntro}
                </p>

                <div className="grid grid-cols-4 grid-rows-8 gap-4 mt-[15%] ">
                  <div>
                    <p className="bodyLilBigger">Costs</p>
                  </div>
                  <div></div>
                  <div>
                    <p className="bodyLilBigger">Revenue</p>
                  </div>
                  <div></div>
                  <div className="row-start-2">
                    <p>venues</p>
                  </div>
                  <div className="row-start-2">
                    <p className="text-blue-200">{countryInfo.cost.venues}</p>
                  </div>
                  <div className="row-start-2">
                    <p>ticket sales</p>
                  </div>
                  <div className="row-start-2">
                    <p className="text-red-200">
                      {countryInfo.revenue.ticket_sales}
                    </p>
                  </div>
                  <div className="row-start-3">
                    <p>organization</p>
                  </div>
                  <div className="row-start-3">
                    <p className="text-blue-300">
                      {countryInfo.cost.organization}
                    </p>
                  </div>
                  <div className="row-start-3">
                    <p>broadcasting</p>
                  </div>
                  <div className="row-start-3">
                    <p className="text-red-300">
                      {countryInfo.revenue.broadcasting}
                    </p>
                  </div>
                  <div className="row-start-4">
                    <p>other</p>
                  </div>
                  <div className="row-start-4">
                    <p className="text-blue-400">{countryInfo.cost.other}</p>
                  </div>
                  <div className="row-start-4">
                    <p>domestic sponsorship</p>
                  </div>
                  <div className="row-start-4">
                    <p className="text-red-400">
                      {countryInfo.revenue.domesticSponsorship}
                    </p>
                  </div>
                  <div className="row-start-5">
                    <p className="italic">total cost</p>
                  </div>
                  <div className="row-start-5">
                    <p className="text-blue-500">
                      {countryInfo.cost.totalCost}
                    </p>
                  </div>
                  <div className="row-start-5">
                    <p>international sponsorship</p>
                  </div>
                  <div className="row-start-5">
                    <p className="text-red-500">
                      {countryInfo.revenue.internationalSponsorship}
                    </p>
                  </div>
                  <div className="row-start-6 col-start-3">
                    <p className="italic">total revenue</p>
                  </div>
                  <div className="row-start-6 col-start-4">
                    <p className="text-red-600">
                      {countryInfo.revenue.totalRevenue}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p>No additional information available.</p>
            )}
          </div>
        </div>
      </div>
    </div>  
  );
};

export default CountryDetail;
