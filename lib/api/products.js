import axios from "axios";

const API_BASE_URL = "https://panda-market-api.vercel.app";

function getAuthorization() {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("로그인이 필요합니다.");
  }

  return {
    Authorization: `Bearer ${accessToken}`,
  };
}

export async function getProduct(productId) {
  const response = await axios.get(`${API_BASE_URL}/products/${productId}`, {
    headers: getAuthorization(),
  });

  return response.data;
}
