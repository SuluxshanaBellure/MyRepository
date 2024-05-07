import React, { useContext } from "react";
import { GolbalInfo } from "../App";

const SuperChild = () => {
  const appColor = useContext(GolbalInfo);
  //console.log("App color : ", appColor);

  return (
    <>
      <br></br>
      <br></br>
      <h5 style={{ backgroundColor: appColor }}>Super child component</h5>
    </>
  );
};

export default SuperChild;
