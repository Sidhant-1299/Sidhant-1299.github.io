// export default ContactInput;

import React, { useState } from "react";
import Tooltip from "./Tooltip";

function ContactInput({
  label,
  placeholder,
  inputState,
  setInputState,
  submitted,
  setSubmitted,
  validate,
  validationError,
  buttonLabel,
  setButtonLabel,
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="h-full w-[88%] mx-auto relative">
      {/* Label */}
      <div className="h-1/3 w-full">
        <h1
          className="
        text-graylight 
        text-sm tablet:text-base
        px-4 tablet:px-6
        tablet:pt-1
        leading-2
        "
        >
          {label}
        </h1>
      </div>
      {/* Input Area */}
      <div className="w-full relative group h-9 tablet:h-11 laptop:h-12">
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
            if (buttonLabel == "Thank you") {
              setButtonLabel("Send");
            }
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {/* Tooltip for Validation Errors */}
        {submitted && (!inputState || (validate && validationError)) && (
          <Tooltip
            message={
              !inputState
                ? `${label} is required`
                : validationError
                ? validationError
                : "Invalid value"
            }
            position="bottom"
          />
        )}
      </div>
    </div>
  );
}

export default ContactInput;
