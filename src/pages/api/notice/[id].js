export default async function handler(req, res) {
  const { id } = req.query;
  const BASE_URL = process.env.API_BASE_URL;

  if (req.method === 'GET') {
    try {
      const response = await fetch(`${BASE_URL}/articles/${id}`);
      if (!response.ok) {
        return res.status(response.status).json({ error: "외부 API 오류" });
      }
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Notice GET Error:", error);
      res.status(500).json({ error: "서버 오류" });
    }
  } else if (req.method === 'DELETE') {
    try {
      const response = await fetch(`${BASE_URL}/articles/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        return res.status(response.status).json({ error: "외부 API 오류" });
      }
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Notice DELETE Error:", error);
      res.status(500).json({ error: "서버 오류" });
    }
  } else if (req.method === 'PATCH') {
    try {
      const response = await fetch(`${BASE_URL}/articles/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });
      if (!response.ok) {
        return res.status(response.status).json({ error: "외부 API 오류" });
      }
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Notice PATCH Error:", error);
      res.status(500).json({ error: "서버 오류" });
    }
  } else {
    res.setHeader("Allow", ["GET", "DELETE", "PATCH"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}