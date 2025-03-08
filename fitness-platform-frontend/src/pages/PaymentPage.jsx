import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState(1000); // Amount in cents
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    try {
      // Create a payment intent
      const response = await axios.post("/api/payment/create-payment-intent", {
        amount,
        currency: "usd",
        name,
        cardNumber,
        expiry,
        cvv,
      });

      const { clientSecret } = response.data;

      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement("card"), // Use a custom card element
          billing_details: {
            name,
          },
        },
      });

      if (error) {
        setError(error.message);
      } else if (paymentIntent.status === "succeeded") {
        alert("Payment successful!");
      }
    } catch (error) {
      setError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

  return (
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
          value={amount / 100} // Convert cents to dollars
          onChange={(e) => setAmount(e.target.value * 100)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Payment Button */}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

const PaymentPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8">Payment</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800">
          <Elements stripe={stripePromise}>
            <PaymentForm />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;