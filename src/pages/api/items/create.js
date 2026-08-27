import axios from "axios";
import { relayAxiosError } from "@/utils/proxy";

export default async function handler(req, res) {
  const BASE_URL = process.env.API_BASE_URL;

  if (req.method === "POST") {
    try {
      const { images, tags, price, description, name } = req.body;

      // 필수값 검증
      if (!images || !Array.isArray(images) || images.length === 0) {
        return res.status(400).json({ error: "이미지를 최소 1개 이상 입력해주세요" });
      }
      if (!name || !description || price === undefined) {
        return res.status(400).json({ error: "상품명, 설명, 가격은 필수입니다" });
      }
      if (!tags || !Array.isArray(tags) || tags.length === 0) {
        return res.status(400).json({ error: "태그는 최소 1개 이상 입력해주세요" });
      }

      // 외부 API로 POST 요청
      const response = await axios.post(
        `${BASE_URL}/products`,
        { images, tags, price, description, name },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: req.headers.authorization || "", // ✅ 토큰 전달
          },
        }
      );

      res.status(201).json(response.data);
    } catch (error) {
      relayAxiosError(res, error);
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

