import React from "react";

const Nav = () => {
  return (
    <nav>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="text-white">
          <p>E€ONOMIC IMPACT OF THE</p>
          <p>Olympic Games</p>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white -lg md:hidden focus:outline-none"
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
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 md:p-0 mt-4 border  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
            <li className="">
              <a
                href="#"
                className="block py-2 px-3 bodyFont text-white hover:text-orange-500 hover:font-regular "
              >
                Years
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 bodyFont text-white hover:text-orange-500 hover:font-regular "
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 bodyFont text-white hover:text-orange-500 hover:font-regular "
              >
                Sources
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
