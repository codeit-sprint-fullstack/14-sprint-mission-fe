import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const notice = await prisma.notice.findUnique({
        where: { id: Number(id) },
      });
      res.status(200).json(notice);
    } catch (error) {
      console.error("Notice GET Error:", error);
      res.status(500).json({ error: "서버 오류" });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.notice.delete({
        where: { id: Number(id) },
      });
      res.status(200).json({ message: "게시글이 삭제되었습니다." });
    } catch (error) {
      console.error("Notice DELETE Error:", error);
      res.status(500).json({ error: "서버 오류" });
    }
  } else if (req.method === 'PATCH') {
    try {
      const { author, title, content } = req.body;

      const updatedNotice = await prisma.notice.update({
        where: { id: Number(id) },
        data: {
          ...(author && { author }),
          ...(title && { title }),
          ...(content && { content }),
        },
      });

      res.status(200).json(updatedNotice);
    } catch (error) {
      console.error("Notice PATCH Error:", error);
      res.status(500).json({ error: "서버 오류" });
    }
  } else {
    res.setHeader("Allow", ["GET", "DELETE", "PATCH"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

