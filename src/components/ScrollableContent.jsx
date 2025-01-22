import React from "react";
import Home from "./Home/Home";
import Projects from "./Project/Projects";
import Skills from "./Skills/Skills";
import Academic from "./Academic/Academic";
import Contact from "./Contact/Contact";

//Contains all component fo scrollable content

function ScrollableContent() {
  return (
    <div
      className="
    pt-32 laptop:pt-28
    laptop:pl-8
    
    w-full tablet:w-[90%] laptop:w-full
    mx-auto laptop:mx-0"
    >
      <Home />
      <Projects />
      <Skills />
      <Academic />
      <Contact />
    </div>
  );
}

export default ScrollableContent;
