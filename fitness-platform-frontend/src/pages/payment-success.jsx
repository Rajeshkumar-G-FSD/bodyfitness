import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-500 to-blue-500 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-lg mb-8">Your booking has been confirmed.</p>
      <button
        onClick={() => navigate("/")}
        className="bg-white text-blue-500 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
      >
        Return to Home
      </button>
    </div>
  );
};

export default PaymentSuccess;