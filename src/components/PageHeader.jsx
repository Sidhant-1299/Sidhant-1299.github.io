import React from "react";

function PageHeader({ header }) {
  const top = header.split(" ")[0];
  const bottom = header.split(" ")[1];
  return (
    <div className="text-center laptop:text-start">
      <h1 className="text-[64px] tablet:text-[96px] leading-none text-white font-bold">
        {top}
      </h1>
      <h1 className="text-[64px] tablet:text-[96px] leading-none text-gray font-bold">
        {bottom}
      </h1>
    </div>
  );
}

export default PageHeader;
