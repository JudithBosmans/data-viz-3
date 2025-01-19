import React from "react";

import Nav from "../Nav/page";

const page = () => {
  return (
    <section>
      <Nav />
      <div className="mt-[10%] bodyFont py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="max-w-screen-md mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Sources used in building this website
          </h2>
          <p className="text-white">
            You can find a more complete list of libraries and sources in the
            README.md file on github, but here are the three most essential
            sources for this wesbite.
          </p>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          <div>
            <div className="flex  items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <svg
                className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
                fill="white"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">
              world.geo.json
            </h3>
            <p className="text-white bodyFont">
              To mock something fast and loose with geo-json data for the world,
              this is your fix. Legal status of this dataset: dubious?
              <br /> <br />
              You might prefer world-atlas or us-atlas instead, if that is an
              issue. As a bonus, that will give you not just attributable
              sources, but topology preservation across features and much
              smaller files than native geo-json offers. It`s the future.
            </p>

            <a
              href="https://github.com/johan/world.geo.json/blob/master/README.md"
              target="_blank"
              type="button"
              className="max-w-[45%] mt-8 flex flex-row bodyFont pt-1.5 pb-1 px-5 me-2 mb-2 text-sm font-medium focus:outline-none rounded-full border text-white border-white hover:border-orange-600 hover:text-orange-600"
            >
              Check it out
              <svg
                className="w-6 h-6 ml-2 "
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
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </a>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <svg
                className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
                fill="white"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">D3 js</h3>
            <p className="text-white">
              D3 (or D3.js) is a free, open-source JavaScript library for
              visualizing data. Its low-level approach built on web standards
              offers unparalleled flexibility in authoring dynamic, data-driven
              graphics. <br /> <br />
              For more than a decade D3 has powered groundbreaking and
              award-winning visualizations, become a foundational building block
              of higher-level chart libraries, and fostered a vibrant community
              of data practitioners around the world.
              <br /> <br />
            </p>
            <a
              href="https://observablehq.com/@d3/world-choropleth/2"
              target="_blank"
              type="button"
              className="max-w-[45%] mt-8 flex flex-row bodyFont pt-1.5 pb-1 px-5 me-2 mb-2 text-sm font-medium focus:outline-none rounded-full border text-white border-white hover:border-orange-600 hover:text-orange-600"
            >
              Check it out
              <svg
                className="w-6 h-6 ml-2 "
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
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </a>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <svg
                className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
                fill="white"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Dataset</h3>
            <p className="text-white">
              Dataset on major revenues (ticketing, sponsoring, broadcasting)
              and costs (organisation, sports venues) for the Olympic Games
              (Summer and Winter) and the Mens Football (Soccer) World Cup from
              the 1960s to the late 2010s. Data are in original currency and in
              USD2018 reported. Sources are reported. (2022-04-29)
              <br /> <br />
              Müller, M., Gogishvili, D. and Wolfe, S.D. (2022)
            </p>
            <a
              href="https://doi.org/10.7910/dvn/cpqehn"
              target="_blank"
              type="button"
              className="max-w-[45%] mt-8 flex flex-row bodyFont pt-1.5 pb-1 px-5 me-2 mb-2 text-sm font-medium focus:outline-none rounded-full border text-white border-white hover:border-orange-600 hover:text-orange-600"
            >
              Check it out
              <svg
                className="w-6 h-6 ml-2 "
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
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
