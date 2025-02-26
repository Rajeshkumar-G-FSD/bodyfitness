import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Backend base URL
});

// Trainer API calls
export const fetchTrainers = () => API.get("/trainers");
export const createTrainer = (trainerData) => API.post("/trainers", trainerData);

// Class API calls
export const fetchClasses = () => API.get("/classes");
export const bookClass = (classData) => API.post("/bookings", classData);

// Feedback API calls
export const submitFeedback = (feedbackData) => API.post("/feedback", feedbackData);

// Booking Management API calls
export const fetchUserBookings = (userId) => API.get(`/users/${userId}/bookings`);

// Class Recommendations API calls
export const fetchClassRecommendations = (userId) =>
  API.get(`/users/${userId}/recommendations`);