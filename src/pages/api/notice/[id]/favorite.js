export default async function handler(req, res) {
  const { id } = req.query;
  const BASE_URL = process.env.API_BASE_URL;

  try {
    if (req.method === "POST") {
      // 좋아요 등록
      const response = await fetch(`${BASE_URL}/articles/${id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: req.headers.authorization || "",
        },
      });
      const data = await response.json();
      return res.status(response.status).json(data);
    }

    if (req.method === "DELETE") {
      // 좋아요 취소
      const response = await fetch(`${BASE_URL}/articles/${id}/like`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: req.headers.authorization || "",
        },
      });
      const data = await response.json();
      return res.status(response.status).json(data);
    }

    res.setHeader("Allow", ["POST", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error("Article like API Error:", error);
    res.status(502).json({ message: "백엔드 서버에 연결할 수 없습니다." });
  }
}

