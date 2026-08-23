import apiClient from "./client";

export async function signIn(credentials) {
  const response = await apiClient.post("/auth/signIn", credentials);
  return response.data;
}

export async function signUp(userData) {
  const response = await apiClient.post("/auth/signUp", userData);
  return response.data;
}