import React, { useContext } from "react";
import LeftBar from "./Menu/LeftComponents/LeftBar";
import RightPage from "./Menu/RightComponents/RightPage";

const DashboardPage = () => {
  // states

  return (
    <div
      className=" flex flex-1 flex-row bg-slate-900  "
    >
      {/* two div  */}
      {/* LEFT  */}
      <div className="">
        {/* left side bar */}
        <LeftBar />
      </div>
      {/* RIGHT side bar */}
      <div>
        <RightPage/>
      </div>
    </div>
  );
};

export default DashboardPage;

// pending here so we get!
