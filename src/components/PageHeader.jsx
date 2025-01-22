// import React from "react";

// function PageHeader({ header }) {
//   const _header = header.toUpperCase();

//   const top = _header.split(" ")[0];
//   const bottom = _header.split(" ")[1];
//   return (
//     <div className="text-center laptop:text-start">
//       <h1 className="text-[56px] tablet:text-[96px] leading-none text-white font-bold">
//         {top}
//       </h1>
//       <h1 className="text-[56px] tablet:text-[96px] leading-none text-gray font-bold">
//         {bottom}
//       </h1>
//     </div>
//   );
// }

// export default PageHeader;

import React from "react";

function PageHeader({ header }) {
  // Convert header to uppercase
  const _header = header.toUpperCase();

  // Split the header into words
  const words = _header.split(" ");

  // Initialize top and bottom parts
  let top = "";
  let bottom = "";

  if (words.length > 2) {
    bottom = words.slice(-1)[0]; // Get the last word
    top = words.slice(0, -1).join(" "); // Join all except the last word
  } else if (words.length === 2) {
    top = words[0];
    bottom = words[1];
  } else if (words.length === 1) {
    top = words[0];
    bottom = ""; // No bottom if there's only one word
  }

  return (
    <div className="text-center laptop:text-start">
      {/* Render the top part */}
      <h1 className="text-[56px] tablet:text-[96px] leading-none text-white font-bold">
        {top}
      </h1>
      {/* Render the bottom part, if it exists */}
      {bottom && (
        <h1 className="text-[56px] tablet:text-[96px] leading-none text-gray font-bold">
          {bottom}
        </h1>
      )}
    </div>
  );
}

export default PageHeader;
