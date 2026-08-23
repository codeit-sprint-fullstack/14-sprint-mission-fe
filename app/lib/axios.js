import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

if (!baseURL) {
  throw new Error("환경변수를 먼저 설정해주세요.");
}

const instance = axios.create({ baseURL });

function clearTokens() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

async function requestNewAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    throw new Error("refreshToken이 없습니다.");
  }
  const res = await axios.post(`${baseURL}/auth/refresh-token`, {
    refreshToken,
  });
  return res.data.accessToken;
}

function handleSessionExpired(originalRequest) {
  clearTokens();

  if (originalRequest?.url?.includes("/users/me")) return;

  if (window.location.pathname !== "/signin") {
    window.location.href = "/signin";
  }
}

//요청 interceptor
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

//응답 interceptor
let refreshPromise = null;

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const originalRequest = error.config;

    if (status !== 401) return Promise.reject(error);

    if (!originalRequest?.headers?.Authorization) return Promise.reject(error);

    if (originalRequest?._retry) {
      handleSessionExpired(originalRequest);
      return Promise.reject(error);
    }

    try {
      if (!refreshPromise) {
        refreshPromise = requestNewAccessToken().finally(() => {
          refreshPromise = null;
        });
      }
      const accessToken = await refreshPromise;
      localStorage.setItem("accessToken", accessToken);

      originalRequest._retry = true;
      return instance(originalRequest);
    } catch {
      handleSessionExpired(originalRequest);
      return Promise.reject(error);
    }
  },
);

export default instance;
