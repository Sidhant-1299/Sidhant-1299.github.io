import React from "react";
import { openInNewTab } from "../../utils";

function SkillCard({ icon, url, name }) {
  return (
    <div
      onClick={() => openInNewTab(url)}
      className="

      laptop:h-24 laptop:w-[90%]
      desktop:w-[360px]
      hover:scale-105 duration-300 cursor-pointer
      flex
      items-center justify-self-center
      laptop:items-start laptop:justify-start
      rounded-xl bg-graydark
      ml-2
      relative
      group
      "
    >
      <div
        className="
      hidden laptop:inline rounded-xl
      bg-whitenoise absolute inset-0 opacity-5"
      ></div>
      <div
        className="
        relative
      bg-white
      h-16 w-16
      tablet:h-[72px] tablet:w-[72px]
       laptop:ml-4 desktop:ml-6
        flex items-center justify-center
        rounded-lg
        my-auto

      "
      >
        <img
          src={icon}
          alt={name}
          className="
          h-14 w-14
      tablet:h-16 tablet:w-16
      my-auto
      "
        ></img>
      </div>
      {/* DISAPPEARS FOR TOUCH SCREENS */}
      <div className="h-full hidden laptop:block">
        {/* NAME */}
        <h1
          className="text-graylight font-bold my-auto
          laptop:text-lg
        laptop:py-10 laptop:pl-12
        
        group-hover:bg-clip-text group-hover:text-transparent
         group-hover:bg-custom-gradient

        "
        >
          {name}
        </h1>
      </div>
    </div>
  );
}

export default SkillCard;
