import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function SideImage() {

const  containerStyle = {
    border: "2px solid black",
    width: "780px",
    height: "390px",
    marginTop: "16px",
    backgroundColor: "black",
    bottom: "50px",
    left: "60%",
    color: "white",
    textAlign: "left",
  };

  const imageStyle = {
    // bottom: "140px",
    // left: "274px",
    color: "white",
    textAlign: "left",
    paddingLeft:"74px",
  };

  const contentStyle = {
    bottom: "80px",
    left: "74px",
    color: "white",
    textAlign: "left",
  };

  const logoStyle = {
    bottom: "250px",
    left: "74px",
    color: "white",
    textAlign: "left",
  };

  const pStyle = {
    bottom: "244px",
    left: "144px",
    color: "white",
    textAlign: "left",
  };

  const navigators = {
    bottom: "24px",
    left: "364px",
    color: "white",
    textAlign: "left",
    justifyContent: "space-evenly",
  };

  return (
    <div style={containerStyle}>
      <img style={logoStyle} src="images/iphone_logo.png" />
      <p style={pStyle}>Iphone 14 Series</p>
      <img style={imageStyle} src="images/iphone_image.png" />
      <div style={contentStyle}>
        <p style={{ fontSize: "35px", fontWeight: "bold" }}>
          Up to 10% <br></br> off voucher
        </p>
        <a style={{ fontSize: "15px" }}>
          <u>Shop Now</u>
        </a>
        &nbsp;&nbsp;
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
      <div style={navigators}>
        <img src="images/Ellipse 7.png" style={{ marginRight: "10px" }} />
        <img src="images/Ellipse 7.png" style={{ marginRight: "10px" }} />
        <img src="images/ellipse.png" style={{ marginRight: "10px" }} />
        <img src="images/Ellipse 7.png" style={{ marginRight: "10px" }} />
        <img src="images/Ellipse 7.png" />
      </div>
    </div>
  );
}
