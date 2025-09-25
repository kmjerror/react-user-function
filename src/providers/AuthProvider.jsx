"use client";

import { authService } from "@/lib/authService";
import { userService } from "@/lib/userService";
import { createContext, useContext, useEffect, useState } from "react";
import { cookieFetch } from "@/lib/fetchClient";

const AuthContext = createContext({
  login: async () => {},
  logout: async () => {},
  user: null,
  updateUser: async () => {},
  register: async () => {},
});

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const me = await userService.getMe();
      setUser(me);
    } catch (err) {
      setUser(null);
    }
  };

  const register = async (name, email, password) => {
    await authService.register(name, email, password);
  };

  const login = async (email, password) => {
    await authService.login(email, password);
    await getUser();
  };

  const logout = async () => {
    try {
      await cookieFetch("/auth/logout", { method: "DELETE" });
    } finally {
      setUser(null);
    }
  };

  const updateUser = async (partial) => {
    const updated = await userService.updateMe(partial);
    setUser(updated);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, register }}>
      {children}
    </AuthContext.Provider>
  );
}