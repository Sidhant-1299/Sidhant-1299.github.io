import React from "react";
import PageHeader from "../PageHeader";
import { header } from "../Data/ContactData";
import ContactForm from "./ContactForm";
import { useState } from "react";
import useIntersectionObserver from "../../utils/useInterSectionObserver";

//Has big height

function Contact() {
  const { ref, isVisible } = useIntersectionObserver();
  const [hasAnimated, setHasAnimated] = useState(false);

  if (isVisible && !hasAnimated) {
    setHasAnimated(true);
  }
  return (
    <div
      id="contact"
      ref={ref}
      className={`h-[80vh]
      tablet:h-[85vh]
      laptop:pl-8
   mt-16 tablet:mt-20 laptop:mt-24
   tablet:pt-8 laptop:pt-0
   w-[90%] laptop:w-[95%] mx-auto
   ${
     hasAnimated ? "translate-y-2 opacity-100" : "-translate-y-2 opacity-0"
   } duration-700`}
    >
      <PageHeader header={header} />
      <ContactForm />
    </div>
  );
}

export default Contact;
