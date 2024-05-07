import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactImageMagnify from "react-image-magnify";
import { Link } from "react-router-dom";
import DarkModeContext from "./global/DarkModeContext ";

export const PdpPage = () => {
  const { isDarkMode } = useContext(DarkModeContext); 

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFrontImage, setSelectedFrontImage] = useState("");
  const [selectedBackImage, setSelectedBackImage] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  // const [view, setView] = useState("");

  const handlePriceHover = (color) => {
    setSelectedImage(color.image_url);
  };

  const handlePriceClick = (color) => {
    setSelectedFrontImage(color.front_image);
    setSelectedBackImage(color.back_image);
    setSelectedColor(color);
  };

  const handleFrontImageHover = () => {
    if (selectedColor) {
      setSelectedImage(selectedColor.front_image);
    }
  };

  const handleBackImageHover = () => {
    if (selectedColor) {
      setSelectedImage(selectedColor.back_image);
    }
  };

  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8081/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        if (response.data.colors && response.data.colors.length > 0) {
          const initialColor = response.data.colors[0];
          setSelectedImage(initialColor.image_url);
          setSelectedFrontImage(initialColor.front_image);
          setSelectedBackImage(initialColor.back_image);
        }
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  return (
    <div
    style={{ backgroundColor: isDarkMode ? "#E8E8E8" : "#fff" ,paddingTop: "100px",
   margin: "0 169px", }}
    >
      <Link to="/add">
        <button className="btn btn-danger">Back</button>
      </Link>

      {product ? (
        <div className="row">
          <div className="col-sm-4">
            {selectedImage && (
              <div>
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: "Wristwatch by Ted Baker London",
                      isFluidWidth: true,
                      src: selectedImage,
                    },
                    largeImage: {
                      src: selectedImage,
                      width: 1000,
                      height: 1000,
                    },
                    style: { zIndex: 9999 },
                  }}
                />
              </div>
            )}
            {selectedFrontImage && selectedBackImage && (
              <div style={{ marginTop: "20px", textAlign: "center" }}>
                <p>Roll over the images to zoom in</p>
                <div>
                  <div
                    style={{ display: "inline-block", marginRight: "10px" }}
                    onMouseEnter={() =>
                      handleFrontImageHover(product.colors[0])
                    }
                  >
                    <img
                      src={selectedFrontImage}
                      alt={product.name}
                      style={{ height: "50px", width: "50px" }}
                    />
                    {/* <p>Front Image</p> */}
                  </div>
                  <div
                    style={{ display: "inline-block" }}
                    onMouseEnter={() => handleBackImageHover(product.colors[0])}
                  >
                    <img
                      src={selectedBackImage}
                      alt={product.name}
                      style={{ height: "50px", width: "50px" }}
                    />
                    {/* <p>Back Image</p> */}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div style={{ textAlign: "center" }} className="col-sm-5">
            <div>
              <h4 style={{ textAlign: "left" }}>{product.name}</h4>
              <hr />
            </div>

            <p>Colors:</p>
            <div>
              {product.colors &&
                product.colors.map((color, index) => (
                  <button
                    key={index}
                    style={{
                      height: "60px",
                      width: "140px",
                      border: `1px solid ${
                        hoveredIndex === index ? "red" : "#e0e0d1"
                      }`,
                      backgroundColor: "white",
                      marginRight: "5px",
                    }}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => handlePriceClick(color)}
                  >
                    <p
                      style={{
                        fontSize: "14px",
                        textAlign: "right",
                        paddingTop: "13px",
                      }}
                      onMouseEnter={() => handlePriceHover(color)}
                    >
                      <img
                        src={color.image_url}
                        alt={color.name}
                        style={{ height: "40px", width: "40px" }}
                      />
                      &#8377;{product.price}.00
                    </p>
                  </button>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <br />
    </div>
  );
};
