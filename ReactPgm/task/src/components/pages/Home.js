import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import CustomCarousel from "./CustomCarousel";
import Products from "./Products";
import Header from "../global/Header";

const Home = () => {
  return (
    <div
      style={{
        width: "750px",
        marginLeft: "280px",
        marginRight: "220px",
        textAlign: "center",
      }}
    >
      <Helmet>
        <title>Home Page</title>
      </Helmet>

    
      <CustomCarousel />
      <br></br>
      <Products />
    </div>
  );
};

export default Home;
