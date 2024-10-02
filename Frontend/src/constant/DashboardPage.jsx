import React, { useContext } from "react";
import LeftBar from "./Menu/LeftComponents/LeftBar";

const DashboardPage = () => {
  // states

  return (
    <div
      className="gap-3
    grid grid-cols-2  bg-slate-900 max-w-full
    h-screen  text-white
      w-full md:max-w-full"
    >
      {/* two div  */}
      {/* LEFT  */}
      <div>
        {/* left side bar */}
        <LeftBar />
      </div>
      {/* RIGHT side bar */}
      <div></div>
    </div>
  );
};

export default DashboardPage;

// pending here so we get!
