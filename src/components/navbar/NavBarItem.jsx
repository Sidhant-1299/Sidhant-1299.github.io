import React from "react";
import { scrollIntoViewWithID, scrollIntoViewWithOffset } from "../../utils";

function NavBarItem({ icon, label, ID }) {
  return (
    <div
      className="w-full cursor-pointer group"
      onClick={() => scrollIntoViewWithOffset(ID)}
    >
      <div
        className="mx-auto h-full w-full 
        py-2 flex items-center justify-center
      "
      >
        {icon}
      </div>
      {/* Label only renders on hover */}
      <div
        className="text-xs  text-white opacity-0 -translate-y-4
        laptop:px-2
        laptop:group-hover:opacity-100 laptop:group-hover:translate-y-2 
        duration-300 ease-in-out bg-gray rounded-lg text-center 
        "
      >
        {label}
      </div>
    </div>
  );
}

export default NavBarItem;
