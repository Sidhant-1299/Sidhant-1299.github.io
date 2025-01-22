import React from "react";
import ProfileCard from "./components/Profilecard/ProfileCard";
import ScrollableContent from "./components/ScrollableContent";
import Copyright from "./components/Copyright";

function Portfolio() {
  return (
    <div
      className="laptop:w-[95%] desktop:w-[92%] max-w-screen-desktop h-full 
      flex 
      flex-col laptop:flex-row

      mx-auto bg-black
      
    "
    >
      {/* ProfileCard Component - Fixed */}
      <div
        className=" laptop:relative h-full  
        pt-28 laptop:pt-0
        laptop:top-28 
      laptop:w-1/3 "
      >
        <ProfileCard />
      </div>

      {/* Scrollable Content */}
      <div
        className="
      
      laptop:w-2/3 laptop:ml-1/3 
      overflow-y-auto h-full bg-black"
      >
        <ScrollableContent />
      </div>
    </div>
  );
}

export default Portfolio;
