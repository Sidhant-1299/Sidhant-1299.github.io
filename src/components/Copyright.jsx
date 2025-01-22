import React from "react";
import { name } from "./Data/ProfileCardData";
import { isPortrait } from "../utils";

function Copyright() {
  const year = new Date().getFullYear();

  // Determine the layout based on window dimensions

  return (
    <div
      className={`w-full flex items-center 
        pt-24 
      justify-center
       ${isPortrait() ? "laptop:justify-start" : ""}
      pb-12
      tablet:pb-16
      
      `}
    >
      <h1
        className="bg-clip-text text-transparent bg-custom-gradient
        text-lg tablet:text-2xl "
      >
        © {name} {year}
      </h1>
    </div>
  );
}

export default Copyright;
