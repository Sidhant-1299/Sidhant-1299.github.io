import React from "react";
import NavBarItem from "./NavBarItem";
import { GoHomeFill } from "react-icons/go";
import { HiMiniAcademicCap } from "react-icons/hi2";
import { FaBriefcase } from "react-icons/fa";
import { FaRegFolder } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
function NavBar() {
  return (
    <div className="w-fullfixed top-0 mx-auto py-8">
      <div
        className="w-[280px] tablet:w-[360px] bg-gray flex rounded-3xl text-white
         px-[2px] tablet:px-2
         mx-auto
    "
      >
        <NavBarItem icon={<GoHomeFill />} label="Home" ID="home" />
        <NavBarItem icon={<FaRegFolder />} label="Projects" ID="projects" />
        <NavBarItem icon={<FaBriefcase />} label="Experience" ID="experience" />
        <NavBarItem
          icon={<HiMiniAcademicCap />}
          label="Education"
          ID="education"
        />
        <NavBarItem icon={<FaRegPenToSquare />} label="Contact" ID="contact" />
      </div>
    </div>
  );
}
export default NavBar;
