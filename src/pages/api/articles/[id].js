import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const allowedMethods = ["GET", "PATCH", "DELETE"];

  if (!allowedMethods.includes(req.method)) {
    res.setHeader("Allow", allowedMethods);

    return res.status(405).json({
      message: "허용되지 않은 메서드입니다.",
    });
  }

  const { id } = req.query;

  try {
    const existingArticle = await prisma.article.findUnique({
      where: {
        id,
      },
    });

    if (!existingArticle) {
      return res.status(404).json({
        message: "게시글을 찾을 수 없습니다.",
      });
    }

    if (req.method === "GET") {
      return res.status(200).json(existingArticle);
    }

    if (req.method === "PATCH") {
      const title =
        typeof req.body?.title === "string" ? req.body.title.trim() : "";

      const content =
        typeof req.body?.content === "string" ? req.body.content.trim() : "";

      if (!title || !content) {
        return res.status(400).json({
          message: "제목과 내용을 모두 입력해주세요.",
        });
      }

      const updatedArticle = await prisma.article.update({
        where: {
          id,
        },
        data: {
          title,
          content,
        },
      });

      return res.status(200).json(updatedArticle);
    }

    await prisma.article.delete({
      where: {
        id,
      },
    });

    return res.status(204).end();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "게시글을 불러오지 못했습니다.",
    });
  }
}
