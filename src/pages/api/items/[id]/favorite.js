export default async function handler(req, res) {
  const { id } = req.query;
  const BASE_URL = process.env.API_BASE_URL;

  try {
    if (req.method === "POST") {
      // 좋아요 등록
      const response = await fetch(`${BASE_URL}/products/${id}/favorite`, {
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
      const response = await fetch(`${BASE_URL}/products/${id}/favorite`, {
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
    console.error("Favorite API Error:", error);
    res.status(500).json({ error: "서버 오류" });
  }
}

