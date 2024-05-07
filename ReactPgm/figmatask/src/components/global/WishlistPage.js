import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./WishlistPage.css";
import { Link } from "react-router-dom";

export default function WishlistPage({ wishlistItems, onDeleteWishlistItem }) {

  const name="xyz";

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

  const handleDeleteItem = (index) => {
    onDeleteWishlistItem(index);
  };

  const uniqueWishlistItems = wishlistItems.filter((item, index, self) =>
  item.sku && index === self.findIndex((t) => t.sku === item.sku)
);

   const collectionName = "My Wishlist";

  return (
    <div className="row" style={{ margin: "0px 300px", paddingTop: "125px", paddingBottom: "60px" }}>
      <div
        className="column1"
        style={{
          borderTop: "1px solid #f0f0f0",
          background: "#fff",
          boxShadow: "0 -2px 10px 0 rgba(0,0,0,.1)",
          paddingTop: "15px",
        }}
      >
        <p>{collectionName}({uniqueWishlistItems.length})</p>
        <hr />
        {uniqueWishlistItems.length === 0 ? (
          <p>No products in the wishlist</p>
        ) : (
          uniqueWishlistItems.map((item, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <li style={{ listStyleType: "none" }}>
                <div>
                  <div className="imageStyle">
                    {item.category_id && (
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
                    )}
                  </div>
                  <div className="detailsStyle">
                    <h3 className="nameStyle">
                      <Link
                        to={
                          item.category_id &&
                          (item.category_id === 1
                            ? "/books"
                            : item.category_id === 2
                            ? "/coffeemugs"
                            : item.category_id === 3
                            ? "/mousepads"
                            : item.category_id === 4
                            ? "/lugguagetags"
                            : "")
                        }
                      >
                        {item.name}
                      </Link>
                    </h3>
                    <p className="priceStyle"> ₹{item.unit_price}</p>
                  </div>
                  <div className="deleteButtonContainer">
                    <button
                      className="deleteButton"
                      onClick={() => handleDeleteItem(index)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </li>
              <hr />
            </div>
          ))
        )}
      </div>
    </div>
    
  );
}
