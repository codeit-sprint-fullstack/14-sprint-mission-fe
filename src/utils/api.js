import axios from "axios";
import { toast } from "react-toastify";

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
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest); // 원래 요청 재시도
        }
      } catch (err) {
        localStorage.clear();
        toast.error("세션이 만료되었습니다. 다시 로그인해주세요.");
        window.location.href = "/";
        return Promise.reject(err);
      }
    }
    switch (error.response?.status) {
      case 403:
        toast.error(`${error.response?.status} ` + "권한이 없습니다.");
        break;
      case 404:
        toast.error(`${error.response?.status} ` + "요청한 리소스를 찾을 수 없습니다.");
        break;
      case 500:
        toast.error(`${error.response?.status} ` + "서버 오류가 발생했습니다.");
        break;
      default:
        toast.error(`${error.response?.status} ` + "알 수 없는 오류가 발생했습니다.");
    }
    return Promise.reject(error);
  }
);

export default api;
