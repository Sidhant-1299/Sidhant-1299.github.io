import React from "react";
import { useState } from "react";

function ContactInput({
  label,
  placeholder,
  inputState,
  setInputState,
  setSubmitted,
}) {
  //state to make the border when input is selected
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="h-full w-[88%] mx-auto ">
      {/* label */}
      <div className="h-1/3 w-full">
        <h1
          className="
        text-graylight 
        text-sm tablet:text-base
        px-5 tablet:px-6
        tablet:pt-1
        leading-2
        "
        >
          {label}
        </h1>
      </div>
      {/* INPUT AREA */}
      <div
        className=" w-full relative group
      h-8 tablet:h-11 laptop:h-12
      "
      >
        {/* GLOWS WHEN INPUT IS SELECTED */}
        <div
          className={`absolute -inset-[1px] 
        bg-custom-gradient rounded-xl 
          ${isFocused ? "visible" : "invisible"}`}
        ></div>
        <input
          type="text"
          placeholder={placeholder}
          className="relative h-full w-full bg-gray rounded-xl
             outline-none
            text-white
            text-sm
            px-5 tablet:px-6
          "
          value={inputState}
          onChange={(e) => {
            setInputState(e.target.value);
            setSubmitted(false);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        ></input>
      </div>
    </div>
  );
}

export default ContactInput;
