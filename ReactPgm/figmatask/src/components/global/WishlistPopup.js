import React, { useState, useEffect } from "react";
import axios from "axios";
import "./wishlistPopup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faLock,
  faEarthAmericas,
  faUserGroup,
  faPeopleGroup,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import CollectionPage from "./CollectionPage";

export default function WishlistPopup({
  showPopup,
  setShowPopup,
  collections,
  setCollections,
  selectedProduct,
  selectedShareSetting,
  setSelectedShareSetting,
  selectedCollectionForEdit,
  showNewCollectionPopup,
  setShowNewCollectionPopup,
  
}) {
  const [isChecked, setIsChecked] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("");

  const [selectedProductImage, setSelectedProductImage] = useState("");

  useEffect(() => {
    if (selectedProduct) {
      setSelectedProductImage(selectedProduct.image_url);
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (selectedCollectionForEdit) {
      // Prefill the form with the selected collection data
      setCollectionName(selectedCollectionForEdit.name);
    }
  }, [selectedCollectionForEdit]);

  
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
    const categoryImages = categoryImageImports[category_id];
    if (categoryImages) {
      return categoryImages[selectedProduct.image_url];
    } else {
      console.error("Invalid category ID:", category_id);
      return null;
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleCheckboxChange = (collectionName) => {
    setSelectedCollection(collectionName);
  };

  const handleCreateNewCollection = () => {
    setShowNewCollectionPopup(true);
  };

  const handleCloseNewCollectionPopup = () => {
    setShowNewCollectionPopup(false);
  };

  const handleCreateCollection = async () => {
    if (!collectionName.trim()) {
      alert("Please enter a valid collection name.");
      return;
    }

    if (!selectedShareSetting) {
      alert("Please select a share setting for the collection.");
      return;
    }

    try {
      await axios.post("http://localhost:8081/collection", {
        collectionName: collectionName,
        shareSetting: selectedShareSetting, 
      });

      // Add the selected product to the new collection
      await addToCollection(collectionName, selectedProduct.category_id);

      // Fetch collections again to update the UI
      fetchCollections();

      setShowPopup(true);
      // Close the new collection popup
      setShowNewCollectionPopup(false);

      // Show success message
      alert("Collection created successfully and product saved!");
    } catch (error) {
      console.error("Error creating collection:", error);
      alert("Error creating collection. Please try again later.");
    }
  };

  // console.log("selected product details 71 line: ",selectedProduct);

  const addToCollection = async (collectionName, categoryId) => {
    // console.log("selected product detailswwwwwwwwww 74 line : ",selectedProduct.name);

    try {
      // Add the selected product to the collection
      const response = await axios.post(
        "http://localhost:8081/add-to-collection",
        {
          collectionName: collectionName,
          productSku: selectedProduct.sku,
          productName: selectedProduct.name,
          productImage: selectedProduct.image_url,
          productPrice: selectedProduct.unit_price,
          category: categoryId, // Pass the category ID here
        }
      );
      // console.log("selected product detailswwwwwwwwww : ",selectedProduct);
      console.log(response.data); // Log the response for debugging
    } catch (error) {
      console.error("Error adding product to collection:", error);
      throw error; // Rethrow the error for handling in the caller function
    }
  };

  console.log(" selected product catgeory id : ", selectedProduct.category_id);

  const handleSave = async () => {
    try {
      // Check if the user wants to save to "My Wishlist" or a specific collection
      let saveToCollection = selectedCollection;
      // If "My Wishlist" checkbox is checked, save to "My Wishlist" collection
      if (isChecked) {
        saveToCollection = "My Wishlist";
      } else if (!saveToCollection && collectionName) {
        // If a new collection name is provided, save to that collection
        saveToCollection = collectionName;
      } else if (!saveToCollection) {
        // If no collection is selected and no new collection name is provided, show an alert
        alert("Please select a collection or enter a new collection name.");
        return;
      }

      // Call the addToCollection function to save the product to the selected collection
      await addToCollection(saveToCollection, selectedProduct.category_id);

      // Fetch collections again to update the UI
      fetchCollections();

      // Show success message
      alert("Product saved to collection successfully!");

      // Close the popup
      setShowPopup(false);
    } catch (error) {
      console.error("Error saving product to collection:", error);
      alert("Error saving product to collection. Please try again later.");
    }
  };

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

  const radioStyle = {
    marginLeft: "auto",
  };

  const shareSettingIcons = {
    private: faLock,
    shared: faUserGroup,
    public: faEarthAmericas,
  };

  const handleShareSettingChange = (e) => {
    setSelectedShareSetting(e.target.value);
  };

  console.log("selectedShareSetting : ", selectedShareSetting);

  const [editedCollection, setEditedCollection] = useState(null);

useEffect(() => {
  if (selectedCollectionForEdit) {
    // Prefill the form with the selected collection data
    setEditedCollection(selectedCollectionForEdit);
  }
}, [selectedCollectionForEdit]);

// Function to handle editing of collection data
const handleEditCollectionData = (e) => {
  setEditedCollection({
    ...editedCollection,
    [e.target.name]: e.target.value,
  });
};

// Function to save the edited collection data
const handleSaveEditedCollection = async () => {
  try {
    // Send a request to update the collection data
    await axios.put(`http://localhost:8081/collections/${editedCollection.id}`, {
      name: editedCollection.name,
      share_settings: editedCollection.share_settings,
      // Add other fields as needed
    });

    // Show success message
    alert("Collection data updated successfully!");

    // Fetch collections again to update the UI
    fetchCollections();

    // Close the popup
    setShowPopup(false);
  } catch (error) {
    console.error("Error updating collection data:", error);
    alert("Error updating collection data. Please try again later.");
  }
};

  return (
    <>
      {showPopup && (
        <div className="wishlistPopup">
          <div className="popupContent">
            <div>
              <button className="closeButton" onClick={handleClosePopup}>
                X
              </button>
              <p
                style={{
                  paddingLeft: "40px",
                  paddingTop: "6px",
                  fontFamily: "monaco,Consolas,Lucida Console,monospace",
                }}
              >
                Save item to ...
              </p>
              <hr />
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "20px",
                justifyContent: "space-around",
              }}
            >
              <p
                className="newCollectionButton"
                onClick={handleCreateNewCollection}
              >
                +
              </p>
              <p>Create a new collection</p>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "20px",
                justifyContent: "space-around",
              }}
            >
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: " #ffcccc",
                }}
              >
                <FontAwesomeIcon icon={faHeart} style={{ color: "red" }} />
              </div>
              {/* <p>My Wishlist</p>
              <input
                type="checkbox"
                id="mywishlist"
                name="mywishlist"
                value="mywishlist"
                onChange={handleCheckboxChange}
              /> */}
            </div>

            <div>
              <ul>
                {collections.map((collection) => (
                  <li style={{ listStyleType: "none", paddingLeft: "80px" }}>
                    {collection.name}
                    <input
                      type="checkbox"
                      id={collection.name}
                      name={collection.name}
                      value={collection.name}
                      onChange={() => handleCheckboxChange(collection.name)}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <button className="saveButton" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      )}

      {showNewCollectionPopup && (
        <div className="newCollectionPopup">
          <div
            className="newpopupContent"
            style={{ justifyContent: "space-evenly" }}
          >
            <div>
              <button
                className="closeButton"
                onClick={handleCloseNewCollectionPopup}
              >
                X
              </button>
              <p style={{ paddingTop: "5px" }}>Create New Collection</p>
              {selectedProductImage && (
                <img
                  src={getProductImage(
                    selectedProduct,
                    selectedProduct.category_id
                  )}
                  alt={selectedProduct.name}
                  style={{
                    maxWidth: "180px",
                    maxHeight: "180px",
                  }}
                />
              )}
              <div>
                <input
                  type="text"
                  placeholder="Collection Name"
                  required
                  value={collectionName}
                  onChange={(e) => setCollectionName(e.target.value)}
                />
              </div>
              <p style={{paddingLeft: "166px"}}>Share settings</p>
              <ul>
                <li
                  style={{
                    listStyleType: "none",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FontAwesomeIcon icon={shareSettingIcons.private} />
                  <div style={{ paddingLeft: "15px" }}>
                    <h6>Private</h6>
                    <p style={{paddingLeft: "166px"}}>Only you can view</p>
                  </div>
                  <input
                    style={radioStyle}
                    type="radio"
                    value="private"
                    checked={selectedShareSetting === "private"}
                    onChange={handleShareSettingChange}
                  />
                </li>
                <li
                  style={{
                    listStyleType: "none",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FontAwesomeIcon icon={shareSettingIcons.shared} />
                  <div style={{ paddingLeft: "15px" }}>
                    <h6>Shared</h6>
                    <p style={{paddingLeft: "166px"}}>Only people with link can view</p>
                  </div>
                  <input
                    style={radioStyle}
                    type="radio"
                    value="shared"
                    checked={selectedShareSetting === "shared"}
                    onChange={handleShareSettingChange}
                  />
                </li>
                <li
                  style={{
                    listStyleType: "none",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FontAwesomeIcon icon={shareSettingIcons.public} />
                  <div style={{ paddingLeft: "15px" }}>
                    <h6>Public</h6>
                    <p style={{paddingLeft: "166px"}}>Anyone can search for and view</p>
                  </div>
                  <input
                    style={radioStyle}
                    type="radio"
                    value="public"
                    checked={selectedShareSetting === "public"}
                    onChange={handleShareSettingChange}
                  />
                </li>
              </ul>

              <button onClick={handleCreateCollection}>
                Create collection
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
