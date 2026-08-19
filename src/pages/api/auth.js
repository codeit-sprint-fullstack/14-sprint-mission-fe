import axios from "axios";

const BASE_URL = process.env.API_BASE_URL;

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { refreshToken } = req.body;
      const { data } = await axios.post(`${BASE_URL}/auth/refresh-token`, { refreshToken });
      res.status(200).json(data);
    } catch (error) {
      console.error("Auth Refresh Error:", error);
      if (error.response) {
        return res.status(error.response.status).json(error.response.data);
      }
      res.status(500).json({ error: "서버 오류", detail: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
