/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from "react";

// ================== Auth Context ==================
// This will hold all our authentication state
const AuthContext = createContext();

// ================== Custom Hook ==================
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// ================== Auth Provider ==================
export const AuthProvider = ({ children }) => {
  // State for user data and authentication status; derive initial state from localStorage synchronously
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("user");
    if (!saved) return null;
    try {
      return JSON.parse(saved);
    } catch {
      // Corrupted data - clear it and return null
      localStorage.removeItem("user");
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem("jwt") || null);
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!(localStorage.getItem("jwt") && localStorage.getItem("user"))
  );
  const [isLoading] = useState(false);
  // Handle successful login
  const handleLogin = (userData, authToken) => {
    try {
      localStorage.setItem("jwt", authToken);
      localStorage.setItem("user", JSON.stringify(userData));

      setToken(authToken);
      setCurrentUser(userData);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error saving auth data:", error);
      // Maybe show a toast notification here later
    }
  };

  // Handle logout and cleanup
  const handleLogout = () => {
    // Clear localStorage first
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");

    // Then reset all state
    setToken(null);
    setCurrentUser(null);
    setIsLoggedIn(false);

    // TODO: Maybe call a logout API endpoint here to invalidate the token on the server
  };

  // Context value that will be provided to components
  const contextValue = {
    currentUser,
    isLoggedIn,
    token,
    isLoading, // Adding this so components can show loading states
    handleLogin,
    handleLogout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// ================== Notes ==================
// - Consider adding token refresh logic later
// - Might want to add user profile update functions here too
