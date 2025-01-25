import React from "react";
import { openInNewTab } from "../../utils/";

function ProjectCard({ img, header, description, url }) {
  return (
    <div
      className="
      col-span-1 row-span-1
       h-72 tablet:h-96 laptop:h-[340px] desktop:h-96
       w-[90%] tablet:w-full 
       mx-auto
       cursor-pointer
       group
       rounded-2xl 
       "
      onClick={() => openInNewTab(url)}
    >
      {/* IMAGE CONTAINER */}
      <div className="h-2/3 w-full overflow-hidden rounded-t-2xl">
        {/* IMAGE */}
        <img
          src={img}
          className="h-full w-full rounded-t-2xl
            group-hover:scale-105 duration-300 
            "
        ></img>
      </div>
      {/* HEADER AND DESCRITPION */}
      <div className="h-1/3 w-full bg-whitenoise rounded-b-[17px]">
        <div className="w-full h-full bg-graydark bg-opacity-90 rounded-b-2xl">
          {/* HEADER */}
          <div
            className="
          h-1/2 
          w-[90%] mx-auto
          flex
           items-center justify-center"
          >
            <h1
              className="
              text-lg tablet:text-xl laptop:text-lg desktop:text-xl  
              leading-6 laptop:leading-5
              font-bold text-center
               pt-1 tablet:pt-2 desktop:pt-4 
               group-hover:bg-clip-text group-hover:text-transparent
         group-hover:bg-custom-gradient 
          text-white
            "
            >
              {header}
            </h1>
          </div>
          <div
            className="h-2/5 laptop:h-1/2 desktop:h-2/5
            w-[90%] mx-auto
          "
          >
            <h1
              className="text-graylight text-xs desktop:text-sm 
          text-center
            pt-1
            laptop:pb-2
          desktop:pb-4 "
            >
              {description}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
