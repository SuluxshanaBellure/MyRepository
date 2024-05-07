import React from "react";

const SectionThree = () => {
  const containerStyle = {
    display: "flex",
    gap: "20px",
  };

  const cardStyle = {
    width: "50%",
    borderRadius: "15px",
    height: "400px",
  };

  const innerBox = {
    textAlign: "left",
    paddingLeft: "10px",
    paddingTop: "5px",
    backgroundColor: "#ebebe0",
    borderTopLeftRadius: "15px",
    borderTopRightRadius: "15px",
  };

  const codeSnippet = `
    function Display() {  
      return (
        <div>
          <h3>Hello, welcome to TechDenali</h3>
        </div>
      );
    }
  `;
  const Display = () => {
    return (
      <div>
        <h3>Hello, welcome to TechDenali</h3>
      </div>
    );
  };

  const OutputBox = () => (
    <div className="output-box" style={{ padding: "10px" }}>
      <h6>Output:</h6>
      <div>
        <Display />
      </div>
    </div>
  );

  return (
    <div style={containerStyle}>
      <div className="card" style={{ ...cardStyle, marginLeft: "30px" }}>
        <div style={innerBox}>
          <p>VideoList.js</p>
        </div>
        <div className="card-body">
          <p className="card-text">{codeSnippet}</p>
        </div>
      </div>
      <div className="card" style={cardStyle}>
        <div className="card-body">
          <OutputBox />
        </div>
      </div>
    </div>
  );
};

export default SectionThree;
