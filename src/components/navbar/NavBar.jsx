import React from "react";
import NavBarItem from "./NavBarItem";
import { GoHomeFill } from "react-icons/go";
import { HiMiniAcademicCap } from "react-icons/hi2";
import { FaBriefcase } from "react-icons/fa";
import { FaRegFolder } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
function NavBar() {
  return (
    <div
      className="w-full fixed top-0 mx-auto bg-black
    py-6 tablet:py-8 z-50"
    >
      <div
        className="absolute w-[278px] tablet:w-[358px]
       rounded-3xl mx-auto bg-whitenoise inset-0
       my-6 tablet:my-8"
      ></div>
      <div
        className="relative w-[280px] tablet:w-[360px] flex rounded-3xl text-white
         px-[2px] tablet:px-2
         mx-auto
         bg-graydark bg-opacity-90

    "
      >
        <NavBarItem icon={<GoHomeFill />} label="Home" ID="home" />
        <NavBarItem icon={<FaRegFolder />} label="Projects" ID="projects" />
        {/* <NavBarItem icon={<FaBriefcase />} label="Experience" ID="experience" /> */}
        <NavBarItem icon={<FaBriefcase />} label="Skills" ID="skills" />
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
