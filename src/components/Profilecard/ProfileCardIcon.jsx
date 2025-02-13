import React from "react";
import { openInNewTab } from "../../utils";
import { IconContext } from "react-icons/lib";

function ProfileCardIcon({ icon, link }) {
  // const color = "#F87171";
  const color = "#FB923C";
  // const color = "#FACC15";
  const iconSize = "22px";
  if (link.startsWith("mailto:")) {
    return (
      <IconContext.Provider value={{ color: color, size: iconSize }}>
        <div
          className="px-4 cursor-pointer hover:scale-125 duration-300"
          onClick={(e) => {
            window.open(link, "_self");
            e.preventDefault();
          }}
        >
          {icon}
        </div>
      </IconContext.Provider>
    );
  } else {
    return (
      <IconContext.Provider value={{ color: color, size: iconSize }}>
        <div
          className="px-4 cursor-pointer hover:scale-125 duration-300"
          onClick={() => openInNewTab(link)}
        >
          {icon}
        </div>
      </IconContext.Provider>
    );
  }
}

export default ProfileCardIcon;
