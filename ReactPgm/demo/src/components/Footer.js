import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faMeta,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
//import { NavLink } from "react-router-dom";

export function Footer() {
  const button1 = {
    backgroundColor: "#8a51e0",
    borderRadius: "5px",
    border: "none",
    marginRight: "10px",
    padding: "5px",
    width: "120px",
  };

  const footerStyle = {
    paddingLeft: "250px",
    paddingRight: "250px",
    height: "350px",
    backgroundColor: "black",
    color: "white",
    paddingTop: "25px",
    display: "flex",
    justifyContent: "space-between",
  };

  const columnStyle = {
    flex: "1",
    paddingTop: "10px",
    boxSizing: "border-box",
    height: "270px",
  };

  const inputStyle = {
    width: "300px",
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "#e3e1e3",
  };
  return (
    <div style={footerStyle}>
      <div className="column" style={columnStyle}>
        <h5>Do you want to build beautiful apps ?</h5>
        <br />
        <button style={button1}>Hire me</button>
        <br />
        <br />
      </div>
      <div className="column" style={columnStyle}>
        <input placeholder="Enter your email" style={inputStyle} />
        <br></br>
        <br></br>
        <button className="btn btn-light">Subscribe</button>
        <br></br>
        <br></br>
        <p style={{ marginRight: "10px" }}>Follow me :</p>
        <FontAwesomeIcon icon={faInstagram} style={{ marginRight: "10px" }} />
        <FontAwesomeIcon icon={faMeta} style={{ marginRight: "10px" }} />
        <FontAwesomeIcon icon={faYoutube} />
      </div>
    </div>
  );
}
