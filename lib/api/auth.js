import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

export async function signIn({ email, password }) {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, {
    email,
    password,
  });

  return response.data;
}

export async function signUp({
  email,
  nickname,
  password,
  passwordConfirmation,
}) {
  const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
    email,
    nickname,
    password,
    passwordConfirmation,
  });
  return response.data;
}
