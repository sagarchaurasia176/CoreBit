import React from "react";
import SectionPage1 from "../Sections/SectionPage1";
import CurrentTopicsPage from "../Sections/CurrentTopicsPage";
import FeaturedPost from "../Sections/Cards/FeaturedPost";
// Main ui page apply there so we get   
const MainUi = () => {
  return (
    <>
      {/* Hero sectioon */}
      <div>
        <SectionPage1 />
      </div>
      {/* Current Post  */}
      <div className="  bg-slate-150  ">
        <div className=" h-screen   max-h-max  ">
          <CurrentTopicsPage />
      
          {/* <FeaturedPost/> */}
        </div>
      </div>
    </>
  );
};

export default MainUi;
