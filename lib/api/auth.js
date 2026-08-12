import axios from "axios";

const API_BASE_URL = "https://panda-market-api.vercel.app";

export async function signIn({ email, password }) {
  const response = await axios.post(`${API_BASE_URL}/auth/signIn`, {
    email,
    password,
  });

  return response.data;
}
