import React from "react";
import { githubURL } from "../Data/HomeData";
import { openInNewTab } from "../../utils";
import { FaGithub } from "react-icons/fa6";
import { IconContext } from "react-icons/lib";
import { FaArrowRight } from "react-icons/fa";
function BoxedComponentGithub() {
  return (
    <div
      className={` text-white
    h-48 tablet:h-56 laptop:h-64 
    rounded-xl
    hover:scale-[1.03] duration-300
     cursor-pointer
     w-[37%] tablet:w-[40%]  laptop:w-[50%]
     bg-custom-gradient
     group relative
    `}
      onClick={() => openInNewTab(githubURL)}
    >
      <IconContext.Provider value={{ color: "black", size: "50px" }}>
        <div className="pl-4 pt-4 ">
          <FaGithub />
        </div>
      </IconContext.Provider>
      <div className=" h-2/4 flex flex-row items-center justify-center">
        <h1
          className="
        text-black font-bold
        px-3 laptop:text-2xl
        "
        >
          GITHUB
        </h1>
        <div
          className="laptop:group-hover:translate-x-6
           duration-300
        absolute 
        laptop:bottom-6 laptop:right-10
        bottom-0 right-3
        tablet:bottom-2 tablet:right-3
        "
        >
          <IconContext.Provider value={{ color: "black", size: "18px" }}>
            <FaArrowRight />
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default BoxedComponentGithub;
