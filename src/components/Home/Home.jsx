import React from "react";
import { useState } from "react";
import PageHeader from "../PageHeader";
import { header, introduction } from "../Data/HomeData";
import BoxedComponentCV from "./BoxedComponentCV";
import BoxedComponentGithub from "./BoxedComponentGithub";
import useIntersectionObserver from "../../utils/useInterSectionObserver";

function Home() {
  const { ref, isVisible } = useIntersectionObserver();
  const [hasAnimated, setHasAnimated] = useState(false);

  if (isVisible && !hasAnimated) {
    setHasAnimated(true);
  }
  return (
    <div
      id="home"
      ref={ref}
      className={`bg-black
      tablet:pt-8 laptop:pt-0
      laptop:pl-8
     pb-8 ${
       hasAnimated ? "translate-y-2 opacity-100" : "-translate-y-2 opacity-0"
     } duration-500`}
    >
      <PageHeader header={header} />
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
      py-10 text-justify
      "
        >
          {introduction}
        </h1>
      </div>
      {/* CV AND GITHUB LINK */}
      <div
        className="flex 
        laptop:pt-8
       gap-5 tablet:gap-6 laptop:gap-8 
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
