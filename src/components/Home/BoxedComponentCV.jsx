// import React from "react";
// import { primaryBg } from "../../Theme";
// import { PiReadCvLogoThin } from "react-icons/pi";
// import { IconContext } from "react-icons/lib";
// function BoxedComponentCV({ bgColor = primaryBg }) {
//   const icon = "CV";
//   const header = "CV";
//   const description = "MY GITHUB PAGE";
//   const url = "";
//   return (
//     <div
//       className={` text-white ${bgColor}
//     h-64 w-[45%] laptop:w-[40%]
//     rounded-xl
//     hover:scale-[1.03] duration-300
//      cursor-pointer
//     flex flex-col
//     group
//     `}
//     >
//       {/* ICON */}
//       <IconContext.Provider value={{ color: "white", size: "50px" }}>
//         <div className="pl-4 pt-4 group-hover:animate-wiggle">
//           <PiReadCvLogoThin />
//         </div>
//       </IconContext.Provider>
//       <div className="bg-red-600 h-2/4 flex items-center justify-center">
//         <h1>RESUME</h1>
//       </div>
//     </div>
//   );
// }

// export default BoxedComponentCV;
import React from "react";
import { primaryBg } from "../../Theme";
import { PiReadCvLogoThin } from "react-icons/pi";
import { IconContext } from "react-icons/lib";
function BoxedComponentCV({ bgColor = primaryBg }) {
  return (
    <div className="h-64 w-[45%] laptop:w-[40%] relative group hover:scale-105 duration-300">
      <div
        className="absolute inset-0 blur-md opacity-60 
      group-hover:opacity-100 bg-gradient-to-r
       
       from-yellow-400 via-orange-400 to-red-400
      duration-300"
      ></div>
      <div
        className={`relative h-full w-full
           text-white bg-black 
    rounded-xl
    = duration-300
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
          <h1>RESUME</h1>
        </div>
      </div>
    </div>
  );
}

export default BoxedComponentCV;
