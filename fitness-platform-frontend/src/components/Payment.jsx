// frontend/src/components/Payment.jsx
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card"); // Default to card payment

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      return;
    }

    try {
      // Create Payment Intent
      const { data: { clientSecret } } = await axios.post("/api/payment/create-payment-intent", {
        amount: 1000, // Example: $10.00
        currency: "usd",
      });

      // Confirm Payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        setSuccess(true);
        setLoading(false);
      }
    } catch (err) {
      setError("Payment failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8">Payment</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Personal Details Form */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800">
            <h2 className="text-2xl font-bold mb-4">Personal Details</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  placeholder="john.doe@example.com"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+1 234 567 890"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </form>
          </div>

          {/* Payment Method Selection */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800">
            <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
            <div className="space-y-4">
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                  />
                  <span>Credit/Debit Card</span>
                </label>
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={() => setPaymentMethod("paypal")}
                  />
                  <span>PayPal</span>
                </label>
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="googlePay"
                    checked={paymentMethod === "googlePay"}
                    onChange={() => setPaymentMethod("googlePay")}
                  />
                  <span>Google Pay</span>
                </label>
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="applePay"
                    checked={paymentMethod === "applePay"}
                    onChange={() => setPaymentMethod("applePay")}
                  />
                  <span>Apple Pay</span>
                </label>
              </div>
            </div>

            {/* Payment Form */}
            {paymentMethod === "card" && (
              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium">Card Details</label>
                  <CardElement className="p-2 border rounded" />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">Payment successful!</p>}
                <button
                  type="submit"
                  disabled={!stripe || loading}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                  {loading ? "Processing..." : "Pay Now"}
                </button>
              </form>
            )}

            {/* Digital Wallet Buttons */}
            {paymentMethod !== "card" && (
              <div className="mt-4">
                <button
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                  onClick={() => alert(`Redirecting to ${paymentMethod}...`)}
                >
                  Pay with {paymentMethod === "paypal" ? "PayPal" : paymentMethod === "googlePay" ? "Google Pay" : "Apple Pay"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800 mt-8">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <p><span className="font-semibold">Class:</span> Yoga Basics</p>
            <p><span className="font-semibold">Date:</span> 2023-10-20</p>
            <p><span className="font-semibold">Time:</span> 10:00 AM</p>
            <p><span className="font-semibold">Total:</span> $10.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Payment = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default Payment;