import React from "react";
import { MyProjects } from "../Data/ProjectData";
import ProjectCard from "./ProjectCard";

function ProjectsContainer() {
  return (
    <div
      className="w-full h-full pt-10
  grid grid-cols-1 tablet:grid-cols-2 
  gap-x-6 
  gap-y-8 tablet:gap-y-6
  
  "
    >
      {MyProjects.map((project) => {
        return (
          <ProjectCard
            img={project.img}
            header={project.header}
            description={project.description}
            url={project.url}
            key={project.id}
          />
        );
      })}
      {MyProjects.map((project) => {
        return (
          <ProjectCard
            img={project.img}
            header={project.header}
            description={project.description}
            url={project.url}
            key={project.id}
          />
        );
      })}
    </div>
  );
}

export default ProjectsContainer;
