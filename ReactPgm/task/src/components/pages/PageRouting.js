import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import React from "react";
import Home from "./Home";
import PlpPage from "./PlpPage";
import PdpPage from "./PdpPage";
import CartPage from "./CartPage";
import { Product1,Product2 } from "./ProductPdp";

export default function PageRouting() {
  return (
    <>
     
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/plp" element={<PlpPage />} />
        <Route path="/pdp" element={<PdpPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product1" element={<Product1 />} />
        <Route path="/product2" element={<Product2 />} />
      </Routes>
    </>
  );
}
