import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

export default function Header({methods}) {
  const buttonStyle = {
    border: "1px solid black",
    height: "35px",
    width: "120px",
    display: "flex",
    marginRight: "500px",
  };

  const iconStyle = {
    marginRight: "8px",
  };

  const{ scrollToSkills, scrollToServices} = methods ;
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-white" style={{ marginLeft: "250px" }}>
      <div className="container justify-content-between">
        <NavLink className="navbar-brand" to="/">
          <img src="images/logo.png" alt="Logo" />
        </NavLink>
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/about">
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/services" onClick={scrollToServices}>
              Services
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link " to="/skills" onClick={scrollToSkills }>
              Skills
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/contact">
              Contact
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/form">
              Register
            </NavLink>
          </li>
        </ul>
        
        <div>
          <button className="btn btn-light" style={buttonStyle}>
            <FontAwesomeIcon icon={faPhone} style={iconStyle} />
            <span className="d-none d-sm-block">Let's talk</span>
          </button>
        </div>
        
      </div>
    </nav>
    
    </>
  );
}
