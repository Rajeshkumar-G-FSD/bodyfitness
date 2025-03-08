import React, { useState } from "react";
import axios from "axios";

const PaymentPage = () => {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Format card number (XXXX XXXX XXXX XXXX)
  const formatCardNumber = (value) => {
    const cleanedValue = value.replace(/\s/g, "");
    if (cleanedValue.length > 16) return cleanedValue.slice(0, 16);
    return cleanedValue.match(/.{1,4}/g)?.join(" ") || "";
  };

  // Format expiration date (MM/YY)
  const formatExpiry = (value) => {
    const cleanedValue = value.replace(/\D/g, "");
    if (cleanedValue.length > 2) {
      return cleanedValue.slice(0, 2) + "/" + cleanedValue.slice(2, 4);
    }
    return cleanedValue;
  };

  // Handle form submission
  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate all fields
    if (!name || !cardNumber || !expiry || !cvv || !amount) {
      setError("Please fill out all fields.");
      setLoading(false);
      return;
    }

    try {
      // Step 1: Call the first API to create a payment intent
      const paymentIntentResponse = await axios.post(
        "https://renderbackend-1-gw0j.onrender.com/api/payment/create-payment-intent",
        {
          amount: parseFloat(amount) * 100, // Convert to cents
          currency: "usd",
        }
      );

      const { clientSecret } = paymentIntentResponse.data;

      // Simulate a successful payment confirmation
      console.log("Payment Intent Created:", clientSecret);

      // Step 2: Call the second API to confirm payment success
      const successResponse = await axios.post(
        "https://renderbackend-1-gw0j.onrender.com/api/payment/payment-success",
        {
          paymentIntentId: clientSecret, // Use the client secret as paymentIntentId
          bookingId: "64f1b2c3e4b0f5a2d8e7f8a9", // Replace with actual booking ID
        }
      );

      if (successResponse.status === 200) {
        alert("Payment successful!");
        // Reset form
        setName("");
        setCardNumber("");
        setExpiry("");
        setCvv("");
        setAmount("");
      } else {
        setError("Payment failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Payment Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8">Payment</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800">
          <form onSubmit={handlePayment} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium">Cardholder Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            {/* Card Number */}
            <div>
              <label className="block text-sm font-medium">Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                placeholder="1234 5678 9012 3456"
                className="w-full p-2 border rounded"
                maxLength={19}
                required
              />
            </div>

            {/* Expiration Date and CVV */}
            <div className="form-row">
              <div className="form-group">
                <label className="block text-sm font-medium">Expiration Date</label>
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  placeholder="MM/YY"
                  className="w-full p-2 border rounded"
                  maxLength={5}
                  required
                />
              </div>
              <div className="form-group">
                <label className="block text-sm font-medium">CVV</label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  placeholder="123"
                  className="w-full p-2 border rounded"
                  maxLength={4}
                  required
                />
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium">Amount (in USD)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Payment Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;