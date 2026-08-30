import api from "./axios";

// 로그인 API
export async function login({ email, password }) {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
}