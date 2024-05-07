import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import DarkModeContext from "./DarkModeContext ";
import { Link } from "react-router-dom";
import WishlistPopup from "./WishlistPopup";
import CollectionPage from "./CollectionPage";

const BooksPage = ({  showPopup,setShowPopup,cartItems, addToWishlist, setCartItems, wishlistItems,setSelectedProduct,selectedProduct,setWishlistItems,
  }) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [books, setBooks] = useState([]);


  useEffect(() => {
    axios
      .get("http://localhost:8081/books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);


  const chunkArray = (arr, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const groupedBooks = chunkArray(books, 4);

  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }

  const bookImages = importAll(
    require.context(
      "../../assets/images/products/books",
      false,
      /\.(png|jpe?g|svg)$/
    )
  );

  const handleAddToCart = (item) => {
    console.log("sssssssssssssssssssssssssssssssssss" , cartItems)
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.sku === item.sku
    );
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
      {groupedBooks.map((group, index) => (
        <div
          key={index}
          style={{ margin: "0 169px", top: "95px" }}
          className="cardContainer"
        >
          {group.map((book) => (
            <Card
              key={book.id}
              style={{ width: "14rem", margin: "10px", border: "none" }}
            >
              {console.log("product category id : ",book.category_id)}
              
              <div
                style={{ backgroundColor: isDarkMode ? "#E8E8E8" : "#fff" }}
                className="wishlistIconStyle"
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  onClick={() => handleAddToWishlist(book)}
                />
              </div>
              <Link key={book.sku} to={`/pdp/${book.sku}`}>
                <Card.Img
                  variant="top"
                  style={{ backgroundColor: isDarkMode ? "#E8E8E8" : "#fff" }}
                  src={bookImages[book.image_url]}
                  alt={book.name}
                />
              </Link>

              <Card.Body
                style={{ backgroundColor: isDarkMode ? "#E8E8E8" : "#fff" }}
              >
                <ListGroup className="list-group-flush">
                  <div>
                    <span className="booknamestyle">
                      {book.name.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <span className="bookdescriptionstyle">
                      {book.description}
                    </span>
                  </div>
                  <div className="bookpricestyle">
                    <span>₹</span>
                    {book.unit_price}
                  </div>
                  <div style={{ display: "flex" }}>
                 
                    <button
                      className="addToCartButton"
                      onClick={() => handleAddToCart(book)}
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
      
    </div>
  );
};

export default BooksPage;
