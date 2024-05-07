import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PlaceOrderPage.css";

export default function PlaceOrderPage() {
  const [workAddress, setWorkAddress] = useState(null);
  const [homeAddress, setHomeAddress] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get("http://localhost:8081/get-address");
      const addresses = response.data;
      const work = addresses.find((address) => address.type === "work");
      const home = addresses.find((address) => address.type === "home");
      setWorkAddress(work);
      setHomeAddress(home);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleRadioChange = (address) => {
    setSelectedAddress(address);
    // Navigate to the payment method page
    navigate("/payment");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Apply specific filtering for 'addressLine2' to exclude special characters
    if (name === "addressLine2") {
        const filteredValue = value.replace(/[^A-Za-z\s]/g, ''); // Allow only letters and spaces
        setSelectedAddress(prev => ({
            ...prev,
            [name]: filteredValue,
        }));
    } else {
        // For all other inputs, set the value as usual
        setSelectedAddress(prev => ({
            ...prev,
            [name]: value,
        }));
    }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  // Ensure selectedAddress is not null and has required fields
  if (!selectedAddress || !selectedAddress.fullName || !selectedAddress.addressLine1) {
    alert("Please complete the address form.");
    return;
  }

  try {
    // Assuming `selectedAddress` includes all required fields
    const response = await axios.post("http://localhost:8081/store-address", selectedAddress);
    alert("Address stored successfully!");
    setSelectedAddress(null); // Reset form
    navigate("/payment"); // Navigate on success
  } catch (error) {
    alert("Failed to store address. Please try again.");
    console.error("Error submitting address:", error);
  }
};

  
  return (
    <div
      style={{
        margin: "0px 108px",
        position: "relative",
        paddingTop: "130px",
      }}
    >
      <div className="address-container">
        <h3 className="address-heading">Add Address</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="radio"
              id="work"
              name="existingAddress"
              value="work"
              checked={selectedAddress === workAddress}
              onChange={() => handleRadioChange(workAddress)}
            />
            <label htmlFor="work">Work Address</label>
          </div>
          {workAddress && (
            <div className="address-details">
              <p style={{ paddingLeft: "186px" }}>
                {`${workAddress.fullName}, ${workAddress.addressLine1}, ${workAddress.addressLine2}`}
              </p>
              <p style={{ paddingLeft: "186px" }}>
                {`${workAddress.city}, ${workAddress.state}, ${workAddress.postalCode}`}
              </p>
              <p style={{ paddingLeft: "186px" }}>{workAddress.country}</p>
            </div>
          )}

          <div>
            <input
              type="radio"
              id="home"
              name="existingAddress"
              value="home"
              checked={selectedAddress === homeAddress}
              onChange={() => handleRadioChange(homeAddress)}
            />
            <label htmlFor="home">Home Address</label>
          </div>
          {/* Display home address */}
          {homeAddress && (
            <div className="address-details">
              <p style={{ paddingLeft: "186px" }}>
                {`${homeAddress.fullName}, ${homeAddress.addressLine1}, ${homeAddress.addressLine2}`}
              </p>
              <p style={{ paddingLeft: "186px" }}>
                {`${homeAddress.city}, ${homeAddress.state}, ${homeAddress.postalCode}`}
              </p>
              <p style={{ paddingLeft: "186px" }}>{homeAddress.country}</p>
            </div>
          )}
          <br></br>
          <br></br>
          <div className="input-container">
            <input
              type="text"
              name="fullName"
              value={selectedAddress?.fullName || ""}
              onChange={handleChange}
              required
              maxLength="30"
            />
            <label>Full Name</label>
          </div>
          <div className="input-container">
            <input
              type="text"
              name="addressLine1"
              value={selectedAddress?.addressLine1 || ""}
              onChange={handleChange}
              required
            />
            <label>Address Line 1</label>
          </div>
          <div className="input-container">
            <input
              type="text"
              name="addressLine2"
              value={selectedAddress?.addressLine2 || ""}
              onChange={handleChange}
            />
            <label>Address Line 2</label>
          </div>
          <div className="input-container">
          <div className="input-container">
  <select
    name="city"
    value={selectedAddress?.city || ""}
    onChange={handleChange}
    required
  >
    <option value="" disabled hidden>Select City</option>
    <option value="Agra">Agra</option>
    <option value="Bidar">Bidar</option>
    <option value="Chennai">Chennai</option>
    <option value="Darjeeling">Darjeeling</option>
    <option value="Etawah">Etawah</option>
    <option value="Fatehpur">Fatehpur</option>
    <option value="Gandhinagar">Gandhinagar</option>
    <option value="Hassan">Hassan</option>
    <option value="Indore">Indore</option>
    <option value="Jamnagar">Jamnagar</option>
  </select>
  <div className="dropdown-arrow">&#9660;</div>
</div>

          </div>
          <div className="input-container">
          <select
    name="state"
    value={selectedAddress?.state || ""}
    onChange={handleChange}
    required
  >
    <option value="" disabled hidden>Select State</option>
    <option value="Australia">Australia</option>
    <option value="Brazil">Brazil</option>
    <option value="Cyprus">Cyprus</option>
    <option value="Dominica">Dominica</option>
    <option value="Ethiopia">Ethiopia</option>
    <option value="	France">	France</option>
    <option value="	Guyana">	Guyana</option>
    <option value="	Hungary">	Hungary</option>
    <option value="India">India</option>
    <option value="	Jamaica">	Jamaica</option>

  </select>
  <span className="dropdown-arrow">&#9660;</span>
          </div>
          <div className="input-container">
          <input
  type="text"
  name="postalCode"
  value={selectedAddress?.postalCode || ""}
  onChange={handleChange}
  pattern="\d{6}"
  title="Please enter a 6-digit postal code"
  required
  onInput={(e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  }}
  maxLength="6"
  inputMode="numeric"

/>
            <label>Postal Code</label>
          </div>
          <div className="input-container">
          <select
    name="country"
    value={selectedAddress?.country || ""}
    onChange={handleChange}
    required
  >
    <option value="" disabled hidden>Select Country</option>
    <option value="Australia">Australia</option>
    <option value="Brazil">Brazil</option>
    <option value="Cyprus">Cyprus</option>
    <option value="Dominica">Dominica</option>
    <option value="Ethiopia">Ethiopia</option>
    <option value="	France">	France</option>
    <option value="	Guyana">	Guyana</option>
    <option value="	Hungary">	Hungary</option>
    <option value="India">India</option>
    <option value="	Jamaica">	Jamaica</option>

  </select>
  <span className="dropdown-arrow">&#9660;</span>
          </div>
          <button type="submit" className="submit-button">
            Submit Address
          </button>
        </form>
      </div>
    </div>
  );
}
