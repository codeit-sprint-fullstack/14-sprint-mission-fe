import apiClient from "./apiClient";

export async function signIn(email, password) {
  const response = await apiClient.post("/auth/signIn", {
    email,
    password,
  });

  return response.data;
}
