import React, { useContext, useEffect, useState } from "react";
import { ContextCreation } from "../../../context/StataManage";
import { buttonsNames } from "../../../api/ButtonData";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../../api/backednToFrontendApi";
import toast from "react-hot-toast";
import {
  FaBars,
  FaHome,
  FaUserAlt,
  FaSignOutAlt,
  FaPlus,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";

// Left sideBars
const LeftBar = ({ setComponents }) => {
  const { profile, isAuth, authenticated, setBlog, setProfile } =
    useContext(ContextCreation);
  const navigate = useNavigate();
  // Toggle sidebar for small screens
  const [show, setShow] = useState(false);
  const toggleNavBar = () => setShow(!show);

  const moveToHomePage =() => {
    navigate("/");
  };
  
 
    if(authenticated){
   
  }

  // LogOut handler
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const LoggedOut = await authAPI.logout();
      alert("Are you sure you want to log out?");
      localStorage.removeItem("coreBits");
      toast.success(LoggedOut.message);
      setBlog([]);

      isAuth(false);
      moveToHomePage();
    } catch (error) {
      console.log("Error during logout", error);
      toast.error(LoggedOut.message);
    }
  };

  return (
    <>
      {/* Sidebar Toggle Button for mobile screens only */}
      <div
        className="fixed top-4 left-4 z-50 sm:block lg:hidden"
        onClick={toggleNavBar}
      >
        {show ? (
          <IoMdClose className="text-white text-3xl" />
        ) : (
          <FaBars className="text-white text-3xl" />
        )}
      </div>

      {/* Sidebar Content */}
      <div
        className={`fixed top-0 left-0 h-full w-[13rem] bg-gray-900 shadow-lg p-4 z-40 transition-transform duration-300 
          ${
            show ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0 lg:translate-x-0`}
      >
        {/* Profile Section */}
        <div className="text-center mb-6">
          <img
            className="rounded-full w-24 h-24 mx-auto mb-4"
            src={profile?.Image}
            alt="Profile"
          />
          <p className="text-white text-lg font-semibold">{profile?.name}</p>
        </div>

        {/* Buttons with Icons */}
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setComponents("HomePage")}
              className="w-full flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 ease-in-out"
            >
              <FaHome /> {buttonsNames.btn1}
            </button>
          </li>
          <li>
            <button
              onClick={() => setComponents("CreatePage")}
              className="w-full flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 ease-in-out"
            >
              <FaPlus /> {buttonsNames.btn2}
            </button>
          </li>
          <li>
            <button
              onClick={() => setComponents("MyProfile")}
              className="w-full flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 ease-in-out"
            >
              <FaUserAlt /> {buttonsNames.btn3}
            </button>
          </li>
          <li>
            <button
              onClick={moveToHomePage}
              className="w-full flex items-center gap-3 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 ease-in-out"
            >
              <FaArrowLeft /> {buttonsNames.btn4}
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 ease-in-out"
            >
              <FaSignOutAlt /> {buttonsNames.btn5}
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default LeftBar;
