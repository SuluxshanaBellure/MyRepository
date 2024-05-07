import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RoutingPage from "./components/RoutingPage.js";
import Header from "./components/global/Header.js";
import DarkModeContext from "./components/global/DarkModeContext .js";
import TopHeader from "./components/global/TopHeader.js";
import WishlistPopup from "./components/global/WishlistPopup.js";
import "./App.css";
import ProductPdp from "./components/global/ProductPdp.js";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [showPopup, setShowPopup] = useState(false); 
  const [collections, setCollections] = useState([]);
  const [clickedCollectionProducts, setClickedCollectionProducts] = useState([]);
  const [selectedShareSetting, setSelectedShareSetting] = useState("");
  const [isEditClicked, setIsEditClicked] = useState(false); 
  const [selectedCollectionForEdit, setSelectedCollectionForEdit] = useState(
    null
  ); 
  const [showNewCollectionPopup, setShowNewCollectionPopup] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleCartPopup = () => {
    setShowCart(!showCart);
  };

  const addToCart = (item) => {
    setCartItems((prevCartItems) => [...prevCartItems, item]);
  };

  const addToWishlist = (item) => {
    setWishlistItems([...wishlistItems, item]);
  };

  const onDeleteCartItem = (index) => {
    const updatedCartItems = cartItems.filter((item, i) => i !== index);
    setCartItems(updatedCartItems);
  };

  const onDeleteWishlistItem = (index) => {
    const updatedWishlistItems = wishlistItems.filter((item, i) => i !== index);
    setWishlistItems(updatedWishlistItems);
  };

  const handleIncrementQuantity = (items, setItems, sku) => {
    const updatedItems = items.map((item) => {
      if (item.sku === sku) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleDecrementQuantity = (items, setItems, sku) => {
    const updatedItems = items.map((item) => {
      if (item.sku === sku && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setItems(updatedItems);
  };

  useEffect(() => {
    // Load cart items from localStorage on component mount
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    // Save cart items to localStorage whenever they change
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

const handleShareSettingChange = (e) => {
  setSelectedShareSetting(e.target.value);
};

  return (
<DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }} >
      <Router>
        <TopHeader />
        <Header
          cartItems={cartItems}
          toggleCartPopup={toggleCartPopup}
          wishlistItems={wishlistItems}
        />
        <RoutingPage
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          collections={collections}
          setCollections={setCollections}
          addToCart={addToCart}
          cartItems={cartItems}
          addToWishlist={addToWishlist}
          wishlistItems={wishlistItems}
          setWishlistItems={setWishlistItems}
          onDeleteCartItem={onDeleteCartItem}
          setCartItems={setCartItems}
          onDeleteWishlistItem={onDeleteWishlistItem}
          setShowWishlist={setShowWishlist}
          onIncrementQuantity={(sku) =>
            handleIncrementQuantity(cartItems, setCartItems, sku)
          }
          onDecrementQuantity={(sku) =>
            handleDecrementQuantity(cartItems, setCartItems, sku)
          }
          setSelectedProduct={setSelectedProduct}
          selectedProduct={selectedProduct}
          clickedCollectionProducts={clickedCollectionProducts}
          setIsEditClicked={setIsEditClicked}
          setClickedCollectionProducts={setClickedCollectionProducts}
          setSelectedShareSetting={setSelectedShareSetting}
          setSelectedCollectionForEdit={setSelectedCollectionForEdit}
          showNewCollectionPopup={showNewCollectionPopup}
          setShowNewCollectionPopup={setShowNewCollectionPopup}

        />
      </Router>
      
      {/* Conditionally render WishlistPopup based on showPopup state */}
      {showPopup && (
        <WishlistPopup
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          collections={collections}
          setCollections={setCollections}
          addToWishlist={addToWishlist}
          wishlistItems={wishlistItems}
          selectedProduct={selectedProduct}
          setWishlistItems={setWishlistItems}
          selectedShareSetting={selectedShareSetting}
          setSelectedShareSetting={setSelectedShareSetting}
          isEditClicked={isEditClicked} 
        selectedCollectionForEdit={selectedCollectionForEdit}
        showNewCollectionPopup={showNewCollectionPopup}
        setShowNewCollectionPopup={setShowNewCollectionPopup}
        />
      )}

    </DarkModeContext.Provider>
  );
}

export default App;
