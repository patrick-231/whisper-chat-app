import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// Hook to use AuthContext
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    const storedAuthUser = localStorage.getItem("chat-user");
    try {
      return storedAuthUser ? JSON.parse(storedAuthUser) : null;
    } catch (error) {
      console.error("Error parsing authUser from localStorage:", error);
      return null;
    }
  });
  const [token, setToken] = useState(
    localStorage.getItem("chat-token") || null
  );

  // Save authUser and token to localStorage when they change
  useEffect(() => {
    if (authUser) {
      localStorage.setItem("chat-user", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("chat-user");
    }
  }, [authUser]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("chat-token", token);
    } else {
      localStorage.removeItem("chat-token");
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
