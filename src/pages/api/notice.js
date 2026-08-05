import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const sort = req.query.sort || 'latest'; // 'latest' 또는 'likes'

      let orderBy;
      if (sort === 'latest') {
        orderBy = { postedAt: 'desc' }; // 스키마에 맞는 필드 사용
      } else if (sort === 'likes') {
        orderBy = { likes: 'desc' };
      } else {
        orderBy = { postedAt: 'desc' };
      }

      const totalCount = await prisma.notice.count();

      const notices = await prisma.notice.findMany({
        skip,
        take: limit,
        include: { comments: false },
        orderBy,
      });

      res.status(200).json({
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        sort,
        data: notices,
      });
    } catch (error) {
      console.error("API Error:", error);
      res.status(500).json({ error: '서버 오류', detail: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

