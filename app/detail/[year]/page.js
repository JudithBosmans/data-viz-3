"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const Detail = ({ params }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(null);
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

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

  const handleSourceClick = (content) => {
    setModalContent(content);
    setOpen(true);
  };

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No data found for {year}</p>;

  return (
    <div>
      <div className="px-[3%] py-[3%]">
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
      </div>

      <Dialog open={open} onClose={setOpen} className="relative z-10 ">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-[screen] overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className=" relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  {/* Icon */}
                  <div className="mx-auto flex items-center justify-center rounded-full">
                    <svg
                      className="w-15 h-15 text-gray-800"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m8.032 12 1.984 1.984 4.96-4.96m4.55 5.272.893-.893a1.984 1.984 0 0 0 0-2.806l-.893-.893a1.984 1.984 0 0 1-.581-1.403V7.04a1.984 1.984 0 0 0-1.984-1.984h-1.262a1.983 1.983 0 0 1-1.403-.581l-.893-.893a1.984 1.984 0 0 0-2.806 0l-.893.893a1.984 1.984 0 0 1-1.403.581H7.04A1.984 1.984 0 0 0 5.055 7.04v1.262c0 .527-.209 1.031-.581 1.403l-.893.893a1.984 1.984 0 0 0 0 2.806l.893.893c.372.372.581.876.581 1.403v1.262a1.984 1.984 0 0 0 1.984 1.984h1.262c.527 0 1.031.209 1.403.581l.893.893a1.984 1.984 0 0 0 2.806 0l.893-.893a1.985 1.985 0 0 1 1.403-.581h1.262a1.984 1.984 0 0 0 1.984-1.984V15.7c0-.527.209-1.031.581-1.403Z"
                      />
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-[25px] text-base font-semibold text-gray-900"
                    >
                      Sources
                    </DialogTitle>
                    <div
                      className="mt-5 max-h-60 overflow-y-auto"
                      style={{ wordWrap: "break-word" }}
                    >
                      {Object.entries(data.sources).map(([key, value]) => (
                        <p key={key} className="text-sm text-gray-500 pt-2">
                          {value}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      <div className="grid grid-cols-4 grid-rows-12 gap-3 flex-1 w-[90vw] h-[80vh] text-black absolute left-[60%] top-[55%] transform -translate-x-1/2 -translate-y-1/2">
        {/* CARD 1 */}
        <div className="gridPanel col-start-1 col-end-2 row-start-2 row-end-4">
          <div className="p-5">
            <a className="border border-black p-2 rounded-md">SOURCE</a>
          </div>
        </div>

        {/*********************
         ************ CARD 2 */}
        <div className="gridPanel col-start-2 col-end-4 row-start-1 row-end-5 relative  shadow-lg">
          <div className="p-5">
            <button
              className="border border-black p-2 rounded-md"
              onClick={() => handleSourceClick("Source information for card 1")}
            >
              SOURCE
            </button>
          </div>
          <div className="flex flex-col">
            <div className="pl-5">
              <p className="gridTitle">TOTAL REVENUE:</p>
              <p className="gridNumber">{data.revenue.totalRevenue}</p>
            </div>
            <div className="pl-5">
              <p className="gridTitle">TOTAL COST:</p>
              <p className="gridNumber">{data.cost.totalCost}</p>
            </div>
          </div>
        </div>

        {/* CARD 3 */}
        <div className="gridPanel col-start-1 col-end-2 row-start-4 row-end-6">
          <div className="p-5">
            <div>
              <p className="gridTitleSmall">
                TOTAL EVENTS: <br />
              </p>
            </div>

            <div className="flex flex-row items-center gap-10 pt-8">
              <div className="gridNumberSmall"> {data.totalEvents}</div>{" "}
              <div>
                <a className="border border-black p-2 rounded-md">SOURCE</a>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 4 */}
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

        {/* CARD 5 */}
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

        {/* CARD 6 */}
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
