import React from "react";
import ContactForm from "./ContactForm";
import ContactProvider from "./ContactProvider";

const ContactDisplay = () => {
  return (
    <ContactProvider>
      <ContactForm />
    </ContactProvider>
  );
};

export default ContactDisplay;
