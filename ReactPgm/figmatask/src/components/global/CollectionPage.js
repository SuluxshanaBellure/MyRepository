import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CollectionPdp from "./CollectionPdp";
import { Route, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CollectionPage({
  collections,
  setCollections,
  cartItems,
  selectedProduct,
  clickedCollectionProducts,
  setClickedCollectionProducts,
  selectedShareSetting,
}) {
  useEffect(() => {
    fetchCollections();
  }, []);


  const fetchCollections = async () => {
    try {
      const response = await axios.get("http://localhost:8081/collections");
      setCollections(response.data);
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };
  console.log("selectedShareSetting : ", selectedShareSetting);
  const navigate = useNavigate();

  // Manage local state for controlling the display of additional items in the carousel
  const [showAllItems, setShowAllItems] = useState({});

  // Reset the showAllItems state when the component re-renders
  useEffect(() => {
    setShowAllItems({});
  }, [collections]);

  // Dynamic import of images
  const importAll = (r) => {
    let images = {};
    r.keys().forEach((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  };

  // Importing images based on category
  const getCategoryImageImports = () => {
    return {
      1: importAll(
        require.context(
          "../../assets/images/products/books",
          false,
          /\.(png|jpe?g|svg)$/
        )
      ),
      2: importAll(
        require.context(
          "../../assets/images/products/coffeemugs",
          false,
          /\.(png|jpe?g|svg)$/
        )
      ),
      3: importAll(
        require.context(
          "../../assets/images/products/mousepads",
          false,
          /\.(png|jpe?g|svg)$/
        )
      ),
      4: importAll(
        require.context(
          "../../assets/images/products/luggagetags",
          false,
          /\.(png|jpe?g|svg)$/
        )
      ),
    };
  };

  const categoryImageImports = getCategoryImageImports();

  // Getting the right image path based on category
  const getProductImage = (selectedProduct, category_id) => {
    const categoryImages = categoryImageImports && categoryImageImports[category_id];
    if (categoryImages) {
      return categoryImages[selectedProduct.image_url];
    } else {
      console.error("Invalid category ID:", category_id);
      return null;
    }
  };

  const vl = {
    margin: "0 13px",
    borderLeft: "3px solid grey",
    height: "23px",
    paddingTop: "7px",
  };

  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    draggable: false,
    prevArrow: <></>,
    nextArrow: <></>,
  };


  return (
    <div style={{ paddingTop: "150px" }}>
      <h3
        style={{ marginLeft: "201px", marginBottom: "28px", color: "#666666" }}
      >
        Collections
      </h3>
      {collections.length === 0 ? (
        <div>No collections available.</div>
      ) : (
        collections.map((collection, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #DCDCDC",
              marginLeft: "200px",
              marginRight: "200px",
              marginBottom: "50px",
              boxShadow: "5px 5px 5px  5px #D0D0D0",
            }}
          >
            {collection.products.length === 1 ? (
              <div
                style={{
                  margin: "20px",
                  textAlign: "center",
                }}
              >
                <img
                  src={getProductImage(
                    collection.products[0],
                    collection.products[0].category_id
                  )}
                  alt={collection.products[0].name}
                  style={{
                    maxWidth: "200px",
                    maxHeight: "200px",
                    marginBottom: "10px",
                  }}
                />
              </div>
            ) : (
              <Slider {...settings}>
                {showAllItems[index] ? (
                  <div style={{ display: "flex" }}>
                    {collection.products.map((product, idx) => (
                      <div
                        key={idx}
                        style={{
                          margin: "20px",
                          textAlign: "center",
                          width: "200px",
                        }}
                      >
                        <img
                          src={getProductImage(product, product.category_id)}
                          alt={product.name}
                          style={{
                            maxWidth: "180px",
                            maxHeight: "180px",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  collection.products.slice(0, 3).map((product, idx) => (
                    <div
                      key={idx}
                      style={{
                        margin: "20px",
                        textAlign: "center",
                      }}
                    >
                      <img
                        src={getProductImage(product, product.category_id)}
                        alt={product.name}
                        style={{
                          maxWidth: "200px",
                          maxHeight: "200px",
                          marginBottom: "10px",
                        }}
                      />
                    </div>
                  ))
                )}
                {/* Display "+X more items" instead of the fourth item */}
                {collection.products.length > 3 && !showAllItems[index] && (
                  <div
                    className="plusTwoMore"
                    key="more-items"
                    style={{
                      textAlign: "center",
                      border: "1px solid #808080",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setShowAllItems({ ...showAllItems, [index]: true });
                      setClickedCollectionProducts(collection.products);
                      navigate("/collectionPdp", {
                        state: {
                          collectionName: collection.name,
                          collection: collection,
                        },
                      });
                    }}
                  >
                    +{collection.products.length - 3} more items
                  </div>
                )}
              </Slider>
            )}
            <p style={{ paddingLeft: "209px", paddingTop: "10px" }}>
              {collection.name}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                marginLeft: "10px",
              }}
            >
              <p style={{ marginRight: "10px" }}>{collection.share_settings}</p>
              <div style={vl}></div>
              <p style={{ marginLeft: "114px", marginRight: "10px" }}>
                Items: {collection.products.length}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
