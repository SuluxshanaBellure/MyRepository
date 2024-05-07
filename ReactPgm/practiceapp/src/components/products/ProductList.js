import React from "react";
import ProductInput from "./ProductInput";
import ProductProvider from "./ProductProvider";
const ProductList = () => {
  return (
    <ProductProvider>
      <ProductInput />
    </ProductProvider>
  );
};

export default ProductList;
