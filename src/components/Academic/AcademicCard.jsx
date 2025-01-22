import React from "react";
import { openInNewTab } from "../../utils";

function AcademicCard({ img, course, name, date, url }) {
  return (
    <div
      className="
       
      mx-auto laptop:mx-0
      w-[95%] tablet:w-[85%]
      laptop:w-[90%]
        h-24 tablet:h-28 text-white
     rounded-3xl 
    cursor-pointer group 
    laptop:hover:scale-105 duration-300 relative"
    >
      {/* WHITENOISE DIV */}
      <div className="absolute inset-[1px] bg-whitenoise rounded-3xl"></div>

      {/* CONTAINER FOR IMAGE AND DATA */}
      <div
        className=" relative
         w-full h-full
      bg-graydark bg-opacity-95  rounded-3xl flex
      mt-6
      
    "
        onClick={() => openInNewTab(url)}
      >
        {/* IMAGE DIV */}
        <div
          className="
          w-1/4
          tablet:w-1/5
           flex items-center justify-start
        pl-4 tablet:pl-4 laptop:pl-6


        "
        >
          <div
            className="bg-white  rounded-lg
          tablet:h-[88px] tablet:w-[88px]
          
          "
          >
            <img
              src={img}
              className="h-full w-full
            p-1
            rounded-lg"
            ></img>
          </div>
        </div>
        {/* ACADEMIC Data Container */}
        <div
          className="
        w-2/3
        tablet:w-4/5"
        >
          {/* Contains instituion name, date and course */}
          <div
            className="
            w-full mx-auto h-full
            flex flex-col justify-center
            items-start
              
               pl-3 tablet:pl-0
            "
          >
            <h1
              className="
            text-white
            text-base
            tablet:text-xl font-bold
            group-hover:text-orange-400
            "
            >
              {name}
            </h1>
            <h1
              className="text-graylight 
            text-sm tablet:text-lg "
            >
              {course}
            </h1>
            <h1 className="text-graylight text-xs tablet:text-sm ">{date}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AcademicCard;
