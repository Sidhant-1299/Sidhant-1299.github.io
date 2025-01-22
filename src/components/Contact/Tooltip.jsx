import React from "react";

function Tooltip({ message, position = "top" }) {
  return (
    <div
      className={`absolute z-10 flex items-center px-4 py-1 tablet:py-2 bg-white border border-gray-300 rounded-lg shadow-md text-gray-800 text-sm ${
        position === "top"
          ? "bottom-full right-0 mb-2"
          : "top-full right-0 mt-1"
      }`}
    >
      <div
        className={`absolute ${
          position === "top"
            ? "top-full -translate-y-2"
            : "bottom-full translate-y-2"
        } w-0 h-0 border-[6px] border-transparent ${
          position === "top" ? "border-t-gray-300" : "border-b-gray-300"
        }`}
      ></div>
      <div className="flex items-center">
        <span
          role="img"
          aria-label="warning"
          className="text-orange-500 text-xl mr-2"
        >
          ⚠️
        </span>
        {message || "This field is required."}
      </div>
    </div>
  );
}

export default Tooltip;
