import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faMeta,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import Skills from "../pages/Skills";
import Header from "../header/Header";
import Services from "../pages/Services";

const Section1 = () => {

  const [iconStyles, setIconStyles] = React.useState({
    instagram: {
      marginRight: "10px",
      backgroundColor: "",
    },
    meta: {
      marginRight: "10px",
      backgroundColor: "",
    },
    youtube: {
      marginRight: "10px",
      backgroundColor: "",
    },
  });

  const changeBackground = (iconName, color) => {
    setIconStyles({
      ...iconStyles,
      [iconName]: {
        ...iconStyles[iconName],
        backgroundColor: color,
      },
    });
  };

  const button1 = {
    backgroundColor: "#8a51e0",
    borderRadius: "5px",
    border: "none",
    marginRight: "10px",
    padding: "5px",
    width: "120px",
  };
  const skillsSectionRef = React.useRef(null);

  const scrollToSkills = () => {
    if (skillsSectionRef.current) {
      skillsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const servicesSectionRef = React.useRef(null);

  const scrollToServices = () => {
    if (servicesSectionRef.current) {
        servicesSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const methodsObject = {
    scrollToSkills,
    scrollToServices,
    
  };
  return (
    <div style={{ paddingLeft: "250px", paddingRight: "250px" }}>
        <Header methods={methodsObject}/>
      <hr />
      <div className="container text-center">
        <div className="row">
          <div className="col-lg-6 para1">
            <p>Hello welcome</p>
            <h3>
              I'm Suluxshana Bellure
              <br />
              Software Developer
            </h3>
            <br />
            <button style={button1}>Hire me</button>
            <button className="btn btn-light" style={{border:"1px solid black"}}>See portfolio</button>
            <br />
            <br />
            <p>
              Lorem ipsum is a placeholder text commonly used to demonstrate
              the visual form of a document or a typeface without relying on
              meaningful content. Lorem ipsum may be used as a placeholder
              before final copy is available.
            </p>
          </div>
          <div className="col-lg-6 para2">
            <div>
              <h5>6+</h5>
              <p>Years of experience</p>

              <h5>100%</h5>
              <p>Success Rate</p>

              <h5>150+</h5>
              <p>Happy Rates</p>

              <h5>249+</h5>
              <p>Projects completed</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p style={{ fontFamily: "cursive", fontWeight: "bold" }}>
              Follow me :
              <FontAwesomeIcon
                icon={faInstagram}
                style={iconStyles.instagram}
                onMouseOver={() => changeBackground("instagram", "blue")}
                onMouseLeave={() => changeBackground("instagram", "")}
              />
              <FontAwesomeIcon
                icon={faMeta}
                style={iconStyles.meta}
                onMouseOver={() => changeBackground("meta", "green")}
                onMouseLeave={() => changeBackground("meta", "")}
              />
              <FontAwesomeIcon
                icon={faYoutube}
                style={iconStyles.youtube}
                onMouseOver={() => changeBackground("youtube", "red")}
                onMouseLeave={() => changeBackground("youtube", "")}
              />
            </p>
          </div>
        </div>
        <div ref={skillsSectionRef}>
          <Skills />
        </div>
        <div ref={servicesSectionRef}>
          <Services />
        </div>
      </div>
    </div>
  );
};

export default Section1;