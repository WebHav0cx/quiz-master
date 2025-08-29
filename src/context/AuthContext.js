import React, { createContext, useEffect, useState } from "react";
import {
  getProfile,
  login as loginService,
  logout as logoutService,
} from "../services/auth";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const profile = await getProfile();
        setUser(profile);
      } catch (err) {
        console.error("Failed to fetch profile", err);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const login = async (provider, credentials) => {
    const data = await loginService(provider, credentials);
    setUser(data.user); // data.user comes from API response
  };

  const logout = async () => {
    await logoutService();
    setUser(null);
  };

  // return (
  //   <AuthContext.Provider value={{ user, loading, login, logout }}>
  //     {children}
  //   </AuthContext.Provider>
  // );

  return React.createElement(
    AuthContext.Provider,
    { value: { user, loading, login, logout } },
    children
  );
};
