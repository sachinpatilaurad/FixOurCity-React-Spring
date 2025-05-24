// frontend/src/services/authService.js
import axios from 'axios';

// Get the API base URL from the environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Logs in a user.
 * @param {object} credentials - User credentials.
 * @param {string} credentials.email - User's email.
 * @param {string} credentials.password - User's password.
 * @returns {Promise<object>} - The user data from the API.
 */
export const loginUser = async (credentials) => {
  try {
    // Construct the full API endpoint URL
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    // When connected to backend:
    // Spring Security with JWT typically returns a JWT in the response body
    // For example: response.data might be { token: "jwt_token_here", user: { ... } }
    return response.data; // This will be what the backend sends on successful login
  } catch (error) {
    // Handle specific error responses from the backend if needed
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from server. Please try again later.');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(error.message || 'Login failed. An unexpected error occurred.');
    }
  }
};

/**
 * Registers a new user.
 * @param {object} userData - User registration data.
 * @returns {Promise<object>} - The newly registered user data or success message.
 */
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else if (error.request) {
      throw new Error('No response from server. Please try again later.');
    } else {
      throw new Error(error.message || 'Registration failed. An unexpected error occurred.');
    }
  }
};

// Add other auth-related functions here (e.g., logout, getCurrentUser)