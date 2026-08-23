const BASE_URL = "https://panda-market-api.vercel.app";

export async function getCurrentUser(accessToken) {
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(
      data.message || "사용자 정보를 불러오지 못했습니다.",
    );

    error.status = res.status;
    throw error;
  }

  return data;
}
