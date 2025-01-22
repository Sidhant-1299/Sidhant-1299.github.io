import React, { useState } from "react";
import Tooltip from "./Tooltip";

function ContactMessage({
  label,
  placeholder,
  inputState,
  setInputState,
  submitted,
  buttonLabel,
  setButtonLabel,
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="h-full w-[88%] mx-auto">
      {/* LABEL */}
      <div className="1/6 w-full">
        <h1
          className="
        text-graylight 
        text-sm tablet:text-base
        px-4 tablet:px-6
        "
        >
          {label}
        </h1>
      </div>
      {/* MESSAGE TEXT AREA */}
      <div
        className="w-full h-full relative group
      mt-2 tablet:mt-3
          "
      >
        <div
          className={`absolute -inset-[1px] 
        bg-custom-gradient rounded-xl 
          ${isFocused ? "visible" : "invisible"}`}
        ></div>
        <textarea
          placeholder={placeholder}
          className="
          no-scrollbar
          relative h-full w-full bg-gray rounded-xl
        outline-none text-white text-sm 
        px-5 tablet:px-6 
        pt-3 tablet:pt-4
        "
          onFocus={() => setIsFocused(!isFocused)}
          onBlur={() => setIsFocused(!isFocused)}
          onChange={(e) => {
            setInputState(e.target.value);
            if (buttonLabel == "Thank you") {
              setButtonLabel("Send");
            }
          }}
          value={inputState}
        ></textarea>
        {/* Tooltip for Validation Errors */}
        {submitted && !inputState && (
          <Tooltip message={`${label} is required`} position="bottom" />
        )}
      </div>
    </div>
  );
}

export default ContactMessage;
