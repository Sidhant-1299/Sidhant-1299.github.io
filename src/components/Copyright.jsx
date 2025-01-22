import React from "react";
import { name } from "./Data/ProfileCardData";

function Copyright() {
  const year = new Date().getFullYear();
  return (
    <div
      className="w-full flex items-center justify-center 
    pb-12
    tablet:pb-16"
    >
      <h1
        className="text-orange-400
      text-lg tablet:text-xl "
      >
        © {name} {year}
      </h1>
    </div>
  );
}

export default Copyright;
