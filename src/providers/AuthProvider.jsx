"use client";

import { authService } from "@/lib/authService";
import { userService } from "@/lib/userService";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext({
  login: () => {},
  logout: () => {},
  user: null,
  updateUser: () => {},
  register: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const getUser = async () => {
    try {
      const user = await userService.getMe();
      setUser(user);
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다:", error);
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
      await authService.logout();
    } catch (e) {
      console.error("로그아웃 실패:", e);
    } finally {
      setUser(null);
      router.replace("login");
    }
  };

  const updateUser = async (user) => {
    const updatedUser = await userService.updateMe(user);
    setUser(updatedUser);
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
