import React, { useState } from "react";
import axios from "axios";
import "./PaymentPage.css"; // Import CSS for styling

const PaymentPage = () => {
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Format card number (XXXX XXXX XXXX XXXX)
  const formatCardNumber = (value) => {
    const cleanedValue = value.replace(/\s/g, "");
    if (cleanedValue.length > 16) return cleanedValue.slice(0, 16);
    return cleanedValue.match(/.{1,4}/g)?.join(" ") || "";
  };

  // Format expiration date (MM/YY)
  const formatExpirationDate = (value) => {
    const cleanedValue = value.replace(/\D/g, "");
    if (cleanedValue.length > 2) {
      return cleanedValue.slice(0, 2) + "/" + cleanedValue.slice(2, 4);
    }
    return cleanedValue;
  };

  // Format CVV (3 or 4 digits)
  const formatCvv = (value) => {
    return value.replace(/\D/g, "").slice(0, 4);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!cardholderName || !cardNumber || !expirationDate || !cvv) {
      setError("Please fill out all fields.");
      return;
    }

    // Validate card number (16 digits)
    const formattedCardNumber = cardNumber.replace(/\s/g, "");
    if (formattedCardNumber.length !== 16 || !/^\d+$/.test(formattedCardNumber)) {
      setError("Please enter a valid 16-digit card number.");
      return;
    }

    // Validate expiration date (MM/YY)
    if (!/^\d{2}\/\d{2}$/.test(expirationDate)) {
      setError("Please enter a valid expiration date (MM/YY).");
      return;
    }

    // Validate CVV (3 or 4 digits)
    if (!/^\d{3,4}$/.test(cvv)) {
      setError("Please enter a valid CVV (3 or 4 digits).");
      return;
    }

    // Prepare payment data
    const paymentData = {
      cardholderName,
      cardNumber: formattedCardNumber,
      expirationDate,
      cvv,
    };

    // Disable button to prevent multiple submissions
    setIsLoading(true);
    setError("");

    try {
      // Call payment API
      const response = await axios.post(
        "https://your-payment-api.com/process-payment",
        paymentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Payment successful!");
        // Redirect or show success message
      } else {
        setError(`Payment failed: ${response.data.message}`);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h1>Payment Details</h1>
      <form onSubmit={handleSubmit}>
        {/* Cardholder Name */}
        <div className="form-group">
          <label htmlFor="cardholder-name">Cardholder Name</label>
          <input
            type="text"
            id="cardholder-name"
            placeholder="John Doe"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            required
          />
        </div>

        {/* Card Number */}
        <div className="form-group">
          <label htmlFor="card-number">Card Number</label>
          <input
            type="text"
            id="card-number"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            maxLength={19}
            required
          />
        </div>

        {/* Expiration Date and CVV */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="expiration-date">Expiration Date</label>
            <input
              type="text"
              id="expiration-date"
              placeholder="MM/YY"
              value={expirationDate}
              onChange={(e) => setExpirationDate(formatExpirationDate(e.target.value))}
              maxLength={5}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              placeholder="123"
              value={cvv}
              onChange={(e) => setCvv(formatCvv(e.target.value))}
              maxLength={4}
              required
            />
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}

        {/* Payment Button */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;