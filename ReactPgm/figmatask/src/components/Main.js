import React, { useState } from "react";
// import TopHeader from "./global/TopHeader";
// import Header from "./global/Header";
// import Footer from "./global/Footer";
import MySideBar from "./global/MySideBar";
// import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import SectionOne from "./SectionOne";
// import SideImage from "./SideImage";
import BottomFooter from "./BottomFooter";

export default function Main() {
  
  return (
    <div>
      <MySideBar />
      <br />
      <br />
      <SectionOne/>
      <br />
      <Section2 />
      <Section3 />
      <br />
      <BottomFooter />
      <br />
      </div>
  );
}