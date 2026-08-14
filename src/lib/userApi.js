import apiClient from "./apiClient";

export async function getMe() {
  const response = await apiClient.get("/users/me");

  return response.data;
}
