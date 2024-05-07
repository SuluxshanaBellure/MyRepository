import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import SearchBar from "./header/SearchBar";
import TopBar from "./header/TopBar";
import Page from "../layout/Page";
import Footer from "./footer/Footer";
import Navigation from "./header/Navigation";

export default function Main() {
  return (
    <Router>
      <div style={{ textAlign: "center" }}>
        <TopBar country="Support Ukraine" />
        <div style={{ display: "flex", alignItems: "center" }}>
          <SearchBar />
          <Navigation />
        </div>
        <Page />
        <Footer />
      </div>
    </Router>
  );
}

