import React, { useState } from "react";
import "./PaymentPage.css"; // Import your CSS file for styling

export default function PaymentPage() {
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);
  const [selectedSuffix, setSelectedSuffix] = useState("@ybl"); // Define selectedSuffix state

  return (
    <div className="payment-container">
      {/* Online Payment Options */}
      <div className="payment-section">
        <h3>Online Payment Options</h3>
        <ul>
          <li>
            <div style={{ position: "relative", display: "inline-block" }}>
              <input
                type="radio"
                id="google-pay"
                name="paymentOption"
                value="google-pay"
                checked={selectedPaymentOption === "google-pay"}
                onChange={() => setSelectedPaymentOption("google-pay")}
                placeholder="Enter 10-digit number"
                pattern="\d{10}"
                title="Please enter a 10-digit number"
                required
                maxLength="10"
              />
              <label htmlFor="google-pay">Google Pay</label>
              {/* Dropdown */}
              {selectedPaymentOption === "google-pay" && (
                <div style={{ position: "absolute", top: 0, right: 0 }}>
                  <select
                    value={selectedSuffix}
                    onChange={(e) => setSelectedSuffix(e.target.value)}
                  >
                    <option value="@ybl">@ybl</option>
                    <option value="@ibl">@ibl</option>
                  </select>
                </div>
              )}
            </div>
          </li>
          <li>
            <input
              type="radio"
              id="phonepe"
              name="paymentOption"
              value="phonepe"
              checked={selectedPaymentOption === "phonepe"}
              onChange={() => setSelectedPaymentOption("phonepe")}
            />
            <label htmlFor="phonepe">PhonePe</label>
          </li>
        </ul>
        {selectedPaymentOption === "google-pay" && (
          <div>
            <div style={{ position: "relative", display: "inline-block" }}>
              <input
                type="text"
                id="upiId"
                placeholder="Enter UPI ID"
                pattern="\d{10}@(?:ybl|ibl)"
                title="Please enter a valid UPI ID in the format 10_digits@ybl or 10_digits@ibl"
                required
                inputmode="numeric"
                oninput="showDropdown()"
              />
              {/* Dropdown for selecting @ybl or @ibl */}
              <div style={{ position: "absolute", top: 0, right: 0 }}>
                <select
                  value={selectedSuffix}
                  onChange={(e) => setSelectedSuffix(e.target.value)}
                >
                  <option value="@ybl">@ybl</option>
                  <option value="@ibl">@ibl</option>
                </select>
              </div>
            </div>
          </div>
        )}
        {selectedPaymentOption === "phonepe" && (
          <div>
            <div style={{ position: "relative", display: "inline-block" }}>
              <input
                type="text"
                id="upiId"
                placeholder="Enter UPI ID"
                pattern="\d{10}@(?:ybl|ibl)"
                title="Please enter a valid UPI ID in the format 10_digits@ybl or 10_digits@ibl"
                required
                inputmode="numeric"
                oninput="showDropdown()"
              />
              {/* Dropdown for selecting @ybl or @ibl */}
              <div style={{ position: "absolute", top: 0, right: 0 }}>
                <select
                  value={selectedSuffix}
                  onChange={(e) => setSelectedSuffix(e.target.value)}
                >
                  <option value="@ybl">@ybl</option>
                  <option value="@ibl">@ibl</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Card Payment Options */}
      <div className="payment-section">
        <h3>Card Payment Options</h3>
        <ul>
          <li>
            <input
              type="radio"
              id="card"
              name="paymentOption"
              value="card"
              checked={selectedPaymentOption === "card"}
              onChange={() => setSelectedPaymentOption("card")}
            />
            <label htmlFor="card">Credit/Debit Card</label>
            {selectedPaymentOption === "card" && (
              <div>
                <input
                  type="text"
                  placeholder="Card Number"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
                  maxLength="16" // Set maximum length to 16 digits
                  title="Please enter a valid card number"
                  required
                  inputMode="numeric"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
                  maxLength="3" // Set maximum length to 4 digits
                  title="Please enter a valid CVV"
                  required
                />
                <label htmlFor="expirationDate">Expiration Date</label>
                <input
                  type="text"
                  id="expirationDate"
                  title="Please enter a valid expiration date in the format MM/YYYY"
                  required
                  pattern="\d{2}/\d{4}"
                  placeholder="MM/YYYY"
                />
              </div>
            )}
          </li>
          {/* Add more card payment options here */}
        </ul>
      </div>
    </div>
  );
}
