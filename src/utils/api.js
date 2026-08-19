import axios from "axios";

const api = axios.create({
  baseURL: "/api", // 내부 API 라우트만 바라보도록 설정
});

// 요청 인터셉터
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // refresh 요청
        const refreshToken = localStorage.getItem("refreshToken");
        const refreshRes = await axios.post("/api/auth", { refreshToken });

        if (refreshRes.status === 200) {
          const { accessToken } = refreshRes.data;
          localStorage.setItem("accessToken", accessToken);
          console.log("🔄 Refresh 성공! 새 accessToken:", accessToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest); // 원래 요청 재시도
        }
      } catch (err) {
        localStorage.clear();
        window.location.href = "/";
        console.log(err);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
