import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (!["GET", "POST"].includes(req.method)) {
    res.setHeader("Allow", ["GET", "POST"]);

    return res.status(405).json({
      message: "허용되지 않은 메서드입니다.",
    });
  }

  if (req.method === "POST") {
    try {
      const title =
        typeof req.body.title === "string" ? req.body.title.trim() : "";

      const content =
        typeof req.body.content === "string" ? req.body.content.trim() : "";

      if (!title || !content) {
        return res.status(400).json({
          message: "빈칸을 채워주세요.",
        });
      }

      const article = await prisma.article.create({
        data: {
          title,
          content,
        },
      });

      return res.status(201).json(article);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "게시글을 등록하지 못했습니다.",
      });
    }
  }

  try {
    const { offset, limit, keyword, sort } = req.query;

    const offsetNum = Number(offset) || 0;
    const limitNum = Number(limit) || 10;

    const where = keyword
      ? {
          title: {
            contains: keyword,
            mode: "insensitive",
          },
        }
      : {};

    const totalCount = await prisma.article.count({
      where,
    });

    const articles = await prisma.article.findMany({
      where,
      orderBy: sort === "recent" ? { createdAt: "desc" } : { createdAt: "asc" },
      skip: offsetNum,
      take: limitNum,
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
      },
    });

    return res.status(200).json({
      list: articles,
      totalCount,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "게시물 목록을 불러오지 못했습니다.",
    });
  }
}
