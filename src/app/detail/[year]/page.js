"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Detail = ({ params }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(null);

  useEffect(() => {
    params.then((resolvedParams) => {
      const { year } = resolvedParams;
      setYear(year);

      fetch("/data/dataOly.json")
        .then((response) => response.json())
        .then((jsonData) => {
          const selectedData = jsonData.find((d) => d.year === year);
          setData(selectedData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    });
  }, [params]);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No data found for {year}</p>;

  return (
    <div>
      <div className="px-[3%] py-[3%]">
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
      </div>

      {/* 
      <div>
        <div className="flex flex-row  px-[5%] items-center align-middle">
          <h1 className="text-4xl font-bold py-[3%]">{data.year}</h1>
          <div className="px-5">
            <div class="h-[5vh] w-0.5 self-stretch bg-neutral-100"></div>
          </div>
          <img className="w-[4vw] h-[4vh]" src={data.flag}></img>
        </div>
      </div>

      <div className="flex flex-row">
        {/***** TEXT ALINEA ******/}
      {/*   <div className="text-container flex-1 max-w-[35%] mt-[20%] px-[5%]">
          <div className="flex flex-row items-center">
            <span className="text-3xl font-medium">
              <span className="text-3xl font-bold pr-3">{data.city},</span>
              {data.country}
              <span className="text-[20px]">sources</span>
            </span>
          </div>

          <p className="font-bold pt-5">
            {data.explanationIntro} <br /> <br />
          </p>
          <p>{data.explanationLong}</p>
        </div>

        {/***** GRID ******/}
      {/* <div className="grid grid-cols-4 grid-rows-3 gap-4 flex-1 max-w-[60%] text-black">
          <div className="gridPanel col-start-1 row-start-1">
            <p>Venues: {data.cost.venues}</p>
            <p>organization: {data.cost.organization}</p>
            <p>Other: {data.cost.other}</p>
          </div>
          <div className="gridPanel col-start-2 row-start-1 "></div>
          <div className="gridPanel col-start-3 col-end-5 row-start-1 ">
            <div className="mt-5 mx-5">
              <p className="font-light text-[25px]">COMPARED TO LAST YEAR</p>
              <div className="font-medium text-[40px]">+ $1000</div>
            </div>
          </div>
          <div className="gridPanel row-start-2 row-end-4 col-start-1 col-end-3 ">
            <div className="mt-5 mx-5">
              <p className="font-light text-[25px]">TOTAL COSTS</p>
              <div className="font-medium text-[40px]">
                {data.revenue.totalRevenue}
              </div>
            </div>
          </div>
          <div className="gridPanel row-start-2 col-start-3 col-end-5 ">
            <div className="mt-5 mx-5">
              <p className="font-light text-[25px]">TOTAL ATHLETES</p>
              <div className="font-medium text-[40px]">
                {data.totalAthelets}
              </div>
            </div>
          </div>

          <div className="gridPanel row-start-3 col-start-3 col-end-5 ">
            <p>Broadcasting: {data.revenue.broadcasting}</p>
            <p>Merchandising: {data.revenue.merchandising}</p>
            <p>Ticket Sales: {data.revenue.ticket_sales}</p>
            <p>Sponsorship: {data.revenue.sponsorship}</p>
          </div>
        </div>
      </div> */}

      <div className="grid grid-cols-4 grid-rows-9 gap-4 flex-1 w-[90vw] h-[80vh] text-black absolute left-[60%] top-[55%] transform -translate-x-1/2 -translate-y-1/2">
        <div className="gridPanel col-start-1 col-end-2 row-start-2 row-end-4">
          <div className="p-5"></div>
        </div>
        <div className="gridPanel col-start-2 col-end-4 row-start-1 row-end-5">
          <div className="p-5">
            <a className="border border-black p-2 rounded-md">SOURCE</a>
          </div>
          <div className="p-5">
            <p>
              TOTAL REVENUE: <br />
            </p>
            {data.revenue.totalRevenue}
            <p>
              TOTAL COST: <br />
            </p>
            {data.cost.totalCost}
          </div>
        </div>
        <div className="gridPanel col-start-1 col-end-2 row-start-4 row-end-6">
          <div className="p-5">
            <a className="border border-black p-2 rounded-md">SOURCE</a>
          </div>
          <div className="p-5">
            <p>
              TOTAL EVENTS: <br />
            </p>
            {data.totalEvents}
          </div>
        </div>
        <div className="gridPanel col-start-2 col-end-3 row-start-5 row-end-7">
          <div className="p-5">
            <a className="border border-black p-2 rounded-md">SOURCE</a>
          </div>
          <div className="p-5">
            <p>
              TOTAL ATHLETES: <br />
            </p>
            {data.totalAthelets}
          </div>
        </div>
        <div className="gridPanel col-start-2 col-end-3 row-start-7 row-end-9">
          <div className="p-5">
            <a className="border border-black p-2 rounded-md">SOURCE</a>
          </div>
          <div className="p-5">
            <p>
              TOTAL COUNTRIES: <br />
            </p>
            {data.Number_countries}
          </div>
        </div>
        <div className="gridPanel col-start-3 col-end-4 row-start-5 row-end-8">
          <div className="p-5">
            <div className="flex flex-row">
              <img className="w-[5vw]" src={data.flag}></img>
              <p>{data.year}</p>
            </div>
            <p>
              {data.city}, {data.country}
            </p>
            <p className="pt-3 font-normal">{data.explanationIntro}</p>
            <p className="pt-3 font-light">{data.explanationLong}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
