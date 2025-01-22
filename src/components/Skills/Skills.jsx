import React from "react";
import { useState } from "react";
import PageHeader from "../PageHeader";
import { header } from "../Data/SkillData";
import SkillsContainer from "./SkillsContainer";
import useIntersectionObserver from "../../utils/useInterSectionObserver";

function Skills() {
  const { ref, isVisible } = useIntersectionObserver();
  const [hasAnimated, setHasAnimated] = useState(false);

  if (isVisible && !hasAnimated) {
    setHasAnimated(true);
  }
  return (
    <div
      ref={ref}
      id="skills"
      className={`laptop:pl-4
    mt-16 laptop:mt-24
    tablet:pt-8 laptop:pt-0
     mx-auto
     pb-20
     tablet:pb-24
     ${
       hasAnimated ? "translate-y-2 opacity-100" : "-translate-y-2 opacity-0"
     } duration-500`}
    >
      <div className="w-[90%] laptop:w-[95%] mx-auto">
        <PageHeader header={header} />
      </div>

      <SkillsContainer />
    </div>
  );
}

export default Skills;
