import React from "react";
import HeaderPageImg from "../assest/HeaderSection.webp";
import contents from "../api/AllContent";
// SectionPage1
const SectionPage1 = () => {
  return (
    <div className="  pt-12 lg:pt-[4rem] sm:pt-[4rem] bg-slate-30 bg-slate-950  h-screen">
      {/* Main responsiveness  */}
      <div className="  flex lg:pt-[2rem] md:pt-[2rem] pt-[7rem] flex-col justify-center items-center">
        <div className=" text-center  text-3xl ">
          <div>
            <h1 className="  text-white text-6xl font-extrabold ">
              {contents.heading}
            </h1>
          </div>
          <div className=" flex   items-center justify-center">
            <span className=" font-extrabold  animate-bounce text-orange-300">
              {contents.ThemeName}
            </span>
            <p className=" text-pink-600 animate-bounce font-extrabold">
              {contents.ThemesName}
            </p>
          </div>
        </div>
        <div className="">
          <div className=" lg:w-[600px]  sm:w-[600px]">
            <img className="" src={HeaderPageImg} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionPage1;
