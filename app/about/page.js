"use client";
import React from "react";
import CountUp from "react-countup";

import Nav from "../Nav/page";

const page = () => {
  return (
    <section>
      <Nav />
      <div className="text-white max-w-[50%] flex flex-col justify-center  mx-auto mt-[10%]">
        <div className="max-w-screen-md mb-8 lg:mb-16">
          <h2 className=" text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            What's it about?
          </h2>
        </div>
        <p className="bodyLilBigger tracking-wide ">
          This website is made as assignment for the course
          <span className="italic bodyBold"> Data Visualization </span>
          at <span className="italic bodyBold"> LUCA School Of Arts </span>. For
          this course we had to pick data related to the olympic games and
          visualise it.
          <br />
          <br />
          This website focusses on
          <span className="italic bodyBold"> financial data </span> of the
          Olympic games, more specifically; how many was spent and how many was
          earned. It is a clear general trend that countries often spend almost
          double of what they earn.
        </p>
        <p className="bodyLilBigger mt-[5%] italic">
          This website was created by &nbsp;
          <a
            href="https://www.linkedin.com/in/judith-bosmans-527428145/"
            target="_blank"
            className="hover:text-orange-500 hover:font-medium"
          >
            @Judith.Bosmans
          </a>
        </p>
      </div>
      <div className="max-w-[50%] px-4 py-5 mx-auto text-center lg:py-16 lg:px-6 ">
        <dl className="grid max-w-screen-md gap-8 mx-auto sm:grid-cols-3 text-white">
          <div className="flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
              <CountUp
                start={0}
                end={16}
                duration={4}
                decimals={0}
                decimal="."
                prefix=""
                suffix="+"
              />
            </dt>
            <dd className="font-light text-white">host countries</dd>
          </div>
          <div className="flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
              <CountUp
                start={0}
                end={31.71}
                duration={4}
                decimals={2}
                decimal="."
                prefix="$"
                suffix="b+"
              />
            </dt>
            <dd className="font-light text-white">total money earned</dd>
          </div>
          <div className="flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
              <CountUp
                start={0}
                end={53.95}
                duration={4}
                decimals={2}
                decimal="."
                prefix="$"
                suffix="b+"
              />
            </dt>
            <dd className="font-light text-white">total money spent</dd>
          </div>
        </dl>
      </div>
    </section>
  );
};

export default page;
