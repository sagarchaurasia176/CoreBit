import React from "react";

const CurrentTopicsCard = ({ blogDatas }) => {
  return (
    <div className="p-4 flex  ">
      <div className="max-w-sm  sm:max-w-md md:max-w-lg px-4 py-3 bg-white shadow-md rounded-lg dark:bg-gray-800 mx-auto">
        <div className=" mb-4">
          <span className="text-sm sm:text-base font-light text-gray-800 dark:text-gray-400">
            {blogDatas.category}
          </span>
        </div>
        
        <div className=" cursor-pointer">
          <div className="p-6  flex  rounded-3xl justify-center">
            <img
              src={blogDatas.blogImg}
              className=" w-[12rem]   mt-[-1rem] h-auto object-cover rounded-lg"
              alt="Blog"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentTopicsCard;
