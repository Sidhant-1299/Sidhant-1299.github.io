import React from "react";
import ProfileCard from "./components/ProfileCard/ProfileCard";

function Portfolio() {
  return (
    <div
      className="laptop:w-[90%] desktop:w-full max-w-screen-desktop h-full
    pt-24 laptop:pt-48 mx-auto
    bg-black"
    >
      <ProfileCard />
    </div>
  );
}

export default Portfolio;
