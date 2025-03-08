import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// Utility function to check if a string is a valid MongoDB ObjectId
const isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const bookingId = queryParams.get("bookingId") || "67cc926ee2f56e41beb4a3a3"; // Use a default booking ID if not provided

  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (bookingId) {
      // Validate the bookingId before making the API request
      if (!isValidObjectId(bookingId)) {
        setError("Invalid booking ID");
        return;
      }

      // Fetch booking details if needed
      axios
        .get(`https://renderbackend-1-gw0j.onrender.com/api/bookings/${bookingId}`)
        .then((response) => {
          console.log("Booking Details:", response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch booking details:", error);
          setError("Failed to fetch booking details. Please try again.");
        });
    }
  }, [bookingId]);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate the bookingId
      if (!isValidObjectId(bookingId)) {
        throw new Error("Invalid booking ID");
      }

      // Create Payment Intent
      const paymentIntentResponse = await axios.post(
        "https://renderbackend-1-gw0j.onrender.com/api/payment/create-payment-intent",
        {
          amount: parseFloat(amount) * 100, // Convert to cents
          currency: "usd",
        }
      );

      const { clientSecret, paymentIntentId } = paymentIntentResponse.data;

      // Fetch booking details (if needed)
      const bookingResponse = await axios.get(
        `https://renderbackend-1-gw0j.onrender.com/api/bookings/${bookingId}`
      );
      const bookingDetails = bookingResponse.data;

      // Handle payment success
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
        navigate("/"); // Redirect to home page or any other page after successful payment
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
                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                placeholder="1234 5678 9012 3456"
                className="w-full p-2 border rounded"
                maxLength={16}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Expiration Date</label>
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  placeholder="MMYY"
                  className="w-full p-2 border rounded"
                  maxLength={4}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">CVV</label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                  placeholder="123"
                  className="w-full p-2 border rounded"
                  maxLength={3}
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
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;