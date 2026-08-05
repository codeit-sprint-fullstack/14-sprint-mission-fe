const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3001";

export async function getArticleComments(articleId) {
  const res = await fetch(`${API_BASE_URL}/articles/${articleId}/comments`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("댓글 목록을 불러오지 못했습니다.");
  }

  return res.json();
}

export async function createArticleComment(articleId, content) {
  const res = await fetch(`${API_BASE_URL}/articles/${articleId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) {
    throw new Error("댓글을 등록하지 못했습니다.");
  }

  return res.json();
}

export async function updateArticleComment(commentId, content) {
  const res = await fetch(`${API_BASE_URL}/comments/${commentId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) {
    throw new Error("댓글을 수정하지 못했습니다.");
  }

  return res.json();
}

export async function deleteArticleComment(commentId) {
  const res = await fetch(`${API_BASE_URL}/comments/${commentId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("댓글을 삭제하지 못했습니다.");
  }
}
