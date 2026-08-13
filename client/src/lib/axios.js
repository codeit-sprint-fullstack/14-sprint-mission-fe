import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://panda-market-api.vercel.app',
})

// 1. 요청 인터셉터
instance.interceptors.request.use(
  // AT가 있으면 헤더에 AT를 담아서 axios 요청
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  // 오류 처리
  (err) => {
    return Promise.reject(err)
  }
)

// 중복 방지를 위한 Promise
let refreshPromise = null;

// 2. 응답 인터셉터
instance.interceptors.response.use(
  // 성공시, 응답 그대로 반환
  (res) => res,
  // 실패시, 오류 처리
  async (err) => {
    const originalRequest = err.config;

    // AT 만료되고, 아직 재시도하지 않은 요청인 경우
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');
      
      // RT가 없을 때
      // 토큰 갱신 불가능 -> 에러 반환
      if (!refreshToken) {
        localStorage.removeItem('accessToken');
        return Promise.reject(err);
      }

      // RT가 있을 때
      try {
        if (!refreshPromise) {
          // RT로 AT 갱신 및 로컬스토리지에 저장
          const refreshToken = localStorage.getItem('refreshToken');
          refreshPromise = instance
            .post('/auth/refresh-token', { refreshToken }, { _retry: true })
            .then((response) => {
              const newAccessToken = response.data.accessToken;
              localStorage.setItem('accessToken', newAccessToken);
              return newAccessToken;
            })
            .finally(() => {
              refreshPromise = null;
            })
        }
        // 새로 발급받은 AT로 실패한 요청 재시도
        const newAccessToken = await refreshPromise;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        // RT까지 만료됬거나 갱신에 실패한 경우
        // (RT가 만료되어도, 로컬스토리지에 문자열이 그대로 남아있음 -> catch로 처리)
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(err);
  }
)
export default instance;