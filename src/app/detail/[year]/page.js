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
            className="w-6 h-6 text-white hover:text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>

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
        <div className="text-container flex-1 max-w-[35%] mt-[20%] px-[5%]">
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
        <div className="grid grid-cols-4 grid-rows-3 gap-4 flex-1 max-w-[60%] text-black">
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
      </div>
    </div>
  );
};

export default Detail;
