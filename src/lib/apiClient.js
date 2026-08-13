import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://panda-market-api.vercel.app",
});

export default apiClient;
