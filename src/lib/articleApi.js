const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3001";

export async function getArticles(keyword = "") {
  let url = `${API_BASE_URL}/articles`;

  if (keyword) {
    const encodedKeyword = encodeURIComponent(keyword);
    url = `${url}?keyword=${encodedKeyword}`;
  }

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("게시글 목록을 불러오지 못했습니다.");
  }

  return res.json();
}

export async function getArticle(id) {
  const res = await fetch(`${API_BASE_URL}/articles/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("게시글을 불러오지 못했습니다.");
  }

  return res.json();
}

export async function deleteArticle(articleId) {
  const res = await fetch(`${API_BASE_URL}/articles/${articleId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("게시글을 삭제하지 못했습니다.");
  }
}
