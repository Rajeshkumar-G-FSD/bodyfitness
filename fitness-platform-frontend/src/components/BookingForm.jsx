import React, { useState } from "react";
import { bookClass } from "../services/api";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    classId: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await bookClass(formData);
      alert("Booking successful!");
      console.log(response.data);
    } catch (error) {
      console.error("Booking failed:", error);
    }
  };

  return (
    <div className="p-4 bg-gradient-to-r from-green-500 to-blue-500 text-white">
      <h2 className="text-2xl font-bold mb-4">Book a Class</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded text-gray-800"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-2 border rounded text-gray-800"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Class ID</label>
          <input
            type="text"
            value={formData.classId}
            onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
            className="w-full p-2 border rounded text-gray-800"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-white text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-300"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookingForm;