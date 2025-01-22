import React from "react";
import { skills } from "../Data/SkillData";
import SkillCard from "./SkillCard";
//Container for my skill cards

function SkillsContainer() {
  return (
    <div
      className="
      h-full
      w-[80%] 
      tablet:w-[90%]
      laptop:w-full 
      mx-auto
      mt-12
      tablet:mt-14
      laptop:mt-16 laptop:mb-16
      laptop:py-4
      grid gap-y-4
    grid-cols-3 tablet:grid-cols-4
     laptop:grid-cols-2 desktop:grid-cols-
        rounded-xl
       
     "
    >
      {skills.map((skill, index) => (
        <SkillCard
          icon={skill.icon}
          url={skill.homepage}
          name={skill.name}
          key={index}
        />
      ))}
    </div>
  );
}

export default SkillsContainer;
