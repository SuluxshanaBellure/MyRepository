import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import DarkModeContext from "./DarkModeContext ";
import WishlistPopup from "./WishlistPage";
import WishlistPage from "./WishlistPage";
import Dropdown from 'react-bootstrap/Dropdown';

const Header = ({
  cartItems,
  toggleCartPopup,
  wishlistItems,
  toggleWishlistPopup,
}) => {
  const [showWishlist, setShowWishlist] = useState(false);

  const handleCartIconClick = () => {
    toggleCartPopup();
  };

  // const handleWishlistIconClick = () => {
  //   toggleWishlistPopup();
  // };

  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  const headerStyle = {
    position: "fixed",
    width: "100%",
    zIndex: 1,
    top: 45,
    backgroundColor: "#c2d1f0",
  };

  const flexContainer = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 18px",
  };

  const listItemStyle = {
    marginRight: "30px",
    paddingTop: "8px",
    fontWeight: "bold",
  };

  const iconStyle = {};

  const darkModeButtonStyle = {
    backgroundColor: isDarkMode ? "#333" : "#fff",
    color: isDarkMode ? "#fff" : "#333",
    border: "none",
    borderRadius: "5px",
    padding: "8px 12px",
    cursor: "pointer",
    outline: "none",
  };

  const [showDropdown, setShowDropdown] = useState(false);

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  return (
    <div>
      <header style={headerStyle}>
        <div style={flexContainer}>
          <div>
            <Link to="/">
              <img
                src="https://storiesflistgv2.blob.core.windows.net/stories/2022/05/brand-logos-banner.jpg"
                style={{ width: "150px", height: "50px", marginLeft: "66px" }}
                alt="logo"
              />
            </Link>
          </div>
          <nav>
            <ul style={{ display: "flex", listStyleType: "none" }}>
              <li style={listItemStyle}>
                <Link to="/books">Books</Link>
              </li>
              <li style={listItemStyle}>
                <Link to="/coffeemugs">Coffee Mugs</Link>
              </li>
              <li style={listItemStyle}>
                <Link to="/mousepads">Mouse Pads</Link>
              </li>
              <li style={listItemStyle}>
                <Link to="/lugguagetags">Luggage Tags</Link>
              </li>
              <li style={listItemStyle}>
                <Link to="/add">AddProduct</Link>
              </li>
            </ul>
          </nav>
          {/* <div>
            <button onClick={toggleDarkMode} style={darkModeButtonStyle}>
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button> 
          </div> */}
          <div style={{  }}>
           <Link to="/collection">
            <FontAwesomeIcon
              icon={faHeart}
              style={{color:"red"}}
            />
          </Link>
            <Link to="/cart">
              <FontAwesomeIcon
                onClick={handleCartIconClick}
                icon={faCartShopping}
                style={iconStyle}
              />
            </Link>

            {cartItems.length > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "2px",
                  right: "3px",
                  backgroundColor: "#ff0000",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {cartItems.length}
              </span>
            )}
          </div>
        </div>
      </header>
      {/* <WishlistPage
        wishlistItems={wishlistItems}
      /> */}
    </div>
  );
};

export default Header;
