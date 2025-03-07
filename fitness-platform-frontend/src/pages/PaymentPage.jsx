import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(1000); // Amount in cents
  const [cvv, setCvv] = useState("");
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
        cvv,
      });

      const { clientSecret } = response.data;

      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
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

  // Custom styles for the CardElement
  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px", // Increase font size
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
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

      {/* Card Details */}
      <div>
        <label className="block text-sm font-medium">Card Details</label>
        <div className="p-4 border rounded bg-gray-50">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      {/* CVV */}
      <div>
        <label className="block text-sm font-medium">CVV</label>
        <input
          type="text"
          value={cvv}
          onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
          className="w-full p-2 border rounded"
          maxLength={4}
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