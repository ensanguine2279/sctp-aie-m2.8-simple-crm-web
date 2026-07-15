// src/contexts/AuthContext.jsx
import { useState } from "react";
import { AuthContext } from "./AuthContextInstance";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("crm_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem("crm_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("crm_user");
  };

  const hasRole = (role) => {
    return user?.role === role;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}
