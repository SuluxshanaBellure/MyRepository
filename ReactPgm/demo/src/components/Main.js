import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer } from "./Footer";
import Section1 from "./body/Section1";
import About from "./pages/About";
import ContactDisplay from "./pages/ContactDisplay";

export function Main() {
  return (
    <Router>
      <Section1 />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactDisplay />} />
      </Routes>
      <br></br>
      <br></br>
      <Footer />
    </Router>
  );
}
