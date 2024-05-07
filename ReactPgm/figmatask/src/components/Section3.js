import React from "react";

export default function Section3() {
  const containerStyle = {
    display: "flex",
    position: "relative",
    paddingTop: "20px",
  };

  const divStyle1 = {
    width: "50%",
    padding: "10px",
    border: "1px solid #ccc",
    backgroundColor: "black",
    marginRight: "25px",
    marginBottom: "20px",
  };

  const divStyle2 = {
    width: "96%",
    padding: "10px",
    border: "1px solid #ccc",
    backgroundColor: "black",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "row",
    height: "300px",
    justifyContent: "flex-end", 
  };

  const buttonContainer = {
    display: "flex",
    alignItems: "center",
  };

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

  const h2Style = {
    color: "white",
  };

  const innerDiv = {
    display: "flex",
    flexDirection: "row",
  };

  const subDivStyle = {
    width: "50%",
    padding: "10px",
    border: "1px solid #ccc",
    backgroundColor: "black",
    marginRight: "25px",
    marginBottom: "20px",
    height: "250px",
  };

  const outerDiv={

  }
  const bottomLeft1 = {
    position: "absolute",
    bottom: "126px",
    left: "104px",
    color: "white",
    textAlign:"left",
  };
  const bottomLeft2 = {
    position: "absolute",
    bottom: "326px",
    left: "614px",
    color: "white",
    textAlign:"left",
  };
  const bottomLeft3 = {
    position: "absolute",
    bottom: "50px",
    left: "604px",
    color: "white",
    textAlign:"left",
  };
  const bottomLeft4 = {
    position: "absolute",
    bottom: "50px",
    left: "834px",
    color: "white",
    textAlign:"left",
  };

  return (
    <div>
      <div style={buttonContainer}>
        <button style={buttonStyle}></button>
        <p style={featuredTextStyle}>Featured</p>
      </div>
      <br />
      <h4 style={{ textAlign: "left",fontWeight: "bold" }}>New Arrivals</h4>

      <div style={containerStyle}>
        <div style={divStyle1}>
          <img src="images/playstation1.png" alt="Playstation 1" />
          <div style={bottomLeft1}>
                <h3>PlayStation 5</h3>
                <p>Black & White version of the PS5 <br></br>
                coming out on sale</p>
                <a><u>Shop Now</u></a>
                </div>
        </div>
        <div style={outerDiv}>
          <div style={divStyle2}>
          <img src="images/women.png" alt="Women" />
            <div style={bottomLeft2}>
                <h3>Women's Collection</h3>
                <p>Featured women's collection <br></br>
                that give you another vibe</p>
                <a><u>Shop Now</u></a>
                </div>
          </div>
          <div style={innerDiv}>
            <div style={subDivStyle}>
                <img src="images/speakers.png"/>
                <div style={bottomLeft3}>
                <h3 style={{fontSize:"14px",}}>Speakers</h3>
                <p style={{fontSize:"10px",}}>Amazon wireless speakers</p>
                <a style={{fontSize:"10px",}}><u>Shop Now</u></a>
                </div>
            </div>
            <div style={subDivStyle}>
            <img src="images/perfume.png"/>

            <div style={bottomLeft4}>
                <h3 style={{fontSize:"14px",}}>PlayStation 5</h3>
                <p style={{fontSize:"10px",}}>Black & White version of the PS5<br></br>
                coming out on sale</p>
                <a style={{fontSize:"10px",}}><u>Shop Now</u></a>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
