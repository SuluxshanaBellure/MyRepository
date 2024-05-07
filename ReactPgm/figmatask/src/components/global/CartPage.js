import React, { useEffect, useState } from "react";
import "./cartpage.css";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import axios from "axios";

const CartPage = ({
  cartItems,
  setCartItems,
  onIncrementQuantity,
  onDecrementQuantity,
  onDeleteCartItem,
  addToWishlist,
  setShowWishlist,
  wishlistItems,
  setSelectedProduct,
  setShowPopup,
}) => {
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

  const handleAddToWishlist = (item) => {
    setSelectedProduct(item);
    setShowPopup(true);
  };

  const calculateQuantities = () => {
    return cartItems.map((item) => item.quantity);
  };

  const [quantities, setQuantities] = React.useState(calculateQuantities());
  const [totalPrice, setTotalPrice] = React.useState(0);

  React.useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
      if (
        cartItems &&
        cartItems.length > 0 &&
        quantities &&
        quantities.length === cartItems.length
      ) {
        cartItems.forEach((item, index) => {
          total += item.unit_price * quantities[index];
        });
      }
      return total;
    };

    setTotalPrice(calculateTotalPrice());
  }, [quantities, cartItems]);

  React.useEffect(() => {
    setQuantities(calculateQuantities());
  }, [cartItems]);

  return (
    <div
      style={{
        margin: "0px 169px",
        position: "relative",
        paddingTop: "130px",
        minHeight: "600px",
      }}
      className="row"
    >
      {cartItems.length === 0 ? (
        <div className="column1" style={{ width: "100%" }}>
          <div
            style={{
              borderTop: "1px solid #f0f0f0",
              background: "#fff",
              padding: "16px 22px",
              boxShadow: "0 -2px 10px 0 rgba(0,0,0,.1)",
              marginBottom: "20px",
            }}
          >
            <p>No products in the cart</p>
          </div>
        </div>
      ) : (
        <>
          <div
            className="column1"
            style={{
              borderTop: "1px solid #f0f0f0",
              background: "#fff",
              padding: "16px 22px",
              boxShadow: "0 -2px 10px 0 rgba(0,0,0,.1)",
              width: "68%",
              overflowY: "auto",
              minHeight: "600px",
            }}
          >
            {cartItems.map((item, index) => (
              <div key={item.sku} style={{ marginBottom: "20px" }}>
                <li style={{ listStyleType: "none" }}>
                  <div>
                    <div className="imageStyle">
                      <img
                        style={{ height: "160px", width: "190px" }}
                        src={
                          item.category_id === 1
                            ? bookImages[item.image_url]
                            : item.category_id === 2
                            ? mugImages[item.image_url]
                            : item.category_id === 3
                            ? mouseImages[item.image_url]
                            : item.category_id === 4
                            ? luggageImages[item.image_url]
                            : null
                        }
                        alt={item.name}
                      />
                    </div>
                    <div className="detailsStyle">
                      <h3 className="nameStyle">{item.name}</h3>
                      <p
                        className="priceStyle"
                        style={{ paddingLeft: "168px" }}
                      >
                        {" "}
                        ₹{item.unit_price}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "-16px",
                        marginLeft: "47px",
                      }}
                    >
                      <button
                        className="decrementButton"
                        onClick={() => onDecrementQuantity(item.sku)}
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>

                      <span className="countButton">{item.quantity}</span>

                      <button
                        className="incrementButton"
                        onClick={() => onIncrementQuantity(item.sku)}
                        disabled={item.quantity >= item.units_in_stock}
                      >
                        +
                      </button>

                      <p
                        className="saveStyle"
                        style={{ marginLeft: "51px" }}
                        onClick={() => handleAddToWishlist(item)}
                      >
                        SAVE FOR LATER
                      </p>

                      <p
                        onClick={() => onDeleteCartItem(index)}
                        className="removeStyle"
                        style={{ marginLeft: "205px" }}
                      >
                        REMOVE
                      </p>
                    </div>
                  </div>
                </li>
                <hr></hr>
              </div>
            ))}
          </div>

          <div
            className="column2"
            style={{
              width: "28%",
              borderTop: "1px solid #f0f0f0",
              background: "#fff",
              // padding: "16px 22px",
              boxShadow: "0 -2px 10px 0 rgba(0,0,0,.1)",
              marginBottom: "20px",
              paddingLeft: "192px",
              whiteSpace: "nowrap",
              // overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <div className="cart-summary">
              <p className="price-heading">PRODUCT DETAILS</p>
              <hr />
              <div className="price-details">
                <p>
                  {" "}
                  Price ({cartItems.length}{" "}
                  {cartItems.length === 1 ? "item" : "items"}) &nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp; ₹
                  {totalPrice.toFixed(2)}
                </p>
              </div>
              <div className="delivery-details">
  <p style={{ marginRight: "10px" }}>Delivery charges</p>
  <p style={{ color: "green" }}>Free</p>
</div>
              <hr />
              <div className="total-amount">
                <p>Total Amount</p>
                <p>₹{totalPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </>
      )}
      <Link to="/checkout">
        <button className="placeOrderButton">PLACE ORDER</button>
      </Link>
    </div>
  );
};

export default CartPage;
