import React, { createContext, useState, useEffect } from "react";

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check if the user is already logged in (e.g., from localStorage)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setUser(JSON.parse(userData)); // Set the user data if token and user data exist
    }
  }, []);

  // Login function
  const login = (token, userData) => {
    localStorage.setItem("token", token); // Store the token in localStorage
    localStorage.setItem("user", JSON.stringify(userData)); // Store the user data in localStorage
    setUser(userData); // Update the user state
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    localStorage.removeItem("user"); // Remove the user data from localStorage
    setUser(null); // Clear the user state
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };