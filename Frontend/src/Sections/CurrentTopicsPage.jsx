import React, { useContext } from "react";

const CurrentTopicsPage = () => {
  return (
    <div>
      <div className="  bg-slate-950  text-black text-1xl  h-screen items-start capitalize font-bold ">
        <div className=" flex items-start ml-12">
          <h2 className="font-bold text-white border-b-4 border-white inline-block pb-2">
            Recent post
          </h2>
        </div>
        <div className=" flex flex-col p-2 sm:p-2 md:p-2">
          {/* Api cards for blog current post */}
       
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default CurrentTopicsPage;
