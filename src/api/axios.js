import axios from "axios";

// 우리 Express 백엔드 공통 주소
const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

// 요청할 때 로그인 토큰 자동 추가
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export default api;