import React from "react";
// import  from 'react-icons'
// 👉PENDING FEATURED POST
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const FeaturedPost = ({ featuredData }) => {
  return (
    <div className="container mx-auto max-w-full md:max-w-5xl shadow-md px-5 py-10">
      {/* Image and Content Wrapper */}
      <div className="bg-white text-black  flex  flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-6 rounded-lg">
        {/* Image */}
        <div className="flex-shrink-0 mb-4 sm:mb-0">
          <img
            src={featuredData.blogImg}
            className="rounded-lg w-24 sm:w-32 md:w-36"
            alt="Featured Post"
          />
        </div>
        {/* Content */}
        <div className="sm:ml-6">
          {/* Title */}
          <h2 className="text-base md:text-lg lg:text-xl font-semibold border-b-4 border-black inline-block mb-2">
            {featuredData.title}
          </h2>
          <br />
          {/* About */}
          <span className="text-sm md:text-base lg:text-lg">
            {featuredData.About.slice(1, 200)}
          </span>
          <br />
          {/* Buttons  */}
          <button
            className="px-6   py-2 flex items-center  font-bold  tracking-wide  text-orange-600 capitalize transition-colors duration-300 
          transform focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
          >
            Read More &nbsp;
            <span>
              <MdKeyboardDoubleArrowRight className=" animate-ping" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;
