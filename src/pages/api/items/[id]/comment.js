export default async function handler(req, res) {
    const { id, commentId } = req.query;
    const limit = 5;
    const cursor = req.query.cursor || "";
    const BASE_URL = process.env.API_BASE_URL;

    try {
        if (req.method === "GET") {
            const url = `${BASE_URL}/products/${id}/comments?limit=${limit}${cursor ? `&cursor=${cursor}` : ""}`;
            const response = await fetch(
                url,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: req.headers.authorization || "", // 필요 시 토큰 전달
                    },
                }
            );
            if (!response.ok) {
                return res.status(response.status).json({ error: "외부 API 오류" });
            }
            const data = await response.json();
            return res.status(200).json(data);
        }

        if (req.method === "POST") {
            const response = await fetch(`${BASE_URL}/products/${id}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: req.headers.authorization,
                },
                body: JSON.stringify(req.body), // { author, content } 필요
            });
            if (!response.ok) {
                return res.status(response.status).json({ error: "외부 API 오류" });
            }
            const data = await response.json();
            return res.status(201).json(data);
        }

        if (req.method === "PATCH") {
            if (!commentId) {
                return res.status(400).json({ error: "수정할 댓글 ID가 필요합니다." });
            }
            const response = await fetch(`${BASE_URL}/comments/${commentId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: req.headers.authorization,
                },
                body: JSON.stringify(req.body), // { content } 필요
            });
            if (!response.ok) {
                return res.status(response.status).json({ error: "외부 API 오류" });
            }
            const data = await response.json();
            return res.status(200).json(data);
        }

        if (req.method === "DELETE") {
            if (!commentId) {
                return res.status(400).json({ error: "삭제할 댓글 ID가 필요합니다." });
            }
            const response = await fetch(`${BASE_URL}/comments/${commentId}`, {
                method: "DELETE",
                headers: {
                    Authorization: req.headers.authorization,
                },
            });
            if (!response.ok) {
                return res.status(response.status).json({ error: "외부 API 오류" });
            }
            const data = await response.json();
            return res.status(200).json(data);
        }

        res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error) {
        console.error("Comments API Error:", error);
        res.status(500).json({ error: "서버 오류" });
    }
}
