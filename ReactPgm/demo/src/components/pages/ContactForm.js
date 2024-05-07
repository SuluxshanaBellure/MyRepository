import React from "react";
import { useContactFormContext } from "./ContactProvider";

const ContactForm = () => {
  const { formData, updateFormData, resetForm } = useContactFormContext();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Your Name"
      /><br></br>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Your Email"
      /><br></br>
      <textarea
         type="text"
        name="message"
        value={formData.message}
        onChange={handleInputChange}
        placeholder="Your Message"
      ></textarea><br></br>
      <button type="submit" className="btn btn-success">Submit</button>
    </form>
  );
};

export default ContactForm;
