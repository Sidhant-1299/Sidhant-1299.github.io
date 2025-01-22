// import React from "react";
// import { openInNewTab } from "../../utils";

// function AcademicCard({ img, course, name, date, url }) {
//   return (
//     <div
//       className="
//       relative w-[90%]
//       mx-auto laptop:mx-0
//       laptop:w-[90%]
//         h-24 tablet:h-32 laptop:h-36 text-white
//      rounded-3xl
//     cursor-pointer group"
//     >
//       <div
//         className="absolute bg-custom-gradient
//         inset-0 blur rounded-3xl
//         opacity-80 laptop:opacity-60
//          laptop:group-hover:opacity-90
//         duration-300
//         animate-pulse laptop:animate-none
//       "
//       ></div>
//       {/* CONTAINER FOR IMAGE AND DATA */}
//       <div
//         className="
//         relative w-full h-full
//       bg-black  rounded-3xl flex
//       mt-10 tablet:mt-14

//     "
//         onClick={() => openInNewTab(url)}
//       >
//         {/* IMAGE DIV */}
//         <div
//           className="w-1/4 flex items-center justify-start
//         laptop:pl-6

//         "
//         >
//           <div
//             className="bg-white  rounded-lg
//           h-28 w-28

//           "
//           >
//             <img
//               src={img}
//               className="h-full w-full
//             laptop:p-1
//             rounded-lg"
//             ></img>
//           </div>
//         </div>
//         {/* ACADEMIC Data Container */}
//         <div className="w-2/3">
//           {/* Contains instituion name, date and course */}
//           <div
//             className="
//             w-full mx-auto h-full
//                  pt-8
//             "
//           >
//             <h1 className="text-white">{name}</h1>
//             <h1 className="text-white">{course}</h1>
//             <h1 className="text-white">{date}</h1>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AcademicCard;

import React from "react";
import { openInNewTab } from "../../utils";

function AcademicCard({ img, course, name, date, url }) {
  return (
    <div
      className="
       
      mx-auto laptop:mx-0
      w-[90%] tablet:w-[85%]
      laptop:w-[90%]
        h-24 tablet:h-28 text-white
     rounded-3xl bg-whitenoise
    cursor-pointer group 
    laptop:hover:scale-105 duration-300 "
    >
      {/* CONTAINER FOR IMAGE AND DATA */}
      <div
        className="
         w-full h-full
      bg-graydark bg-opacity-95  rounded-3xl flex
      mt-6
      
    "
        onClick={() => openInNewTab(url)}
      >
        {/* IMAGE DIV */}
        <div
          className="w-1/4 flex items-center justify-start
        tablet:pl-8 laptop:pl-6


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
        <div className="w-3/4">
          {/* Contains instituion name, date and course */}
          <div
            className="
            w-full mx-auto h-full
                tablet:pt-4
            "
          >
            <h1
              className="
            text-white
            tablet:text-xl font-bold
            group-hover:text-orange-400
            "
            >
              {name}
            </h1>
            <h1
              className="text-graylight 
            tablet:text-lg "
            >
              {course}
            </h1>
            <h1 className="text-graylight tablet:text-sm ">{date}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AcademicCard;
