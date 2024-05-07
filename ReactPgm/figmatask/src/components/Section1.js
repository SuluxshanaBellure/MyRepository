import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  faPhone,
  faDesktop,
  faClock,
  faCamera,
  faHeadphones,
  faGamepad,
} from "@fortawesome/free-solid-svg-icons";

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
};
const divStyle = {
  border: "2px solid #f2f2f2",
  borderRadius: "2px",
  height: "140px",
  paddingTop: "24px",
};

const items = [
  <div className="item" data-value="1">
    <Col>
      <div style={divStyle}>
        <FontAwesomeIcon icon={faPhone} style={{ fontSize: "45px" }} />
        <br></br>
        <br></br>
        <h6>Phones</h6>
      </div>
    </Col>
  </div>,
  <div className="item" data-value="2">
    <div style={divStyle}>
      <FontAwesomeIcon icon={faDesktop} style={{ fontSize: "45px" }} />
      <br></br>
      <br></br>
      <h6>Computers</h6>
    </div>
  </div>,
  <div className="item" data-value="3">
    <div style={divStyle}>
      <FontAwesomeIcon icon={faClock} style={{ fontSize: "45px" }} />
      <br></br>
      <br></br> <h6>SmartWatch</h6>
    </div>
  </div>,
  <div className="item" data-value="4">
    <div style={divStyle}>
      <FontAwesomeIcon icon={faCamera} style={{ fontSize: "45px" }} />
      <br></br>
      <br></br>
      <h6>Camera</h6>
    </div>
  </div>,
  <div className="item" data-value="5">
    <div style={divStyle}>
      <FontAwesomeIcon icon={faHeadphones} style={{ fontSize: "45px" }} />
      <br></br>
      <br></br>
      <h6>Headphones</h6>
    </div>
  </div>,
  <div className="item" data-value="5">
    <div style={divStyle}>
      <FontAwesomeIcon icon={faGamepad} style={{ fontSize: "45px" }} />
      <br></br>
      <br></br>
      <h6>Gaming</h6>
    </div>
  </div>,
];

export default function Section1() {
  const renderPrevButton = ({ isDisabled, onClick }) => (
    <FontAwesomeIcon
      icon={faArrowLeft}
      onClick={onClick}
      style={{
        fontSize: "24px",
        color: isDisabled ? "#666666" : "#333333",
        cursor: isDisabled ? "not-allowed" : "pointer",
      }}
    />
  );

  const renderNextButton = ({ isDisabled, onClick }) => (
    <FontAwesomeIcon
      icon={faArrowRight}
      onClick={onClick}
      style={{
        fontSize: "24px",
        color: isDisabled ? "#666666" : "#333333",
        cursor: isDisabled ? "not-allowed" : "pointer",
      }}
    />
  );
  const buttonStyle = {
    backgroundColor: "#DB4444",
    color: "white",
    padding: "8px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "8px",
    height: "35px",
  };

  const featuredTextStyle = {
    color: "#DB4444",
    fontWeight: "bold",
    textAlign: "center",
    margin: 0,
    lineHeight: "35px",
  };

  const buttonContainer = {
    display: "flex",
    alignItems: "center",
  };

  return (
    <>
      <div style={buttonContainer}>
        <button style={buttonStyle}></button>
        <p style={featuredTextStyle}>Categories</p>
      </div>
      <br />
      <div style={buttonContainer}>
        <h4
          style={{
            textAlign: "left",
            color: "black",
            fontWeight: "bold",
            flex: 1,
          }}
        >
          Browse By Category
        </h4>
      </div>
      <br></br>
      <br></br>
      <AliceCarousel
        mouseTracking
        items={items}
        responsive={responsive}
        controlsStrategy="alternate"
        renderPrevButton={renderPrevButton}
        renderNextButton={renderNextButton}
      />
    </>
  );
}
