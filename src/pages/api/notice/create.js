import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { author, title, content } = req.body;

      if (!author || !title || !content) {
        return res.status(400).json({ error: '모든 필드를 입력해주세요' });
      }

      const newNotice = await prisma.notice.create({
        data: {
          author,
          title,
          content,
          postedAt: new Date(),
          likes: 0,
        },
      });

      res.status(201).json(newNotice);
    } catch (error) {
      console.error("Create API Error:", error);
      res.status(500).json({ error: '서버 오류', detail: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
