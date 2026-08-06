import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export default async function handler(req, res) {
  const { id, commentId } = req.query;

  if (req.method === 'GET') {
    try {
      const comments = await prisma.comment.findMany({
        where: { noticeId: Number(id) },
        orderBy: { postedAt: 'desc' }
      });
      res.status(200).json(comments);
    } catch (error) {
      console.error("Comment API Error:", error);
      res.status(500).json({ error: "서버 오류" });
    }
  } else if (req.method === 'POST') {
    try {
      const { author, content } = req.body;
      if (!author || !content) {
        return res.status(400).json({ error: "닉네임과 내용을 입력해주세요" });
      }

      const newComment = await prisma.comment.create({
        data: {
          author,
          content,
          postedAt: new Date(),
          noticeId: Number(id),
        },
      });

      res.status(201).json(newComment);
    } catch (error) {
      console.error("Comment POST Error:", error);
      res.status(500).json({ error: "서버 오류" });
    }
  } else if (req.method === 'PATCH') {
    try {
      if (!commentId) {
        return res.status(400).json({ error: "수정할 댓글 ID가 필요합니다." });
      }

      const { content } = req.body;
      if (!content) {
        return res.status(400).json({ error: "수정할 내용을 입력해주세요" });
      }

      const updatedComment = await prisma.comment.update({
        where: { id: Number(commentId) },
        data: { content },
      });

      res.status(200).json(updatedComment);
    } catch (error) {
      console.error("Comment PATCH Error:", error);
      res.status(500).json({ error: "서버 오류" });
    }
  } else if (req.method === 'DELETE') {
    try {
      if (!commentId) {
        return res.status(400).json({ error: "삭제할 댓글 ID가 필요합니다." });
      }

      await prisma.comment.delete({
        where: { id: Number(commentId) },
      });

      res.status(200).json({ message: "댓글이 삭제되었습니다." });
    } catch (error) {
      console.error("Comment DELETE Error:", error);
      res.status(500).json({ error: "서버 오류" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
