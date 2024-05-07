import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Buttons(props) {
  const navigate = useNavigate();

  const handleNavigate = () => {
     alert("You will be redirected to the learn page...");
    // <p>You will be redirected to the learn page...</p>
    setTimeout(() => {
      window.location.href = "/learn";
    }, 3000);
  };
  

  const button1 = {
    borderRadius: "30px",
    padding: "10px",
    width: "150px",
  };

  const button2 = {
    borderRadius: "30px",
    padding: "10px",
    width: "150px",
    border: "1px solid black",
  };

  return (
    <div className="mt-4">
      <button
        className="btn btn-primary mr-4"
        style={button1}
        onClick={handleNavigate}
      >
        Learn React
      </button>

      <button className="btn btn-light" style={button2}>
        API Reference
      </button>
    </div>
  );
}

