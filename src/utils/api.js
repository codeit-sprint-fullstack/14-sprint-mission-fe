import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "/api", // 내부 API 라우트만 바라보도록 설정
});

// 요청 인터셉터 — accessToken 자동 첨부
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 서버(또는 프록시)가 내려준 메시지 추출
function getServerMessage(error) {
  const data = error.response?.data;
  if (!data) return null;
  if (typeof data === "string") return data;
  return data.message || data.error?.message || (typeof data.error === "string" ? data.error : null);
}

// 상태코드별 사용자 피드백 문구
function feedbackMessage(status, serverMessage) {
  switch (true) {
    case status === 400 || status === 409 || status === 422:
      return serverMessage || "입력값을 확인해주세요.";
    case status === 401:
      return serverMessage || "로그인이 필요합니다.";
    case status === 403:
      return serverMessage || "권한이 없습니다.";
    case status === 404:
      return serverMessage || "요청한 리소스를 찾을 수 없습니다.";
    case status >= 500:
      return "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
    default:
      return serverMessage || "요청 처리 중 오류가 발생했습니다.";
  }
}

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    // 401 → 리프레시 토큰으로 액세스 토큰 재발급 후 1회 재시도
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const refreshRes = await axios.post("/api/auth", { refreshToken });

        if (refreshRes.status === 200) {
          const { accessToken, refreshToken: newRefresh } = refreshRes.data;
          localStorage.setItem("accessToken", accessToken);
          if (newRefresh) localStorage.setItem("refreshToken", newRefresh);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest); // 재시도 (성공 시 여기서 종료)
        }
      } catch (err) {
        localStorage.clear();
        toast.error("세션이 만료되었습니다. 다시 로그인해주세요.");
        window.location.href = "/";
        err.__toastShown = true;
        return Promise.reject(err);
      }
    }

    // 상태코드별 토스트
    if (status) {
      toast.error(`[${status}] ${feedbackMessage(status, getServerMessage(error))}`);
    } else {
      toast.error("서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.");
    }

    // 컴포넌트 onError 에서 중복 토스트를 띄우지 않도록 표시
    error.__toastShown = true;
    return Promise.reject(error);
  }
);

export default api;
