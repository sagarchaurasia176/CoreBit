import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { StataManage } from "../context/StataManage";

const HeaderNavbar = () => {
  // useContext
  const authenticated = useContext(StataManage);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const MoveToRegisterPages = () => {
    navigate("/Register");
  };

  const MoveToLoginPage = () => {
    navigate("/Login");
  };

  const toggleMenu = () => {
    setShow(!show);
  };
  
  return (
    <>
      <header className="bg-slate-950 fixed shadow-md w-full  z-10 text-white body-font h-16">
        <div className="mx-auto flex  ml-32 lenis-smooth p-3 items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-green-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl text-white">CoreBit</span>
          </Link>

          {/* pending applied */}
          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:w-2/5 mx-12 items-center justify-center">
            <ul className="flex flex-1   justify-between items-center m-auto">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/About">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/MyBlog">All-Notes</Link>
              </li>
            </ul>
          </nav>

          {/* Signup Button */}
          <div className="lg:w-2/5 flex flex-1  lg:ml-0">
            <button
              onClick={MoveToRegisterPages}
              className="hidden sm:inline-flex items-center  border-0 py-1 px-3 focus:outline-none hover:bg-slate-800 hover:animate-pulse hover:transition rounded text-base mt-4 md:mt-0"
            >
              Signup
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
          {/* isAuthenticated  */}
          {!authenticated ? (
            <>
              <div className="lg:w-2/5 flex  justify-between ml-5 lg:ml-0">
                <button
                  onClick={MoveToLoginPage}
                  className="hidden sm:inline-flex items-center border-0 py-1 px-3 focus:outline-none hover:bg-slate-800 hover:animate-pulse hover:transition rounded text-base mt-4 md:mt-0"
                >
                  Login
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-1"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="lg:w-2/5 flex justify-end ml-5 lg:ml-0">
                <button
                  onClick={MoveToRegisterPages}
                  className="hidden sm:inline-flex items-center border-0 py-1 px-3 focus:outline-none hover:bg-slate-800 hover:animate-pulse hover:transition rounded text-base mt-4 md:mt-0"
                >
                  Logout
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-1"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <div
            onClick={toggleMenu}
            className="text-white cursor-pointer flex justify-end mr-4 mt-[-10px] transition-all duration-150 md:hidden"
          >
            {show ? <IoClose size={24} /> : <FaBars size={24} />}
          </div>
        </div>

        {/* Mobile Navigation */}
        {show && (
          <nav className="flex flex-col justify-center items-center h-screen bg-slate-950 text-white md:hidden">
            <Link to="/" onClick={toggleMenu} className="py-2">
              Home
            </Link>
            <Link to="/About" onClick={toggleMenu} className="py-2">
              About
            </Link>
            <Link to="/contact" onClick={toggleMenu} className="py-2">
              Contact
            </Link>
            <Link to="/MyBlog" onClick={toggleMenu} className="py-2">
              All-Notes
            </Link>
            {/* Signup Button for Mobile */}
            <button
              onClick={MoveToRegisterPages}
              className="border-0 py-1 px-3 focus:outline-none hover:bg-slate-800 hover:animate-pulse hover:transition rounded text-base flex justify-center items-center bg-white text-black mt-4"
            >
              Signup
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </nav>
        )}
      </header>
    </>
  );
};

export default HeaderNavbar;

// <div className=" md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg  p-8 flex  flex-col   mt-10  md:mt-0">
// <h2 className="text-white text-lg font-medium title-font mb-5">
//   Sign Up
// </h2>
// <div className="relative mb-4">
//   <label
//     htmlFor="full-name"
//     className="leading-7 text-sm text-gray-400"
//   >
//     Full Name
//   </label>
//   <input
//     type="text"
//     id="full-name"
//     name="full-name"
//     className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-green-900 rounded border border-gray-600 focus:border-green-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//   />
// </div>
// <div className="relative mb-4">
//   <label
//     htmlFor="email"
//     className="leading-7 text-sm text-gray-400"
//   >
//     Email
//   </label>
//   <input
//     type="email"
//     id="email"
//     name="email"
//     className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-green-900 rounded border border-gray-600 focus:border-green-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//   />
// </div>
// <button className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
//   Button
// </button>
// <p className="text-xs mt-3">
//   Literally you probably haven't heard of them jean shorts.
// </p>
// </div>
