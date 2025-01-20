import React from "react";
import PageHeader from "../PageHeader";
import { header, introduction } from "../Data/HomeData";
import BoxedComponentCV from "./BoxedComponentCV";
import BoxedComponentGithub from "./BoxedComponentGithub";
import { primaryBg, secondaryBg } from "../../Theme";

function Home() {
  return (
    <div
      id="home"
      className="
      bg-black
      pl-4
     pb-8
    "
    >
      <PageHeader header={header.toUpperCase()} />
      {/* INTRODUCTION */}
      <div
        className="
        w-4/5 laptop:w-3/4 
        mx-auto laptop:mx-0 laptop:ml-1
      text-center laptop:text-start
      "
      >
        <h1
          className=" text-graylight text-lg
      py-10
      "
        >
          {introduction}
        </h1>
      </div>
      {/* CV AND GITHUB LINK */}
      <div
        className="flex 
        laptop:pt-8
       gap-3 tablet:gap-6 laptop:gap-8 
       laptop:ml-1
       items-center justify-center
       laptop:justify-start
      mx-auto laptop:mx-0"
      >
        <BoxedComponentCV />
        <BoxedComponentGithub />
      </div>
    </div>
  );
}

export default Home;
