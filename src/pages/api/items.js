import axios from "axios";
import { relayAxiosError } from "@/utils/proxy";

const BASE_URL = process.env.API_BASE_URL;

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { page = 1, size = 10, orderBy = "recent", keyword = "" } = req.query;

      const { data } = await axios.get(`${BASE_URL}/products`, {
        params: { page, pageSize: size, orderBy, keyword },
        headers: { Authorization: req.headers.authorization || "" }, // isFavorite 계산용
      });

      res.status(200).json(data);
    } catch (error) {
      relayAxiosError(res, error);
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
