import React from "react";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="bg-black w-full">
      <div className="w-[95%] flex items-center justify-between mx-auto p-[2%]">
        {/* Home Icon */}
        <Link href="/">
          <svg
            className="w-6 h-6 text-white hover:text-orange-600 pl-2"
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

        {/* Navigation Links */}
        <div className="hidden md:block">
          <ul className="flex space-x-[70px] pr-4 bodyFont">
            <li>
              <a
                href="/data"
                className="text-white hover:text-orange-500 transition-colors duration-200"
              >
                Years
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="text-white hover:text-orange-500 transition-colors duration-200"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/sources"
                className="text-white hover:text-orange-500 transition-colors duration-200"
              >
                Sources
              </a>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white md:hidden focus:outline-none"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Nav;
