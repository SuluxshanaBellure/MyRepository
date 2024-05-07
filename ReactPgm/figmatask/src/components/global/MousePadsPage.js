import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "./bookspage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import DarkModeContext from "./DarkModeContext ";
import { Link } from "react-router-dom";
import WishlistPopup from "./WishlistPopup";

export default function MousePadsPage({
  cartItems,
  addToWishlist,
  setCartItems,
  setSelectedProduct,
  selectedProduct,
  wishlistItems,
  showPopup,setShowPopup,
}) {
  const { isDarkMode } = useContext(DarkModeContext);

  const [mousepads, setMousepads] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/mousepads")
      .then((response) => {
        setMousepads(response.data);
      })
      .catch((error) => {
        console.error("Error fetching mouse pads:", error);
      });
  }, []);

  const chunkArray = (arr, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const groupedMousepads = chunkArray(mousepads, 4);

  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }

  const mouseImages = importAll(
    require.context(
      "../../assets/images/products/mousepads",
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
      {groupedMousepads.map((group, index) => (
        <div
          key={index}
          style={{ margin: "0 169px", top: "95px" }}
          className="cardContainer"
        >
          {group.map((mousepad) => (
            <Card key={mousepad.sku} className="card">
              <div
                style={{ backgroundColor: isDarkMode ? "#E8E8E8" : "#fff" }}
                className="wishlistIconStyle"
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  onClick={() => handleAddToWishlist(mousepad)}
                />
              </div>
              <Link key={mousepad.sku} to={`/pdp/${mousepad.sku}`}>
                <Card.Img
                  variant="top"
                  style={{ backgroundColor: isDarkMode ? "#E8E8E8" : "#fff" }}
                  src={mouseImages[mousepad.image_url]}
                  alt={mousepad.name}
                />
              </Link>

              <Card.Body
                style={{ backgroundColor: isDarkMode ? "#E8E8E8" : "#fff" }}
              >
                <ListGroup className="list-group-flush">
                  <div>
                    <span className="booknamestyle">
                      {mousepad.name.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <span className="bookdescriptionstyle">
                      {mousepad.description}
                    </span>
                  </div>
                  <div className="bookpricestyle">
                    <span>₹</span>
                    {mousepad.unit_price}
                  </div>
                  <div>
                    <button
                      className="addToCartButton"
                      onClick={() => handleAddToCart(mousepad)}
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
