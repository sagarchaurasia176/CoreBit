import React from "react";
import SectionPage1 from "../Sections/SectionPage1";
import CurrentTopicsPage from "../Sections/CurrentTopicsPage";

const MainUi = () => {
  return (
    <>
      {/* Hero sectioon */}
      <div>
        <SectionPage1 />
      </div>
      {/* Current Post  */}
      <div className="  bg-slate-150  ">
        <div className=" h-screen ">
          <CurrentTopicsPage />
          {/* Add your all the contents  */}
        </div>
      </div>
    </>
  );
};

export default MainUi;
