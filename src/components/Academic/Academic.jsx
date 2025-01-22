import React from "react";
import PageHeader from "../PageHeader";
import { header } from "../Data/AcademicData";
import AcademicContainer from "./AcademicContainer";
function Academic() {
  return (
    <div
      id="education"
      className="tablet:pt-8 laptop:pt-0
      laptop:pl-8
        pb-8
        w-[90%] laptop:w-[95%] mx-auto"
    >
      <PageHeader header={header} />
      <AcademicContainer />
    </div>
  );
}

export default Academic;
