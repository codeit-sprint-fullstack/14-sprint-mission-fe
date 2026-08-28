export function getAuthHeader() {
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// 인증이 필요한 요청 전용 fetch
export async function authFetch(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      ...getAuthHeader(),
    },
  });

  // 토큰 만료/누락으로 인증 실패한 경우
  if (res.status === 401 || res.status === 403) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    alert("로그인이 만료됐어요. 다시 로그인해주세요.");
    window.location.href = "/login";

    // 이후 로직이 실행되지 않도록 에러를 던짐
    throw new Error("인증 만료");
  }

  return res;
}