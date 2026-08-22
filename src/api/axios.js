import axios from "axios";

const api = axios.create({
 baseURL: "https://panda-market-api.vercel.app"
})

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config
});

export default api