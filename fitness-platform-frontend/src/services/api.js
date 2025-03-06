import axios from "axios";

const API = axios.create({
  baseURL: "https://renderbackend-1-gw0j.onrender.com/api", // Backend base URL
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
//export const rescheduleBooking = (bookingId, newDate) =>  API.put(`/bookings/${bookingId}/reschedule`, { newDate });
//export const cancelBooking = (bookingId) => API.delete(`/bookings/${bookingId}`);
export const fetchTrainerBookings = (trainerId) =>
  API.get(`/trainers/${trainerId}/bookings`);

// Class Recommendations API calls
export const fetchClassRecommendations = (userId) =>
  API.get(`/users/${userId}/recommendations`);

// User API calls
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

// Auth API calls
export const registerUser = async (userData) => {
  try {
    const response = await API.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await API.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Create a new trainer (if needed)
export const createNewTrainer = async (trainerData) => {
  try {
    const response = await API.post("/trainers", trainerData);
    console.log(response); // Log the response for debugging
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const rescheduleBooking = (bookingId, newDate, newTime) =>
  API.put(`/bookings/${bookingId}/reschedule`, { newDate, newTime });

// Cancel booking
export const cancelBooking = (bookingId) => API.delete(`/bookings/${bookingId}`);

// Submit a review for a trainer
export const submitReview = async (trainerId, reviewData) => {
  try {
    const response = await API.post(`/trainers/${trainerId}/reviews`, {
      ...reviewData,
      userId: "67c7c14fbb3aab8427e676e0", // Add the userId here
    });
    return response.data;
  } catch (error) {
    console.error("Failed to submit review:", error);
    throw error;
  }
};