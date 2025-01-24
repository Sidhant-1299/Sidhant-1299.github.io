import React from "react";
import { PiReadCvLogoThin } from "react-icons/pi";
import { FaArrowRight } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { resumeURL } from "../Data/HomeData";
import { openInNewTab } from "../../utils";

function BoxedComponentCV() {
  return (
    <div
      className="
    h-48 tablet:h-56 laptop:h-64 
    w-[37%] tablet:w-[40%] laptop:w-[40%] 
    relative group hover:scale-105 duration-300"
      onClick={() => openInNewTab(resumeURL)}
    >
      <div
        className="absolute inset-0 blur-md 
        opacity-90 animate-pulse laptop:animate-none
        laptop:opacity-60 
      laptop:group-hover:opacity-100 bg-custom-gradient
      duration-300  "
      ></div>
      <div
        className={`relative h-full w-full
           text-white bg-black 
    rounded-xl
   duration-300
     cursor-pointer
    flex flex-col 
    group
    `}
      >
        {/* ICON */}
        <IconContext.Provider value={{ color: "white", size: "50px" }}>
          <div className="pl-4 pt-4 ">
            <PiReadCvLogoThin />
          </div>
        </IconContext.Provider>
        <div className=" h-2/4 flex items-center justify-center">
          <h1 className="px-3 font-bold laptop:text-2xl">RESUME</h1>
          <div
            className="laptop:group-hover:translate-x-3 
            duration-300
           absolute 
           bottom-2 right-3
           tablet:bottom-3 tablet:right-4
           laptop:bottom-6 laptop:right-9"
          >
            <IconContext.Provider value={{ color: "white", size: "16px" }}>
              <FaArrowRight />
            </IconContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoxedComponentCV;
