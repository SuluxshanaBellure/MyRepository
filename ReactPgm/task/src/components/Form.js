import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Form() {
  const [email, setemail] = React.useState("");
  const [value, setValue] = React.useState("");
  const [birthDate, setBirthDate] = React.useState("");
  // const [hasError, setHasError] = React.useState(false);

  function onChange(e) {
    if (!e.target.validity.patternMismatch) {
      setValue(e.target.value);
    }
  }

  const handleEmail = (e) => {
    if (!e.target.validity.patternMismatch) {
      setemail(e.target.value);
    }
  };

  // React.useEffect(()=>{
  //   try {
  //       handleEmail();
  //   } catch (error) {
  //       setHasError(true);
  //   }
  // },)
  const todayDate = new Date();
  const birthYear = new Date(birthDate);
  const age = todayDate.getFullYear() - birthYear.getFullYear();

  return (
    <>
      <input id="fname" type="text" placeholder="First Name" />
      <br></br>
      <br></br>
      <input id="lname" type="text" placeholder="Last Name" />
      <br></br>
      <br></br>
      <input
        id="email"
        pattern="/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+(@gmail.com)$/gmi"
        type="text"
        placeholder="Email"
        value={email}
        onChange={handleEmail}
      />

      <br></br>
      <br></br>
      <input
        value={value || ""}
        pattern="^[0-9]*$"
        maxLength={10}
        placeholder="Phone number"
        onChange={onChange}
      />
      <br></br>
      <br></br>

      <label>DOB :</label>

      <DatePicker
        selected={birthDate}
        onChange={(date) => setBirthDate(date)}
        showIcon
        toggleCalendarOnIconClick
        maxDate={new Date()}
      />

      {birthDate && <p>Your age is {age} years.</p>}

      <br></br><br>
      </br>
      <a href="/home"><button>Home</button></a>
      
      <button>Plp</button>

      <button>Pdp</button>

      <button>Cart</button>

    </>
  );
}
