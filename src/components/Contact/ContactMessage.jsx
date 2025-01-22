import React from "react";
import { useState } from "react";

function ContactMessage({
  label,
  placeholder,
  inputState,
  setInputState,
  setSubmitted,
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
        px-5 tablet:px-6
        
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
            setSubmitted(false);
          }}
          value={inputState}
        ></textarea>
      </div>
    </div>
  );
}

export default ContactMessage;
