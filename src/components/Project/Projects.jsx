import { React, useState } from "react";
import PageHeader from "../PageHeader";
import { header } from "../Data/ProjectData";
import ProjectsContainer from "./ProjectsContainer";
import useIntersectionObserver from "../../utils/useInterSectionObserver";

function Projects() {
  const { ref, isVisible } = useIntersectionObserver();
  //Animation to run only once
  //If you want it to run all the time use isVisible in the template not hasAnimated
  const [hasAnimated, setHasAnimated] = useState(false);

  if (isVisible && !hasAnimated) {
    setHasAnimated(true);
  }
  return (
    <div
      id="projects"
      ref={ref}
      className={`laptop:pl-4
     mt-16 tablet:mt-20 laptop:mt-24
     tablet:pt-8 laptop:pt-0
     w-[90%] laptop:w-[95%] mx-auto
     ${
       hasAnimated ? "translate-y-2 opacity-100" : "-translate-y-2 opacity-0"
     } duration-500`}
    >
      <PageHeader header={header} />
      <ProjectsContainer />
    </div>
  );
}

export default Projects;
