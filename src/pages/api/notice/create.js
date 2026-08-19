export default async function handler(req, res) {
  const BASE_URL = process.env.API_BASE_URL;

  if (req.method === "POST") {
    try {
      const { image, content, title } = req.body;

      if (!image || !title || !content) {
        return res.status(400).json({ error: "모든 필드를 입력해주세요" });
      }

      // 외부 API로 POST 요청
      const response = await fetch(`${BASE_URL}/articles`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: req.headers.authorization || "",
        },
        body: JSON.stringify({ image, content, title }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        return res
          .status(response.status)
          .json({ error: "외부 API 오류", detail: errorData });
      }

      const data = await response.json();
      res.status(201).json(data);
    } catch (error) {
      console.error("Create API Error:", error);
      res.status(500).json({ error: "서버 오류", detail: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
