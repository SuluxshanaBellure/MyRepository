import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import logo from "../rlogo1.png";

export default function SearchBar() {
  const inputWrapper = {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    border: "1px solid #ccc", // Add a border for illustration
    borderRadius: "40px",
    backgroundColor: "#EEEEEE",
    padding: "8px 15px",
  };

  const inputStyle = {
    flex: "1",
    border: "none",
    backgroundColor: "transparent",
    outline: "none",
    fontSize: "16px",
    height: "20px",
    width: "600px",
  };

  const miniButtonStyle = {
    padding: "0px",
    border: "none",
    color: "#9E9E9E",
    cursor: "pointer",
    borderRadius: "5px",
    width: "40px",
    backgroundColor: "white",
    fontSize: "13px",
  };

  const miniButtonStyleK = {
    marginLeft: "4px",
    padding: "0px",
    border: "none",
    color: "#9E9E9E",
    cursor: "pointer",
    borderRadius: "5px",
    width: "20px",
    backgroundColor: "white",
    fontSize: "13px",
  };

  const searchIconStyle = {
    color: "#9E9E9E",
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
      <img src={logo} alt="Logo" style={{ marginLeft: "30px" }} />
      <form style={inputWrapper}>
        <FontAwesomeIcon icon={faSearch} style={searchIconStyle} />
        <input
          style={inputStyle}
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button style={miniButtonStyle}>Ctrl</button>
        <button style={miniButtonStyleK}>K</button>
      </form>
    </div>
  );
}
