import React, { useState } from "react";
import ContactInput from "./ContactInput";
import ContactMessage from "./ContactMessage";
import { isValidEmail } from "../../utils";

//TODO: handle form data submitting

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("Send");

  const formHandler = () => {
    // Validation Logic
    if (!name || !email || !message) {
      setSubmitted(true);
      setButtonLabel("Please fill in all fields");
      return;
    }

    if (!isValidEmail(email)) {
      setSubmitted(true);
      setButtonLabel("Please enter a valid email");
      return;
    }

    // Form Submission Logic
    setName("");
    setEmail("");
    setMessage("");
    setSubmitted(false);
    setButtonLabel("Thank you");

    //form data handling
    console.log("Form submitted:", { name, email, message });
  };

  return (
    <div
      className="
      mt-6 tablet:mt-8 laptop:mt-10
      rounded-3xl
    h-96 tablet:h-[500px] laptop:h-[540px] desktop:h-[540px]
     w-[95%] tablet:w-full mx-auto
    relative
  "
    >
      <div
        className="absolute bg-whitenoise inset-[1px] 
      rounded-3xl"
      ></div>
      <div
        className="relative w-full h-full bg-graydark bg-opacity-95 
        rounded-3xl
        pt-4 tablet:pt-5 
        pb-9 tablet:pb-12
      "
      >
        {/* Name Input */}
        <div className="h-1/5">
          <ContactInput
            label="Name"
            placeholder="Your Name"
            inputState={name}
            setInputState={setName}
            submitted={submitted}
            setSubmitted={setSubmitted}
            buttonLabel={buttonLabel}
            setButtonLabel={setButtonLabel}
          />
        </div>
        {/* Email Input */}
        <div className="h-1/5">
          <ContactInput
            label="Email"
            placeholder="Your Email"
            inputState={email}
            setInputState={setEmail}
            submitted={submitted}
            setSubmitted={setSubmitted}
            buttonLabel={buttonLabel}
            setButtonLabel={setButtonLabel}
            validate
            validationError={
              !isValidEmail(email) ? "Invalid email address" : null
            }
          />
        </div>
        {/* Message Input */}
        <div className="h-2/5">
          <ContactMessage
            label="Message"
            placeholder="Message"
            inputState={message}
            setInputState={setMessage}
            submitted={submitted}
            buttonLabel={buttonLabel}
            setButtonLabel={setButtonLabel}
          />
        </div>
        <div className="w-[88%] mx-auto">
          <button
            className="
            mt-12 tablet:mt-16
            h-9 tablet:h-11 laptop:h-12
            rounded-xl
            bg-custom-gradient
            w-full
            font-bold
            text-sm tablet:text-base text-white
             "
            onClick={formHandler}
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
