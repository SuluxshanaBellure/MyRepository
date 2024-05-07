import React, { createContext, useContext, useState } from "react";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 19.99,
      imageUrl:
        "https://m.media-amazon.com/images/I/41++Qfm7QbL._SY300_SX300_.jpg",
    },
    {
      id: 2,
      name: "Product 2",
      price: 29.99,
      imageUrl:
        "https://m.media-amazon.com/images/I/41VN06uN2cL._SX300_SY300_QL70_FMwebp_.jpg",
    },
  ]);

  const addProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: products.length + 1 }]);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);

export default ProductProvider;
