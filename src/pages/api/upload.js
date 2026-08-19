import formidable from "formidable";
import fs from "fs";
import axios from "axios";
import FormData from "form-data";

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Formidable parse error:", err);
        return res.status(500).json({ error: "파일 파싱 실패" });
      }

      try {
        const file = files.image[0]; // ✅ 배열에서 첫 번째 파일 꺼내기
        const formData = new FormData();
        formData.append("image", fs.createReadStream(file.filepath), {
          filename: file.originalFilename,
          contentType: file.mimetype,
        });

        const { data } = await axios.post(
          `${process.env.API_BASE_URL}/images/upload`,
          formData,
          {
            headers: {
              ...formData.getHeaders(),
              Accept: "application/json", // ✅ 외부 API 요구사항 반영
              Authorization: req.headers.authorization || "",
            },
          }
        );

        res.status(200).json(data);
      } catch (error) {
        console.error("Image Upload Error:", error.response?.data || error);
        res.status(error.response?.status || 500).json({
          error: error.response?.data?.error || "서버 오류",
        });
      }
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}