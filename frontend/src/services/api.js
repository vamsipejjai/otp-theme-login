// frontend/src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});

// Login (request OTP)
export const loginUser = async ({ email, phone, state }) => {
  const response = await API.post("/login", { email, phone, state });
  return response.data;
};

// Verify OTP
export const verifyOtp = async ({ email, phone, otp }) => {
  const response = await API.post("/verify-otp", { email, phone, otp });
  return response.data;
};
