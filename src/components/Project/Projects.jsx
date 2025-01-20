import React from "react";
import PageHeader from "../PageHeader";
import { header } from "../Data/ProjectData";
import ProjectsContainer from "./ProjectsContainer";

function Projects() {
  return (
    <div
      id="projects"
      className="laptop:pl-4
     mt-16 tablet:mt-20 laptop:mt-24
     tablet:pt-12 laptop:pt-0
     w-[90%] laptop:w-[95%] mx-auto
     "
    >
      <PageHeader header={header} />
      <ProjectsContainer />
    </div>
  );
}

export default Projects;
