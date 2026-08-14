import axios from "axios";
import { getAccessToken, removeAccessToken } from "./authToken";

const apiClient = axios.create({
  baseURL: "https://panda-market-api.vercel.app",
});

apiClient.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeAccessToken();
    }

    return Promise.reject(error);
  },
);

export default apiClient;
