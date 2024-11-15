import React from "react";
import Link from "next/link";

const Detail = () => {
  return (
    <div>
      <div className="pl-[5%]">
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

      <div className="flex flex-row">
        {/***** TEXT ALINEA ******/}
        <div className="text-container flex-1 max-w-[35%] mt-[25%] px-[5%]">
          <div className="flex flex-row items-center">
            <span>Belgium</span>
            <span className="pl-5">
              <svg
                className="w-8 h-8 text-white"
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
                  strokeWidth="2"
                  d="M2.9917 4.9834V18.917M9.96265 4.9834V18.917M15.9378 4.9834V18.917m2.9875-13.9336V18.917"
                />
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  d="M5.47925 4.4834V19.417m1.9917-14.9336V19.417M21.4129 4.4834V19.417M13.4461 4.4834V19.417"
                />
              </svg>
            </span>
          </div>

          <p className="font-bold">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper <br /> <br />
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
            consequat.
            <br /> <br />
            Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
            molestie consequat. Lorem ipsum dolor sit amet, cons ectetuer
            adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
            dolore magna aliquam erat volutpat.
          </p>
        </div>

        {/***** GRID ******/}
        <div className="grid grid-cols-4 grid-rows-3 gap-4 flex-1 max-w-[60%] ">
          <div className="gridPanel col-start-1 row-start-1 ">1</div>
          <div className="gridPanel col-start-2 row-start-1 ">2</div>
          <div className="gridPanel col-start-3 col-end-5 row-start-1 ">3</div>
          <div className="gridPanel row-start-2 row-end-4 col-start-1 col-end-3 ">
            4
          </div>
          <div className="gridPanel row-start-2 col-start-3 col-end-5 ">6</div>

          <div className="gridPanel row-start-3 col-start-3 col-end-5 ">9</div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
