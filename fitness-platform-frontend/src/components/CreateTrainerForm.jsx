import React, { useState } from "react";
import { createTrainer } from "../services/trainerService";

const CreateTrainerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    bio: "",
    photo: "",
    video: "",
    qualifications: [],
    expertise: [],
    availableSlots: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTrainer = await createTrainer(formData);
      console.log("Trainer created:", newTrainer);
      alert("Trainer created successfully!");
    } catch (error) {
      console.error("Error creating trainer:", error);
      alert("Failed to create trainer. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Trainer</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          {/* Specialization */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Specialization</label>
            <input
              type="text"
              value={formData.specialization}
              onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Photo URL</label>
            <input
              type="text"
              value={formData.photo}
              onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          {/* Video URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Video URL</label>
            <input
              type="text"
              value={formData.video}
              onChange={(e) => setFormData({ ...formData, video: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          {/* Qualifications */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Qualifications (comma-separated)
            </label>
            <input
              type="text"
              value={formData.qualifications.join(", ")}
              onChange={(e) =>
                setFormData({ ...formData, qualifications: e.target.value.split(", ") })
              }
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          {/* Expertise */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Expertise (comma-separated)
            </label>
            <input
              type="text"
              value={formData.expertise.join(", ")}
              onChange={(e) =>
                setFormData({ ...formData, expertise: e.target.value.split(", ") })
              }
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          {/* Available Slots */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Available Slots (comma-separated)
            </label>
            <input
              type="text"
              value={formData.availableSlots.join(", ")}
              onChange={(e) =>
                setFormData({ ...formData, availableSlots: e.target.value.split(", ") })
              }
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Create Trainer
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTrainerForm;