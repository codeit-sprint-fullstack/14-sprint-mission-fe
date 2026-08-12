import axios from 'axios';

const BASE_URL = process.env.API_BASE_URL;

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { page = 1, limit = 10, sort = 'latest', keyword = '' } = req.query;

      const { data } = await axios.get(`${BASE_URL}/api/notices`, {
        params: { page, limit, sort, keyword },
      });

      res.status(200).json(data);
    } catch (error) {
      console.error("API Error:", error);
      res.status(500).json({ error: '서버 오류', detail: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
