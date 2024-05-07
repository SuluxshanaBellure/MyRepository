import React from "react";

const ContactFormContext = React.createContext();

export default function ContactProvider({children}){
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        message: "",
      });
    
      const updateFormData = (fieldName, value) => {
        setFormData({
          ...formData,
          [fieldName]: value,
        });
      };
    
      const resetForm = () => {
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      };
    return(
        <>
          <ContactFormContext.Provider value={{ formData, updateFormData, resetForm }}>
           {children}
          </ContactFormContext.Provider>
        </>
    )
}

export const useContactFormContext=()=>React.useContext(ContactFormContext);