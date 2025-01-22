import React from "react";
import PageHeader from "../PageHeader";
import { header } from "../Data/ContactData";
import ContactForm from "./ContactForm";

//Has big height

function Contact() {
  return (
    <div
      id="contact"
      className="
      h-[80vh]
      tablet:h-[85vh]
      laptop:pl-8
   mt-16 tablet:mt-20 laptop:mt-24
   tablet:pt-8 laptop:pt-0
   w-[90%] laptop:w-[95%] mx-auto
   
   "
    >
      <PageHeader header={header} />
      <ContactForm />
    </div>
  );
}

export default Contact;
