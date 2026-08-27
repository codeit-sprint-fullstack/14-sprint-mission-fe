import { relay } from "@/utils/proxy";

export default async function handler(req, res) {
  const { id } = req.query;
  const BASE_URL = process.env.API_BASE_URL;
  const auth = req.headers.authorization || "";

  try {
    if (req.method === "GET") {
      const response = await fetch(`${BASE_URL}/articles/${id}`, {
        headers: { Authorization: auth }, // isLiked 계산용
      });
      return relay(res, response);
    }

    if (req.method === "PATCH") {
      const response = await fetch(`${BASE_URL}/articles/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: auth },
        body: JSON.stringify(req.body),
      });
      return relay(res, response);
    }

    if (req.method === "DELETE") {
      const response = await fetch(`${BASE_URL}/articles/${id}`, {
        method: "DELETE",
        headers: { Authorization: auth },
      });
      return relay(res, response);
    }

    res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error("Notice API Error:", error);
    res.status(502).json({ message: "백엔드 서버에 연결할 수 없습니다." });
  }
}
