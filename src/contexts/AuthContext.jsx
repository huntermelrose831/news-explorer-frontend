import { createContext, useState, useContext, useEffect } from "react";

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
  // State for user data and authentication status
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Added loading state for better UX

  // Check for existing auth data when component mounts
  useEffect(() => {
    const savedToken = localStorage.getItem("jwt");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setToken(savedToken);
        setCurrentUser(userData);
        setIsLoggedIn(true);
      } catch (error) {
        // If there's an issue parsing saved user data, clear everything
        console.warn("Error parsing saved user data:", error);
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false); // Done checking localStorage
  }, []);

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
