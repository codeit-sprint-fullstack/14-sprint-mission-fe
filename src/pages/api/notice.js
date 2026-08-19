import axios from "axios";

const BASE_URL = process.env.API_BASE_URL;

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { page = 1, pageSize = 10, orderBy = "recent", keyword = "" } = req.query;

      const { data } = await axios.get(`${BASE_URL}/articles`, {
        params: { page, pageSize, orderBy, keyword },
      });

      res.status(200).json(data);
    } catch (error) {
      console.error("API Error:", error);
      res.status(500).json({ error: "서버 오류", detail: error.message });
    }
  } else if (req.method === "POST") {
    try {
      const { title, content, image } = req.body;

      // 필수값 검증
      if (!title || !content) {
        return res.status(400).json({ error: "제목과 내용은 필수입니다." });
      }

      // 외부 API로 POST 요청
      const { data } = await axios.post(
        `${BASE_URL}/articles`,
        { image, content, title },
        {
          headers: {
            "Content-Type": "application/json",
            // 클라이언트에서 Authorization 헤더를 붙여서 전달하면 그대로 외부 API로 전달됨
            Authorization: req.headers.authorization,
          },
        }
      );

      res.status(201).json(data);
    } catch (error) {
      console.error("API POST Error:", error);
      if (error.response) {
        return res
          .status(error.response.status)
          .json({ error: error.response.data.error || "외부 API 오류" });
      }
      res.status(500).json({ error: "서버 오류", detail: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
