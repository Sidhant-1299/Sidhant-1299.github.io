import React from "react";
import { useState } from "react";
import PageHeader from "../PageHeader";
import { header } from "../Data/AcademicData";
import AcademicContainer from "./AcademicContainer";
import useIntersectionObserver from "../../utils/useInterSectionObserver";
function Academic() {
  const { ref, isVisible } = useIntersectionObserver();
  const [hasAnimated, setHasAnimated] = useState(false);

  if (isVisible && !hasAnimated) {
    setHasAnimated(true);
  }
  return (
    <div
      id="education"
      ref={ref}
      className={`tablet:pt-8 laptop:pt-0
      laptop:pl-6
        pb-8
        w-[90%] laptop:w-[95%] mx-auto
        ${
          hasAnimated ? "translate-y-2 opacity-100" : "-translate-y-2 opacity-0"
        } duration-500`}
    >
      <PageHeader header={header} />
      <AcademicContainer />
    </div>
  );
}

export default Academic;
