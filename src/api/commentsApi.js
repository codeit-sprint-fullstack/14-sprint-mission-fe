const BASE_URL = "https://panda-market-api.vercel.app";

export async function getProductComments({ productId, limit = 10, cursor }) {
  const params = new URLSearchParams({
    limit: String(limit),
  });

  if (cursor) {
    params.set("cursor", String(cursor));
  }

  const response = await fetch(
    `${BASE_URL}/products/${productId}/comments?${params.toString()}`,
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "댓글을 불러오지 못했습니다.");
  }

  return data;
}

export async function createProductComment({
  productId,
  content,
  accessToken,
}) {
  const response = await fetch(`${BASE_URL}/products/${productId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      content,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "댓글을 등록하지 못했습니다.");

    error.status = response.status;
    throw error;
  }

  return data;
}

export async function updateComment({ commentId, content, accessToken }) {
  const response = await fetch(`${BASE_URL}/comments/${commentId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      content,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "댓글을 수정하지 못했습니다.");

    error.status = response.status;
    throw error;
  }

  return data;
}

export async function deleteComment({ commentId, accessToken }) {
  const response = await fetch(`${BASE_URL}/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const data = await response.json();
    const error = new Error(data.message || "댓글을 삭제하지 못했습니다.");

    error.status = response.status;
    throw error;
  }
}
