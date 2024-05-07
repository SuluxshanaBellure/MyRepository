import React, { useState } from "react";
import { useProductContext } from "./ProductProvider";
import "./productinput.css";
const ProductInput = () => {

    const buttonStyle={
      borderRadius:"25px",
      width:"200px",
      backgroundColor:"#85c9b0",
    };
    
  const { products, addProduct } = useProductContext();

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");

  const handleAddProduct = (e) => {
    e.preventDefault();

    if (!productName || !productPrice || !productImage) {
        alert('Please fill in all fields'); 
        
      }
    const newProduct = {
      name: productName,
      price: parseFloat(productPrice),
      imageUrl: productImage,
    };

    addProduct(newProduct);

    //resets the form
    setProductName("");
    setProductPrice("");
    setProductImage("");
  };

  return (
    <div className="product-container">
      <div className="product-input-container">
        <h2>Add Product</h2>
        <form className="product-form" onSubmit={handleAddProduct}>
          <div className="form-group">
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="productPrice">Product Price:</label>
            <input
              type="number"
              id="productPrice"
              name="productPrice"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="productImage">Product Image URL:</label>
            <input
              type="text"
              id="productImage"
              name="productImage"
              value={productImage}
              onChange={(e) => setProductImage(e.target.value)}
            />
          </div>
          <button type="submit">Add Product</button>
        </form>
      </div>
      <div className="product-list-container">
        <h2>Product List</h2>
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-item">
              <img src={product.imageUrl} alt={product.name} />
              <div className="product-details">
                <h3>{product.name}</h3>
                <p>${product.price}</p>
                <button style={buttonStyle}>Add to cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductInput;
