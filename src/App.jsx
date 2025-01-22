import React from "react";
import Portfolio from "./Portfolio";
import NavBar from "./components/navbar/NavBar";
import Copyright from "./components/Copyright";
export default function App() {
  return (
    <div className="h-full bg-black w-full ">
      <div className="relative bg-black">
        <NavBar />
      </div>
      <Portfolio />
      <Copyright />
    </div>
  );
}
