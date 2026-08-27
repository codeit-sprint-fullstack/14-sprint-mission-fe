import { relay } from "@/utils/proxy";

export default async function handler(req, res) {
  const { id, commentId } = req.query;
  const limit = req.query.limit || 10;
  const cursor = req.query.cursor || "";
  const BASE_URL = process.env.API_BASE_URL;
  const auth = req.headers.authorization || "";

  try {
    if (req.method === "GET") {
      const url = `${BASE_URL}/articles/${id}/comments?limit=${limit}${cursor ? `&cursor=${cursor}` : ""}`;
      const response = await fetch(url, { headers: { Authorization: auth } });
      return relay(res, response);
    }

    if (req.method === "POST") {
      const response = await fetch(`${BASE_URL}/articles/${id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: auth },
        body: JSON.stringify(req.body),
      });
      return relay(res, response);
    }

    if (req.method === "PATCH") {
      if (!commentId) return res.status(400).json({ message: "수정할 댓글 ID가 필요합니다." });
      const response = await fetch(`${BASE_URL}/comments/${commentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: auth },
        body: JSON.stringify(req.body),
      });
      return relay(res, response);
    }

    if (req.method === "DELETE") {
      if (!commentId) return res.status(400).json({ message: "삭제할 댓글 ID가 필요합니다." });
      const response = await fetch(`${BASE_URL}/comments/${commentId}`, {
        method: "DELETE",
        headers: { Authorization: auth },
      });
      return relay(res, response);
    }

    res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error("Article comments API Error:", error);
    res.status(502).json({ message: "백엔드 서버에 연결할 수 없습니다." });
  }
}
