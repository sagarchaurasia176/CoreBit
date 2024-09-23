import React from "react";
import { Link } from "react-router-dom";

const HeaderNavbar = () => {
  return (
    <>
      <header className="bg-slate-950 fixed shadow-md  w-full z-10 text-white body-font h-16">
        <div className="container mx-auto sm:flex-row flex    p-3 flex-col md:flex-row items-center">
          <nav className="flex justify-evenly lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
            <Link to="/">Home</Link>
            <Link to="/About">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/MyBlog">All-Notes</Link>
          </nav>
          <a className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-10 h-10 text-white p-2 bg-green-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl text-white">CoreBit</span>
          </a>
          <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
            <button className="inline-flex items-center border-0 py-1 px-3 focus:outline-none hover:bg-slate-800 hover:animate-pulse hover:transition rounded text-base mt-4 md:mt-0">
              Signup
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderNavbar;
