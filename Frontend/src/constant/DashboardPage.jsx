import React, { useContext, useState } from "react";
import LeftBar from "./Menu/LeftComponents/LeftBar";
import RightPage from "./Menu/RightComponents/RightPage";
import { ContextCreation } from "../context/StataManage";
import HomePage from "./Menu/LeftComponents/DashboardComponents/HomePage";
import MyProfile from "./Menu/LeftComponents/DashboardComponents/MyProfile";
import CreatePage from "./Menu/LeftComponents/DashboardComponents/CreatePage";
import UpdatesBlogPage from "./Menu/Update/UpdatesBlogPage";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
const DashboardPage = () => {
  // Accessing context states
  const { components, setComponents , authenticated} =
    useContext(ContextCreation);  
    
    // Pending works

  // if (!authenticated) {
  //   toast.error("Not authenticated user");
  //   return <Navigate to={"/"} />;
  // }  

  // Mapping component names to actual components
  const componentMapping = {
    HomePage: <HomePage />,
    MyProfile: <MyProfile />,
    CreatePage: <CreatePage />,
    Update: <UpdatesBlogPage />,
  };

  return (
    <div className="">
      {/* LEFT: Sidebar */}
      <div className="">
        <LeftBar components={components} setComponents={setComponents} />
        {componentMapping[components] || <HomePage />}{" "}
      </div>

      {/* RIGHT: Dynamic Content */}
    </div>
  );
};

export default DashboardPage;
