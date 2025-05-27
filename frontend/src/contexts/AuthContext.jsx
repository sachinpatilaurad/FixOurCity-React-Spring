// frontend/src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
// We will import authService functions when we connect to the real backend
// import { loginUser as apiLoginUser, registerUser as apiRegisterUser } from '../services/authService';

// 1. Create the Context
const AuthContext = createContext(null);

// 2. Create a Provider Component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Store user object or null
  const [token, setToken] = useState(localStorage.getItem("authToken")); // Store JWT token
  const [isLoading, setIsLoading] = useState(true); // To check auth status on initial load

  // Effect to check for existing token and potentially fetch user on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
      // In a real app, you'd verify the token with the backend here
      // and fetch user details if the token is valid.
      // For now, if a token exists, we'll assume a mock user or wait for login.
      // For this simulation, if a token exists, let's just mock a user to demonstrate.
      // This would be replaced by an API call like `apiGetCurrentUser(storedToken)`
      const mockUser = localStorage.getItem("currentUser");
      if (mockUser) {
        setCurrentUser(JSON.parse(mockUser));
      }
    }
    setIsLoading(false); // Done checking initial auth state
  }, []);

  // Login function
  const login = async (email, password) => {
    // ** SIMULATED LOGIN - Replace with API call **
    console.log("AuthContext: Simulating login with", { email, password });
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "test@example.com" && password === "password") {
          const mockUserData = {
            id: 1,
            name: "Test User",
            email: "test@example.com",
            roles: ["USER"],
          };
          const mockToken = "fake-jwt-token-for-simulation";

          localStorage.setItem("authToken", mockToken);
          localStorage.setItem("currentUser", JSON.stringify(mockUserData)); // Store mock user
          setToken(mockToken);
          setCurrentUser(mockUserData);
          resolve(mockUserData);
        } else {
          reject(new Error("Invalid credentials (simulated)"));
        }
      }, 1000);
    });
    // ** END SIMULATED LOGIN **

    // ** REAL API CALL (when backend is ready) **
    // try {
    //   const responseData = await apiLoginUser({ email, password }); // from authService
    //   // Assuming responseData contains { token, user }
    //   localStorage.setItem('authToken', responseData.token);
    //   localStorage.setItem('currentUser', JSON.stringify(responseData.user));
    //   setToken(responseData.token);
    //   setCurrentUser(responseData.user);
    //   return responseData.user;
    // } catch (error) {
    //   console.error("AuthContext login error:", error);
    //   throw error; // Re-throw to be caught by the LoginPage component
    // }
  };

  // Register function (similar structure to login for simulation)
  const register = async (userData) => {
    // ** SIMULATED REGISTER **
    console.log("AuthContext: Simulating registration for", userData.email);
    return new Promise((resolve) => {
      setTimeout(() => {
        // For simulation, we don't automatically log in, just acknowledge
        const mockRegisteredUser = {
          ...userData,
          id: Date.now(),
          roles: ["USER"],
        }; // Give a fake ID
        console.log("Simulated registration successful:", mockRegisteredUser);
        resolve(mockRegisteredUser); // Typically, API returns the new user object
      }, 1000);
    });
    // ** END SIMULATED REGISTER **

    // ** REAL API CALL (when backend is ready) **
    // try {
    //   const responseData = await apiRegisterUser(userData); // from authService
    //   // Handle response, maybe auto-login or require login
    //   return responseData;
    // } catch (error) {
    //   console.error("AuthContext register error:", error);
    //   throw error;
    // }
  };

  // Logout function
  const logout = () => {
    console.log("AuthContext: Logging out");
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
    setToken(null);
    setCurrentUser(null);
    // In a real app, you might also want to call a backend endpoint to invalidate the token
  };

  // The value that will be available to consuming components
  const value = {
    currentUser,
    token,
    isAuthenticated: !!currentUser, // Derived state: true if currentUser is not null
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Create a custom hook to use the AuthContext easily
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined || context === null) {
    // context will be undefined if `useAuth` is used outside of an `AuthProvider`
    // context will be null if `createContext(null)` was used and no provider is above it.
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
