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
import WishlistPopup from "./WishlistPopup";

export default function LugguageTagsPage({
  cartItems,
  addToWishlist,
  setCartItems,
  setSelectedProduct,
  selectedProduct,
  wishlistItems,
  howPopup,setShowPopup,
}) {
  const { isDarkMode } = useContext(DarkModeContext);

  const [luggagetag, setluggagetag] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/luggagetags")
      .then((response) => {
        setluggagetag(response.data);
      })
      .catch((error) => {
        console.error("Error fetching luggage tags:", error);
      });
  }, []);

  const chunkArray = (arr, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
      return null;
    });
    return images;
  };

  const groupedluggagetag = chunkArray(luggagetag, 4);

  const luggageImages = importAll(
    require.context(
      "../../assets/images/products/luggagetags",
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
      {groupedluggagetag.map((group, index) => (
        <div
          key={index}
          style={{ margin: "0 169px", top: "95px" }}
          className="cardContainer"
        >
          {group.map((luggageTag) => (
            <Card key={luggageTag.sku} className="card">
              <div
                style={{ backgroundColor: isDarkMode ? "#E8E8E8" : "#fff" }}
                className="wishlistIconStyle"
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  onClick={() => handleAddToWishlist(luggageTag)}
                />
              </div>
              <Link key={luggageTag.sku} to={`/pdp/${luggageTag.sku}`}>
                <Card.Img
                  variant="top"
                  style={{ backgroundColor: isDarkMode ? "#E8E8E8" : "#fff" }}
                  src={luggageImages[luggageTag.image_url]}
                  alt={luggageTag.name}
                />
              </Link>

              <Card.Body
                style={{ backgroundColor: isDarkMode ? "#E8E8E8" : "#fff" }}
              >
                <ListGroup className="list-group-flush">
                  <div>
                    <span className="booknamestyle">
                      {luggageTag.name.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <span className="bookdescriptionstyle">
                      {luggageTag.description}
                    </span>
                  </div>
                  <div className="bookpricestyle">
                    <span>₹</span>
                    {luggageTag.unit_price}
                  </div>{" "}
                  <div>
                    <button
                      className="addToCartButton"
                      onClick={() => handleAddToCart(luggageTag)}
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
