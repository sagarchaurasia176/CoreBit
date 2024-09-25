import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const HeaderNavbar = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const MoveToRegisterPages = () => {
    navigate("/Register");
  };

  const toggleMenu = () => {
    setShow(!show);
  };
// 👉PENDING 
  return (
    <>
      <header className="bg-slate-950 fixed shadow-md w-full  z-10 text-white body-font h-16">
        <div className="mx-auto flex flex-1 justify-between lenis-smooth p-3 items-center">
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
          <div className="lg:w-2/5 flex justify-end ml-5 lg:ml-0">
            <button
              onClick={MoveToRegisterPages}
              className="hidden sm:inline-flex items-center border-0 py-1 px-3 focus:outline-none hover:bg-slate-800 hover:animate-pulse hover:transition rounded text-base mt-4 md:mt-0"
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
