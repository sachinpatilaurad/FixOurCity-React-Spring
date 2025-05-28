// frontend/src/services/issueService.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Creates a new issue.
 * @param {FormData} issueData - The issue data, potentially including an image file.
 * @returns {Promise<object>} - The created issue data from the API.
 */
export const createIssue = async (issueData) => {
  try {
    // For FormData, an explicit Content-Type header is usually not needed with Axios,
    // as the browser will set it correctly with the boundary.
    // If you were sending JSON, you'd have:
    // const config = { headers: { 'Content-Type': 'application/json' } };
    const response = await axios.post(`${API_BASE_URL}/issues`, issueData, {
      headers: {
        // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Send token for protected routes
        // When sending FormData, Axios/browser usually sets 'Content-Type': 'multipart/form-data'
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else if (error.request) {
      throw new Error('No response from server. Please try again later.');
    } else {
      throw new Error(error.message || 'Failed to create issue. An unexpected error occurred.');
    }
  }
};

/**
 * Fetches all issues.
 * @returns {Promise<Array<object>>} - An array of issues.
 */
export const getAllIssues = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/issues`);
    return response.data;
  } catch (error) {
    // Handle error
    throw new Error(error.message || 'Failed to fetch issues.');
  }
};

/**
 * Fetches a single issue by its ID.
 * @param {string} issueId - The ID of the issue to fetch.
 * @returns {Promise<object>} - The issue data.
 */
export const getIssueById = async (issueId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/issues/${issueId}`);
    return response.data;
  } catch (error) {
    // Handle error
    throw new Error(error.message || `Failed to fetch issue ${issueId}.`);
  }
};

// Add other issue-related functions here (e.g., updateIssue, deleteIssue, addCommentToIssue)