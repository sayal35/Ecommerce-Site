import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    try {
      const storedAuth = localStorage.getItem("auth");
      return storedAuth ? JSON.parse(storedAuth) : { user: null, token: "" };
    } catch (error) {
      console.error("Error parsing auth from localStorage", error);
      return { user: null, token: "" };
    }
  });

  // Update axios headers whenever auth.token changes
  useEffect(() => {
    if (auth?.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [auth?.token]);

  // Save auth state to localStorage, clear it if user logs out
  useEffect(() => {
    if (auth?.user && auth?.token) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth"); // Clear storage if user logs out
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access auth context
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
