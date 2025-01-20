import React from "react";
import { primaryBg } from "../../Theme";
import { githubURL } from "../Data/HomeData";
import { openInNewTab } from "../../utils";
import { FaGithub } from "react-icons/fa6";

function BoxedComponentGithub({ bgColor = primaryBg }) {
  const icon = "github";
  const header = "github";
  const description = "MY GITHUB PAGE";

  return (
    <div
      className={` text-white ${bgColor} 
    h-64
    rounded-xl
    hover:scale-[1.03] duration-300
     cursor-pointer
     w-[45%] laptop:w-[50%]
    `}
      onClick={() => openInNewTab(githubURL)}
    >
      {icon}

      {header}
    </div>
  );
}

export default BoxedComponentGithub;
