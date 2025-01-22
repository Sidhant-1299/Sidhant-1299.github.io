import React from "react";
import { name } from "./Data/ProfileCardData";

function Copyright() {
  const year = new Date().getFullYear();
  return (
    <div
      className="w-full flex items-center tablet:justify-center laptop:justify-start
      pb-12
      tablet:pb-16"
    >
      <h1
        className="bg-clip-text text-transparent bg-custom-gradient
        text-lg tablet:text-2xl "
      >
        © {name} {year}
      </h1>
    </div>
  );
}

export default Copyright;
