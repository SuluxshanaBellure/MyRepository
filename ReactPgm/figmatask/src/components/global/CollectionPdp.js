import React, { useEffect, useState } from "react";
import "./collectionpdp.css";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faEllipsisV,
  faShare,
  faPenToSquare,
  faTrash,
  faCheck,
  faLock,
  faUserGroup,
  faEarthAmericas
} from "@fortawesome/free-solid-svg-icons";
import { EmailIcon, EmailShareButton } from "react-share";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactDOMServer from 'react-dom/server';
import emailjs from 'emailjs-com';

export default function CollectionPdp({
  clickedCollectionProducts,
  setClickedCollectionProducts,
  cartItems,
  setCartItems,
  collections,
  setCollections,
  selectedShareSetting,
  selectedProduct,
  setSelectedShareSetting,
  collection,
  faTrashCan,
  setIsEditClicked,
  selectedCollectionForEdit,
  setSelectedCollectionForEdit,
  showNewCollectionPopup,
  setShowNewCollectionPopup,
}) {
  
  const location = useLocation();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isTrashIconVisible, setIsTrashIconVisible] = useState(false);
  const [collectionDeleted, setCollectionDeleted] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [isPopupClosed, setIsPopupClosed] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [isRemoveFromCollectionVisible, setIsRemoveFromCollectionVisible] =
    useState(false);
  const [isRemoveFromCollectionClosed, setIsRemoveFromCollectionClosed] =
    useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [shortUrl, setShortUrl] = useState("");
  const [shareSettings, setShareSettings] = useState(""); 
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editedCollection, setEditedCollection] = useState(null);
  const [collectionDetails, setCollectionDetails] = useState(null); 
  const [editedCollectionName, setEditedCollectionName] = useState("");
  const [editedShareSettings, setEditedShareSettings] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");

  console.log("Collection:", collections);

  useEffect(() => {
    // Fetch collection data when the component mounts
    fetchCollectionData();
  }, []);

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
    const categoryImages = categoryImageImports[category_id];
    if (categoryImages) {
      return categoryImages[selectedProduct.image_url];
    } else {
      console.error("Invalid category ID:", category_id);
      return null;
    }
  };

  const handleAddToCart = (item) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.sku === item.sku
    );
    if (existingItemIndex === -1) {
      setCartItems((prevCartItems) => [
        ...prevCartItems,
        { ...item, quantity: 1 },
      ]);
      alert("Product added to cart!");
    } else {
      const updatedCartItems = cartItems.map((cartItem, index) => {
        if (index === existingItemIndex) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });
      setCartItems(updatedCartItems);
      alert("Product already exists, quantity updated!");
    }
  };

  const handleDeleteCollection = async () => {
    try {
      // Delete the collection
      await axios.delete(
        `http://localhost:8081/collections/${location.state.collectionName}`
      );
      alert("Collection deleted successfully!");

      // Update collections state or data source
      const updatedCollections = collections.filter(
        (col) => col.name !== location.state.collectionName
      );
      // Assuming 'collections' is a state variable
      setCollections(updatedCollections);

      // Set collectionDeleted to true
      setCollectionDeleted(true);
    } catch (error) {
      console.error("Error deleting collection:", error);
      alert("Error deleting collection. Please try again later.");
    }
  };

  const navigate = useNavigate();

  if (collectionDeleted) {
    // If collection has been deleted, display alert and render nothing
    alert(`Collection '${location.state.collectionName}' no longer exists.`);
    // Redirect to another page or perform other actions if needed
    navigate("/collection");
    return null;
  }

  const toggleTrashIcon = () => {
    setIsTrashIconVisible(!isTrashIconVisible);
  };

  const toggleCheckboxes = () => {
    setShowCheckboxes(!showCheckboxes);
    setIsPopupClosed(true);
    setIsTrashIconVisible(false);
  };

  // Function to handle checkbox change
  const handleCheckboxChange = (e, product) => {
    if (e.target.checked) {
      // If the checkbox is checked, add the product to the selected products array
      setSelectedProducts((prevSelectedProducts) => [
        ...prevSelectedProducts,
        product,
      ]);
    } else {
      // If the checkbox is unchecked, remove the product from the selected products array
      setSelectedProducts((prevSelectedProducts) =>
        prevSelectedProducts.filter((p) => p !== product)
      );
    }
  };
  
  const handleRemoveFromCollection = async () => {
    try {
      const productSkus = selectedProducts.map((product) => product.sku);

      // Update the axios request to include the correct data payload
      await axios.delete("http://localhost:8081/remove-from-collection", {
        data: {
          collectionName: location.state.collectionName,
          productSkus: productSkus,
        },
      });

      // Update the count of products in the collection
      const updatedProductCount =
        clickedCollectionProducts.length - productSkus.length;

      // Filter out the removed products from the clickedCollectionProducts array
      const updatedProducts = clickedCollectionProducts.filter(
        (product) => !productSkus.includes(product.sku)
      );

      // Update the state with the filtered array of products
      setClickedCollectionProducts(updatedProducts);

      // Show alert on successful removal
      alert("Product(s) successfully removed from the collection.");

      // Rest of your code...
    } catch (error) {
      console.error("Error removing products from collection:", error);
      alert("Error removing products from collection. Please try again later.");
    }
  };

  const handleToggleRemoveFromCollection = () => {
    setIsRemoveFromCollectionVisible(!isRemoveFromCollectionVisible);
  };

  const handleToggleRemoveFromCollectionClose = () => {
    setIsRemoveFromCollectionClosed(!isRemoveFromCollectionClosed);
  };

  // const handleEditCollection = (collection) => {
  //   setIsEditClicked(true);
  //   setSelectedCollectionForEdit(collection);
  //   setShowNewCollectionPopup(false); 
  // };
    
 
  // const handleShareByEmail = () => {
  //   const subject = encodeURIComponent('Check out this link!');
  //   const body = encodeURIComponent('I thought you might find this interesting. '  + linkString);
  //   const mailtoURL = `mailto:?subject=${subject}&body=${body}`;
  //   window.location.href = mailtoURL;
  // };

 
  const handleCloseEditPopup = () => {
    setIsEditPopupOpen(false);
  };

  
const fetchCollections = async () => {
  try {
    const response = await axios.get("http://localhost:8081/collections");
    setCollections(response.data);
  } catch (error) {
    console.error("Error fetching collections:", error);
  }
};


// // Function to handle editing collection
// const handleEditCollection = (collection) => {
//   setIsEditPopupOpen(true);
//   // Set edited collection details to state variables
  
// };


const radioStyle = {
  marginLeft: "auto",
};

const shareSettingIcons = {
  private: faLock,
  shared: faUserGroup,
  public: faEarthAmericas,
};


const handleEditCollection = (collections) => {
  setIsEditPopupOpen(true);

  // Find the collection to edit by its name
  const collectionToEdit = collections.find(col => col.name === location.state.collectionName);
  
  // Check if the collection is found
  if (collectionToEdit) {
      // Set initial state with existing values
      setEditedCollectionName(collectionToEdit.name); 
      setEditedShareSettings(collectionToEdit.share_settings);
    } else {
      console.error('Collection not found');
  }
};


const handleCollectionNameChange = (e) => {
  setEditedCollectionName(e.target.value);
  // Update the collectionName state
  setCollectionName(e.target.value);};

const handleShareSettingsChange = (e) => {
  setEditedShareSettings(e.target.value);
  setEditedCollectionName(e.target.value);
};

const handleUpdateCollection = async () => {
  try {
    console.log("location.state.collectionName : ",location.state.collectionName);
    console.log("editedCollectionName : ",editedCollectionName);

    // Send a request to your backend API to update the collection details
    const response = await axios.put(`http://localhost:8081/collections/${location.state.collectionName}`, {
      name: editedCollectionName, // Updated collection name
      share_settings: editedShareSettings, // Updated share settings
    });
    
    // Assuming the backend API returns the updated collection details
    const updatedCollection = response.data;
    const updatedShareSettings=response.data;

    // Update the state with the updated collection details
    setEditedCollection(updatedCollection);
    setEditedShareSettings(updatedShareSettings);
    // Update the collectionName state with the edited name
    setCollectionName(editedCollectionName);
    // Close the edit popup
    setIsEditPopupOpen(false);

    // Show success message or perform other actions if needed
    alert("Collection updated successfully!");
  } catch (error) {
    console.error("Error updating collection:", error);
    alert("Error updating collection. Please try again later.");
  }
};

const fetchCollectionData = async () => {
  try {
    // Fetch collection details using the provided collection name
    const response = await axios.get(`http://localhost:8081/collections/${location.state.collectionName}`);
    // Extract collection data from the response
    const collectionData = response.data;
    console.log("sssssssssssssssssssssssss : ",collectionData.share_settings);
    // Set the initial share settings value to state
    setEditedCollectionName(collectionData.name);
    setEditedShareSettings(collectionData.share_settings);
  } catch (error) {
    console.error('Error fetching collection data:', error);
  }
};

const handleSendEmail = async () => {
  try {
    // Make a POST request to your backend endpoint for sending emails
    const response = await axios.post("http://localhost:8081/send-email", {
      recipientEmail, // The recipient's email address
      productDetails: clickedCollectionProducts // The details of the products in the collection
    });
    // Display a success message to the user
    alert(response.data); 
  } catch (error) {
    // Display an error message if there's an error sending the email
    console.error("Error sending email:", error);
    alert("Error sending email. Please try again later.");
  }
};

  return (
    
    <div style={{ paddingTop: "25px", margin: "0 169px" }}>
      <div className="collection-header">
        <div>
          <h5>{location.state.collectionName}</h5>
          <p>{clickedCollectionProducts.length} items</p>
          {/* <p>Share Setting: {selectedShareSetting}</p> */}
        </div>
        {isPopupOpen && !isPopupClosed && (
          <div
            className="popup"
            style={{
              position: "absolute",
              top: "30%",
              right: "725px",
              zIndex: "999",
              border: "1px solid black",
              padding: "10px",
              backgroundColor: "white",
              display: "flex",
              width: "240px",
              paddingTop: "73px",
            }}
          >
           <EmailShareButton
      
      >
        <EmailIcon onClick={handleSendEmail} />
      </EmailShareButton>     
     </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <button
          style={{ border: "1px solid grey", width: "80px" }}
          onClick={() => setIsPopupOpen(!isPopupOpen)}
        >
          <FontAwesomeIcon
            icon={faShare}
            style={{ color: "blue", padding: "5px" }}
          />
          <span style={{ marginLeft: "5px" }}>Share</span>
        </button>

        <button
          style={{
            border: "1px solid grey",
            width: "80px",
            marginLeft: "-785px",
          }}
          onClick={() => handleEditCollection(collections)}
                  >Edit
         {isEditPopupOpen && (
        <div className="newCollectionPopup">
          <div
            className="newpopupContent"
            style={{ justifyContent: "space-evenly" }}
          >
            <div>
            <button
  className="closeButton"
  onClick={handleCloseEditPopup}
  >
  X
</button>

              <p style={{ paddingTop: "5px" }}>Edit Collection</p>
              <div>
                <input
                 value={editedCollectionName}
                 onChange={(e) => handleCollectionNameChange(e)}
                  />
              </div>
              <p style={{}}>Share settings</p>
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
                    <p style={{paddingLeft: "76px"}}>Only you can view</p>
                  </div>
                  <input
                    style={radioStyle}
                    type="radio"
                    checked={editedShareSettings === "private"}
                    onChange={(e) => handleShareSettingsChange}
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
                    checked={editedShareSettings === "shared"}
                    onChange={(e) => handleShareSettingsChange}

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
                    checked={editedShareSettings === "public"}
                    onChange={(e) => handleShareSettingsChange}
                  />
                </li>
              </ul>

              <button onClick={handleUpdateCollection}>
                Update collection
              </button>
            </div>
          </div>
        </div>
      )}
        </button>
        <FontAwesomeIcon
          icon={faEllipsisV}
          style={{ textAlign: "right" }}
          onClick={toggleTrashIcon}
        />
      </div>
      <div className="collection-plp-container">
        {clickedCollectionProducts.map((product, index) => (
          <div className="product-card" key={index}>
            {showCheckboxes && (
              <input
                type="checkbox"
                onChange={(e) => handleCheckboxChange(e, product)}
                checked={selectedProducts.includes(product)}
              />
            )}
            <Link to={`/pdp/${product.sku}`}>
              <img
                src={getProductImage(product, product.category_id)}
                alt={product.name}
                className="product-image"
              />
            </Link>
            <div className="product-details">
              <p className="product-name">{product.name}</p>
              <p className="product-price">${product.unit_price}</p>
              <button
                className="addToCartButton"
                onClick={() => handleAddToCart(product)}
              >
                <FontAwesomeIcon
                  icon={faCartShopping}
                  style={{ marginRight: "10px" }}
                />
                ADD TO CART
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        {isTrashIconVisible && (
          <div
            style={{
              position: "fixed",
              bottom: "0",
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
              backgroundColor: "#E8E8E8",
              width: "100%",
            }}
          >
            <FontAwesomeIcon icon={faTrash} onClick={handleDeleteCollection} />
            <p>Delete collection</p>
            <div onClick={toggleCheckboxes}>
              <FontAwesomeIcon
                icon={faCheck}
                onClick={handleToggleRemoveFromCollection}
              />
              <p>Select multiple items</p>
            </div>
          </div>
        )}
      </div>
      {isRemoveFromCollectionVisible && !isRemoveFromCollectionClosed && (
        <div
          style={{
            position: "fixed",
            bottom: "0",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            width: "100%",
            backgroundColor: "#E8E8E8",
            height: "100px",
          }}
        >
          <button
            style={{
              width: "400px",
              height: "40px",
            }}
            disabled={selectedProducts.length === 0}
            onClick={handleRemoveFromCollection}
          >
            <FontAwesomeIcon icon={faTrash} />
            <p style={{ paddingLeft: "10px" }}>Remove from collection</p>
          </button>
          <button onClick={handleToggleRemoveFromCollectionClose}>Close</button>
        </div>
      )}
     
    </div>
  );
}
