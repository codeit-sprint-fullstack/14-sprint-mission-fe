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

export async function getProductComments({ productId, limit = 10, cursor }) {
  const response = await axios.get(
    `${API_BASE_URL}/products/${productId}/comments`,
    {
      params: {
        limit,
        cursor,
      },
    },
  );

  return response.data;
}

export async function createProductComment({ productId, content }) {
  const response = await axios.post(
    `${API_BASE_URL}/products/${productId}/comments`,
    { content },
    { headers: getAuthorization() },
  );

  return response.data;
}

export async function deleteComment(commentId) {
  const response = await axios.delete(`${API_BASE_URL}/comments/${commentId}`, {
    headers: getAuthorization(),
  });

  return response.data;
}

export async function updateComment({ commentId, content }) {
  const response = await axios.patch(
    `${API_BASE_URL}/comments/${commentId}`,
    {
      content,
    },
    {
      headers: getAuthorization(),
    },
  );

  return response.data;
}
