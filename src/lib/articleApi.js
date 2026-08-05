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
