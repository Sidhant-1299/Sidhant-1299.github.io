import React from "react";
import Portfolio from "./Portfolio";
import NavBar from "./components/navbar/NavBar";

export default function App() {
  return (
    <div className="h-screen bg-black w-full">
      <div className="relative">
        <NavBar />
      </div>
      <Portfolio />
    </div>
  );
}
