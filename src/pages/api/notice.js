import axios from "axios";
import { relayAxiosError } from "@/utils/proxy";

const BASE_URL = process.env.API_BASE_URL;

export default async function handler(req, res) {
  const auth = req.headers.authorization || "";

  if (req.method === "GET") {
    try {
      const { page = 1, pageSize = 10, orderBy = "recent", keyword = "" } = req.query;
      const { data } = await axios.get(`${BASE_URL}/articles`, {
        params: { page, pageSize, orderBy, keyword },
        headers: { Authorization: auth }, // isLiked 계산용
      });
      res.status(200).json(data);
    } catch (error) {
      relayAxiosError(res, error);
    }
  } else if (req.method === "POST") {
    try {
      const { title, content, images } = req.body;
      const { data } = await axios.post(
        `${BASE_URL}/articles`,
        { images: images ?? [], content, title },
        { headers: { "Content-Type": "application/json", Authorization: auth } }
      );
      res.status(201).json(data);
    } catch (error) {
      relayAxiosError(res, error);
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
