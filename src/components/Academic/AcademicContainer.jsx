import React from "react";
import AcademicCard from "./AcademicCard";
import { academicData } from "../Data/AcademicData";

//Container for my academic cards
//Maps over academic data and returns academic card
function AcademicContainer() {
  return (
    <div
      className="
      w-full h-full
      mt-4 tablet:mt-10 laptop:mt-0
     py-8 tablet:py-2 laptop:py-12
    
  
  "
    >
      {academicData.map((data, index) => (
        <AcademicCard {...data} key={index} />
      ))}
    </div>
  );
}

export default AcademicContainer;
