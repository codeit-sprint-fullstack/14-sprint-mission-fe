import api from "./axios";

// 회원가입 API
export async function signup({
  email,
  password,
  nickname,
}) {
  const response = await api.post("/auth/signup", {
    email,
    password,
    nickname,
  });

  return response.data;
}