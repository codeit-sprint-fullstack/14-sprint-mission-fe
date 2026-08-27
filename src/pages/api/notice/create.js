import { relay } from "@/utils/proxy";

export default async function handler(req, res) {
  const BASE_URL = process.env.API_BASE_URL;

  if (req.method === "POST") {
    try {
      const { images, content, title } = req.body;

      if (!title || !content) {
        return res.status(400).json({ message: "제목과 내용은 필수입니다." });
      }

      const response = await fetch(`${BASE_URL}/articles`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: req.headers.authorization || "",
        },
        body: JSON.stringify({ images: images ?? [], content, title }),
      });

      return relay(res, response);
    } catch (error) {
      console.error("Create article API Error:", error);
      res.status(502).json({ message: "백엔드 서버에 연결할 수 없습니다." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
