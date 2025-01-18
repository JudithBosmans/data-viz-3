"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import MiniMap from "../../../components/MiniMap";

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
    <div className="w-[80%] bodyFont centerCont">
      <header className="mt-[5%]">
        <Link href="/">
          <svg
            class="w-6 h-6 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
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
            <div className="bodyFont">
              <h2>{countryInfo.year}</h2>
              <h2 className="littleSubtitle">
                {countryInfo.city}, {countryInfo.country}
              </h2>
              {/* <img
              className="w-[10px]"
              src={countryInfo.flag}
              alt={`${country} flag`}
            /> */}
              <p className="mt-10 w-[80%]">{countryInfo.explanationIntro}</p>

              <div className="flex flex-row">
                <div className="mt-[5%]">
                  <p>Costs</p>
                  <p>
                    venues&nbsp; <span>{countryInfo.cost.venues}</span>
                  </p>
                  <p>
                    organization&nbsp;{" "}
                    <span>{countryInfo.cost.organization}</span>
                  </p>
                  <p>
                    other&nbsp; <span>{countryInfo.cost.other}</span>
                  </p>
                  <p>
                    total cost&nbsp; <span>{countryInfo.cost.totalCost}</span>
                  </p>
                </div>
                <div className="mt-[5%]">
                  <p>Revenue</p>
                  <p>
                    ticket sales&nbsp;{" "}
                    <span>{countryInfo.revenue.ticket_sales}</span>
                  </p>
                  <p>
                    broadcasting&nbsp;{" "}
                    <span>{countryInfo.revenue.broadcasting}</span>
                  </p>
                  <p>
                    domestic sponsorship&nbsp;
                    <span>{countryInfo.revenue.domesticSponsorship}</span>
                  </p>
                  <p>
                    international sponsorship&nbsp;
                    <span>{countryInfo.revenue.internationalSponsorship}</span>
                  </p>
                  <p>
                    totalRevenue&nbsp;{" "}
                    <span>{countryInfo.revenue.totalRevenue}</span>
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
  );
};

export default CountryDetail;
