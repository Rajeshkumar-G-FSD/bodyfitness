import axios from "axios";

const API = axios.create({
  baseURL: "https://renderbackend-1-gw0j.onrender.com/api", // Base URL for all API calls
});

// Create a new trainer
export const createTrainer = async (trainerData) => {
  try {
    const response = await API.post("/trainers", trainerData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};