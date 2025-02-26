import React from "react";
import ClassSchedule from "../components/ClassSchedule";
import BookingForm from "../components/BookingForm";

const Classes = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-500 to-blue-500">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-white mb-8">Classes</h1>
        <ClassSchedule />
        <BookingForm />
      </div>
    </div>
  );
};

export default Classes;