import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./productpdp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";

const ProductPdp = ({ addToWishlist, cartItems, setCartItems, wishlistItems,setShowPopup  }) => {
  const [product, setProduct] = useState([]);
  const { sku } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/pdp/${sku}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, [sku]);

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

  const mugImages = importAll(
    require.context(
      "../../assets/images/products/coffeemugs",
      false,
      /\.(png|jpe?g|svg)$/
    )
  );

  const mouseImages = importAll(
    require.context(
      "../../assets/images/products/mousepads",
      false,
      /\.(png|jpe?g|svg)$/
    )
  );

  const luggageImages = importAll(
    require.context(
      "../../assets/images/products/luggagetags",
      false,
      /\.(png|jpe?g|svg)$/
    )
  );

  const handleAddToWishlist=(product)=>{
    addToWishlist(product);
    setShowPopup(true);
  }

  return (
    <div>
      {product && (
        <div className="row">
          <div className="column">
            <img
              src={
                product.category_id === 1
                  ? bookImages[product.image_url]
                  : product.category_id === 2
                  ? mugImages[product.image_url]
                  : product.category_id === 3
                  ? mouseImages[product.image_url]
                  : product.category_id === 4
                  ? luggageImages[product.image_url]
                  : null
              }
              alt={product.name}
            />
          </div>
          <div className="column">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>₹{product.unit_price}</p>
            <div className="buttonContainer">
            {/* <button
                      className="wishlistbutton"
                    >
                      <FontAwesomeIcon
                        icon={faHeart}
                        style={{ marginRight: "10px" }}
                        onClick={() => handleAddToWishlist(product)}
                      />
                      WISHLIST
                    </button> */}
              <button
                className="addtocartButton"
                onClick={() => handleAddToCart(product)}
              >
                <FontAwesomeIcon icon={faCartShopping} className="iconStyle" />
                ADD TO CART
              </button>
              <button
                className="wishlistbutton"
                onClick={() => handleAddToWishlist(product)}
              >
                <FontAwesomeIcon icon={faHeart} style={{ marginRight: "10px" }} className="iconStyle" />
                WISHLIST
              </button> 
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPdp;
