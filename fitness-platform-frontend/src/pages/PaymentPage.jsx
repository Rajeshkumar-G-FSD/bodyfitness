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

  const formatCardNumber = (value) => {
    const cleanedValue = value.replace(/\s/g, "");
    if (cleanedValue.length > 16) return cleanedValue.slice(0, 16);
    return cleanedValue.match(/.{1,4}/g)?.join(" ") || "";
  };

  const formatExpiry = (value) => {
    const cleanedValue = value.replace(/\D/g, "");
    if (cleanedValue.length > 2) {
      return cleanedValue.slice(0, 2) + "/" + cleanedValue.slice(2, 4);
    }
    return cleanedValue;
  };

  const validateForm = () => {
    if (!name || !cardNumber || !expiry || !cvv || !amount) {
      setError("Please fill out all fields.");
      return false;
    }

    const cleanedCardNumber = cardNumber.replace(/\s/g, "");
    if (cleanedCardNumber.length !== 16 || !/^\d+$/.test(cleanedCardNumber)) {
      setError("Invalid card number. Please enter 16 digits.");
      return false;
    }

    const [month, year] = expiry.split("/");
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (
      !/^\d{2}\/\d{2}$/.test(expiry) ||
      parseInt(month) < 1 ||
      parseInt(month) > 12 ||
      parseInt(year) < currentYear ||
      (parseInt(year) === currentYear && parseInt(month) < currentMonth)
    ) {
      setError("Invalid expiration date. Please use MM/YY format.");
      return false;
    }

    if (!/^\d{3,4}$/.test(cvv)) {
      setError("Invalid CVV. Please enter 3 or 4 digits.");
      return false;
    }

    if (isNaN(amount) || parseFloat(amount) <= 0) {
      setError("Invalid amount. Please enter a positive number.");
      return false;
    }

    return true;
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const paymentIntentResponse = await axios.post(
        "https://renderbackend-1-gw0j.onrender.com/api/payment/create-payment-intent",
        {
          amount: parseFloat(amount) * 100,
          currency: "usd",
        }
      );

      const { clientSecret, paymentIntentId } = paymentIntentResponse.data;

      const bookingId = "64f1b2c3e4b0f5a2d8e7f8a9";
      const bookingResponse = await axios.get(
        `https://renderbackend-1-gw0j.onrender.com/api/bookings/${bookingId}`
      );

      const bookingDetails = bookingResponse.data;

      const successResponse = await axios.post(
        "https://renderbackend-1-gw0j.onrender.com/api/payment/payment-success",
        {
          paymentIntentId: paymentIntentId,
          bookingId: bookingId,
          booking: bookingDetails,
        }
      );

      if (successResponse.status === 200) {
        alert("Payment successful!");
        setName("");
        setCardNumber("");
        setExpiry("");
        setCvv("");
        setAmount("");
      } else {
        setError("Payment failed. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        setError(`Payment failed: ${error.response.data.message || "Unknown error"}`);
      } else if (error.request) {
        setError("No response from the server. Please try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
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

            <div className="grid grid-cols-2 gap-4">
              <div>
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
              <div>
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

            {error && <p className="text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 disabled:bg-blue-300"
            >
              {loading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                "Pay Now"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;