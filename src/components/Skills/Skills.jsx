import React from "react";
import PageHeader from "../PageHeader";
import { header } from "../Data/SkillData";
import SkillsContainer from "./SkillsContainer";

function Skills() {
  return (
    <div
      id="skills"
      className="laptop:pl-4
    mt-16 laptop:mt-24
    tablet:pt-8 laptop:pt-0
     mx-auto
     pb-20
     tablet:pb-24
     
    "
    >
      <div className="w-[90%] laptop:w-[95%] mx-auto">
        <PageHeader header={header} />
      </div>

      <SkillsContainer />
    </div>
  );
}

export default Skills;
