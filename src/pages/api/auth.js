import axios from "axios";
import { relayAxiosError } from "@/utils/proxy";

const BASE_URL = process.env.API_BASE_URL;

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { refreshToken } = req.body;
      const { data } = await axios.post(`${BASE_URL}/auth/refresh-token`, { refreshToken });
      res.status(200).json(data);
    } catch (error) {
      relayAxiosError(res, error);
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
