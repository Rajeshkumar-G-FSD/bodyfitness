import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Backend base URL
});

// Trainer API calls

export const fetchTrainers = () => API.get("/trainers");
export const createTrainer = (trainerData) => API.post("/trainers", trainerData);
export const updateTrainerAvailability = (trainerId, availability) =>
  API.put(`/trainers/${trainerId}/availability`, availability);

// Class API calls
export const fetchClasses = (filters) => API.get("/classes", { params: filters });

// Book a class
export const bookClass = (bookingData) => API.post("/bookings", bookingData);

// Feedback API calls
export const submitFeedback = (feedbackData) => API.post("/feedback", feedbackData);

// Booking Management API calls
export const fetchUserBookings = (userId) => API.get(`/users/${userId}/bookings`);
export const rescheduleBooking = (bookingId, newDate) =>
  API.put(`/bookings/${bookingId}/reschedule`, { newDate });
export const cancelBooking = (bookingId) => API.delete(`/bookings/${bookingId}`);
export const fetchTrainerBookings = (trainerId) =>
  API.get(`/trainers/${trainerId}/bookings`);

// Class Recommendations API calls
export const fetchClassRecommendations = (userId) =>
  API.get(`/users/${userId}/recommendations`);

// User API calls
//export const registerUser = (userData) => API.post("/users/register", userData);
//export const loginUser = (credentials) => API.post("/users/login", credentials);
export const updateUserProfile = (userId, profileData) =>
  API.put(`/users/${userId}/profile`, profileData);

// Trainer Profile API calls
export const fetchTrainerProfile = (trainerId) => API.get(`/trainers/${trainerId}`);
export const fetchTrainerReviews = (trainerId) =>
  API.get(`/trainers/${trainerId}/reviews`);
export const submitTrainerReview = (trainerId, reviewData) =>
  API.post(`/trainers/${trainerId}/reviews`, reviewData);

export const updateTrainerProfile = (trainerId, updateData) =>
  API.put(`/trainers/${trainerId}`, updateData);


// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await API.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Login a user
export const loginUser = async (credentials) => {
  try {
    const response = await API.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
