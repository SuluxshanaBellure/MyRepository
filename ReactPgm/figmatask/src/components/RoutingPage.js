import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AddProduct from "./AddProduct";
import Main from "./Main";
import { PdpPage } from "./PdpPage";
import BooksPage from "./global/BooksPage";
import CoffeeMugsPage from "./global/CoffeeMugsPage";
import MousePadsPage from "./global/MousePadsPage";
import LugguageTagsPage from "./global/LugguageTagsPage";
import ProductPdp from "./global/ProductPdp";
import CartPage from "./global/CartPage";
import WishlistPage from "./global/WishlistPage";
import PlaceOrderPage from "./global/PlaceOrderPage";
import WishlistPopup from "./global/WishlistPopup";
import CollectionPage from "./global/CollectionPage";
import axios from "axios";
import CollectionPdp from "./global/CollectionPdp";
import PaymentPage from "./global/PaymentPage";

export default function RoutingPage({
  cartItems,
  addToCart,
  addToWishlist,
  wishlistItems,
  setWishlistItems,
  onDeleteCartItem,
  setCartItems,
  onDeleteWishlistItem,
  setShowWishlist,
  onIncrementQuantity,
  onDecrementQuantity,
  setSelectedProduct,
  selectedProduct,
  showPopup,
  setShowPopup,
  collections,
  setCollections,
  clickedCollectionProducts,
  setClickedCollectionProducts,
  selectedShareSetting,
  setSelectedShareSetting,
  setIsEditClicked,
  setSelectedCollectionForEdit,
  showNewCollectionPopup,
  setShowNewCollectionPopup
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

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/product/:id" element={<PdpPage />} />
        <Route
          path="/pdp/:sku"
          element={
            <ProductPdp
              addToCart={addToCart}
              addToWishlist={addToWishlist}
              cartItems={cartItems}
              setCartItems={setCartItems}
              wishlistItems={wishlistItems}
              setSelectedProduct={setSelectedProduct}
              selectedProduct={selectedProduct}
              setShowPopup={setShowPopup}
            />
          }
        />
        <Route
          path="/books"
          element={
            <BooksPage
              showPopup={showPopup}
              setShowPopup={setShowPopup}
              addToCart={addToCart}
              cartItems={cartItems}
              addToWishlist={addToWishlist}
              wishlistItems={wishlistItems}
              setCartItems={setCartItems}
              setWishlistItems={setWishlistItems}
              setSelectedProduct={setSelectedProduct}
              selectedProduct={selectedProduct}
            />
          }
        />
        <Route
          path="/coffeemugs"
          element={
            <CoffeeMugsPage
              showPopup={showPopup}
              setShowPopup={setShowPopup}
              addToCart={addToCart}
              cartItems={cartItems}
              addToWishlist={addToWishlist}
              wishlistItems={wishlistItems}
              setCartItems={setCartItems}
              setSelectedProduct={setSelectedProduct}
              selectedProduct={selectedProduct}
            />
          }
        />
        <Route
          path="/mousepads"
          element={
            <MousePadsPage
              showPopup={showPopup}
              setShowPopup={setShowPopup}
              addToCart={addToCart}
              cartItems={cartItems}
              addToWishlist={addToWishlist}
              wishlistItems={wishlistItems}
              setCartItems={setCartItems}
              setSelectedProduct={setSelectedProduct}
              selectedProduct={selectedProduct}
            />
          }
        />
        <Route
          path="/lugguagetags"
          element={
            <LugguageTagsPage
              showPopup={showPopup}
              setShowPopup={setShowPopup}
              addToCart={addToCart}
              cartItems={cartItems}
              addToWishlist={addToWishlist}
              wishlistItems={wishlistItems}
              setCartItems={setCartItems}
              setSelectedProduct={setSelectedProduct}
              selectedProduct={selectedProduct}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage
              show={false}
              cartItems={cartItems}
              onDeleteCartItem={onDeleteCartItem}
              setCartItems={setCartItems}
              onIncrementQuantity={onIncrementQuantity}
              onDecrementQuantity={onDecrementQuantity}
              addToWishlist={addToWishlist}
              wishlistItems={wishlistItems}
              setShowWishlist={setShowWishlist}
              setSelectedProduct={setSelectedProduct}
              setShowPopup={setShowPopup}
            />
          }
        />
        {/* <Route
          path="/wishlist"
          element={
            <WishlistPage
              wishlistItems={wishlistItems}
              onDeleteWishlistItem={onDeleteWishlistItem}
              setShowWishlist={setShowWishlist}
              onIncrementQuantity={onIncrementQuantity}
              onDecrementQuantity={onDecrementQuantity}
              addToWishlist={addToWishlist}
            />
          }
        /> */}

        <Route path="/checkout" element={<PlaceOrderPage />} />

        <Route
          path="/collection"
          element={
            <CollectionPage
              collections={collections}
              cartItems={cartItems}
              setCartItems={setCartItems}
              selectedProduct={selectedProduct}
              clickedCollectionProducts={clickedCollectionProducts}
              setClickedCollectionProducts={setClickedCollectionProducts}
              selectedShareSetting={selectedShareSetting}
            />
          }
        />
{console.log("selectedShareSetting in CollectionPage:", selectedShareSetting)}

        <Route
          path="/collectionPdp"
          element={
            <CollectionPdp
              clickedCollectionProducts={clickedCollectionProducts}
              setClickedCollectionProducts={setClickedCollectionProducts}
              cartItems={cartItems}
              setCartItems={setCartItems}
              selectedProduct={selectedProduct}
              collections={collections}
              setCollections={setCollections}
              selectedShareSetting={selectedShareSetting}
              setSelectedShareSetting={setSelectedShareSetting}
              setIsEditClicked={setIsEditClicked}
              setSelectedCollectionForEdit={setSelectedCollectionForEdit}
              setShowPopup={setShowPopup}
              showNewCollectionPopup={showNewCollectionPopup}
              setShowNewCollectionPopup={setShowNewCollectionPopup}
              />
          }
        />

        {/* <Route
          path="/collection"
          element={<CollectionPage collections={collections} cartItems={cartItems}
          setCartItems={setCartItems} selectedProduct={selectedProduct}
          clickedCollectionProducts={clickedCollectionProducts} setClickedCollectionProducts={setClickedCollectionProducts}
          />}
        />   
         */}

<Route path="/payment" element={<PaymentPage />} />

      </Routes>
      {showNewCollectionPopup && (
  <CollectionPdp setShowNewCollectionPopup={setShowNewCollectionPopup} />
)}

    </>
  );
}
