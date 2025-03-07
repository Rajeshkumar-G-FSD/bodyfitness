// frontend/src/pages/PaymentPage.jsx
import React from "react";
import Payment from "../components/Payment";

const PaymentPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8">Payment</h1>
        <Payment />
      </div>
    </div>
  );
};

export default PaymentPage;