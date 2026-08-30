"use client"
import { login } from "@/api/login";
import { signup } from "@/api/signup";
import { createContext, useContext, useState, useEffect } from "react";
import api from "@/api/axios";

// createContext 인증 정보를 담을 공간 만들기
// useContext 그 공간에서 값 꺼내 쓰기
// useState  로그인한 유저 상태 저장하기

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function handleLogin({ email, password }) {
    try {
      const data = await login({ email, password });
      console.log("로그인 성공:", data);
      setUser(data.user);
      localStorage.setItem("accessToken", data.accessToken);
      return data;
    } catch (error) {
      console.log("로그인 실패:", error.response?.data);
      throw new Error("");
    }
  }

  async function handleSignUp({
    email,
    password,
    nickname,
    passwordConfirmation,
  }) {
    try {
      const data = await signup({
        email,
        password,
        nickname,
        passwordConfirmation,
      });

      console.log("회원가입 성공:", data);

      return data;
    } catch (error) {
      console.log("회원가입 실패:", error.response?.data);
      throw error;
    }
  }

  async function getMe() {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setLoading(false);
      return;
    }
    try {
      const res = await api.get("/users/me");
      const nextUser = res.data;
      setUser(nextUser);
    } catch (error) {
      console.log("유저 정보 조회 실패:", error.response?.data);
    }
    setLoading(false);
  }
  useEffect(() => {
    getMe()
  }, [])

  function logout() {
    localStorage.removeItem("accessToken");
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, handleLogin, handleSignUp, logout, getMe }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}