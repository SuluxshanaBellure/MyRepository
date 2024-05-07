import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import placeholderImage from "../../assets/images/products/placeholder1.png";
import styled from "styled-components";
import "./bookspage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import DarkModeContext from "./DarkModeContext ";
import { Link } from "react-router-dom";
import WishlistPage from "./WishlistPage";
import WishlistPopup from "./WishlistPopup";

export default function CoffeeMugsPage({ showPopup,setShowPopup,cartItems, addToWishlist,wishlistItems, setCartItems,setSelectedProduct,selectedProduct}) {
  const { isDarkMode } = useContext(DarkModeContext);

  const [mugs, setMugs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/coffeemugs")
      .then((response) => {
        setMugs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching mugs:", error);
      });
  }, []);

  const chunkArray = (arr, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const groupedMugs = chunkArray(mugs, 4);

  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }

  const mugImages = importAll(
    require.context(
      "../../assets/images/products/coffeemugs",
      false,
      /\.(png|jpe?g|svg)$/
    )
  );

  const handleAddToCart = (item) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.sku === item.sku
    );
    console.log("cart item " + cartItems.sku);
    console.log("item id" + item.sku);
    if (existingItemIndex === -1) {
      setCartItems((prevCartItems) => [
        ...prevCartItems,
        { ...item, quantity: 1 },
      ]);
      alert("Product added to cart!");
    } else {
      const updatedCartItems = cartItems.map((cartItem, index) => {
        if (index === existingItemIndex) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });
      setCartItems(updatedCartItems);
      alert("Product already exists, quantity updated!");
    }
  };
  

 const handleAddToWishlist = (product) => {
  setSelectedProduct(product);
  setShowPopup(true);
};


  return (
    <div style={{ backgroundColor: isDarkMode ? "#E8E8E8" : "#fff" }}>
      {groupedMugs.map((group, index) => (
        <div
          key={index}
          style={{ margin: "0 169px", top: "95px" }}
          className="cardContainer"
        >
          {group.map((mug) => (
            <Card
              key={mug.sku}
              style={{ width: "14rem", margin: "10px", border: "none" }}
            >
              <div
                style={{ backgroundColor: isDarkMode ? "#E8E8E8" : "#fff" }}
                className="wishlistIconStyle"
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  onClick={() => handleAddToWishlist(mug)}
                />
              </div>
              <Link key={mug.sku} to={`/pdp/${mug.sku}`}>
                <Card.Img
                  variant="top"
                  style={{ backgroundColor: isDarkMode ? "#E8E8E8" : "#fff" }}
                  src={mugImages[mug.image_url]}
                  alt={mug.name}
                />
              </Link>

              <Card.Body
                style={{ backgroundColor: isDarkMode ? "#E8E8E8" : "#fff" }}
              >
                <ListGroup className="list-group-flush">
                  <div>
                    <span className="booknamestyle">
                      {mug.name.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <span className="bookdescriptionstyle">
                      {mug.description}
                    </span>
                  </div>
                  <div className="bookpricestyle">
                    <span>₹</span>
                    {mug.unit_price}
                  </div>
                  <div style={{ display: "flex" }}>
                    <button
                      className="addToCartButton"
                      onClick={() => handleAddToCart(mug)}
                    >
                      <FontAwesomeIcon
                        icon={faCartShopping}
                        style={{ marginRight: "10px" }}
                      />
                      ADD TO CART
                    </button>
                  </div>
                </ListGroup>
              </Card.Body>
            </Card>
          ))}
        </div>
      ))}
        {/* <WishlistPopup showPopup={showPopup} setShowPopup={setShowPopup} wishlistItems={wishlistItems} 
      addToWishlist={addToWishlist} 
      selectedProduct={selectedProduct}/>  */}
    </div>
  );
  
}
