import React from "react";
import { useState } from "react";
import ContactInput from "./ContactInput";
import ContactMessage from "./ContactMessage";
//contains message components
//handler for submitng
//handler for checking if every value has been filled before submiting
//email validation
//empty value validation

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const formHandler = () => {
    console.log(name, email, message);
    setName(""), setEmail(""), setMessage(""), setSubmitted(true);
  };

  return (
    <div
      className="

      mt-6 tablet:mt-8 laptop:mt-10
      rounded-3xl
    h-96 tablet:h-[500px] laptop:h-[540px]
     w-[95%] tablet:w-full mx-auto
    relative
    
  "
    >
      <div
        className="absolute bg-whitenoise inset-[1px] 
      rounded-3xl"
      ></div>
      {/* CONTAINS OUR FORM */}
      <div
        className="relative w-full h-full bg-graydark bg-opacity-95 
        rounded-3xl
        pt-4 tablet:pt-5 
        pb-9 tablet:pb-12
      "
      >
        {/* NAME INPUT */}
        <div className="h-1/5">
          <ContactInput
            label="Name"
            placeholder="Your Name"
            inputState={name}
            setInputState={setName}
            setSubmitted={setSubmitted}
          />
        </div>
        {/* EMAIL INPUT */}
        <div className="h-1/5">
          <ContactInput
            label="Email"
            placeholder="Your Email"
            inputState={email}
            setInputState={setEmail}
            setSubmitted={setSubmitted}
          />
        </div>
        {/* MESSAGE INPUT */}
        <div className="h-2/5">
          <ContactMessage
            label="Message"
            placeholder="Message"
            inputState={message}
            setInputState={setMessage}
            setSubmitted={setSubmitted}
          />
        </div>
        <div className="w-[88%] mx-auto">
          <button
            className="
            mt-12 tablet:mt-16
            h-9 tablet:h-11 laptop:h-12
            rounded-xl
            bg-orange-400
            w-full
            font-bold
            text-xs tablet:text-sm text-white
            hover:bg-opacity-90 duration-300"
            onClick={() => formHandler()}
          >
            {submitted ? "Thank you" : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
