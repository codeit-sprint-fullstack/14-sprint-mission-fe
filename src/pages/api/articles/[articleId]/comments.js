import prisma from "@/lib/prisma";

// 게시글 ID에 해당하는 댓글 목록과 댓글 작성을 처리하는 API
export default async function handler(req, res) {
  // GET, POST 요청만 허용
  if (!["GET", "POST"].includes(req.method)) {
    res.setHeader("Allow", ["GET", "POST"]);

    return res.status(405).json({
      message: "허용되지 않은 요청 방식입니다.",
    });
  }

  // 주소에서 게시글 ID 추출
  const { articleId } = req.query;
  const parsedArticleId = Number(articleId);

  // 게시글 ID가 올바른 숫자인지 확인
  if (!Number.isInteger(parsedArticleId) || parsedArticleId <= 0) {
    return res.status(400).json({
      message: "올바른 게시글 ID가 필요합니다.",
    });
  }

  try {
    // 댓글을 연결할 게시글 존재 여부 확인
    const existingArticle = await prisma.article.findUnique({
      where: {
        id: parsedArticleId,
      },
      select: {
        id: true,
      },
    });

    // 해당 게시글이 없는 경우 처리
    if (!existingArticle) {
      return res.status(404).json({
        message: "게시글을 찾을 수 없습니다.",
      });
    }

    // 댓글 목록 조회 처리
    if (req.method === "GET") {
      const comments = await prisma.articleComment.findMany({
        where: {
          articleId: parsedArticleId,
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          content: true,
          createdAt: true,
          updatedAt: true,
          articleId: true,
        },
      });

      return res.status(200).json({
        list: comments,
      });
    }

    // 작성할 댓글 내용 추출
    const { content } = req.body ?? {};

    // 댓글 내용이 문자열인지 확인
    if (typeof content !== "string") {
      return res.status(400).json({
        message: "댓글을 입력해 주세요.",
      });
    }

    const trimmedContent = content.trim();

    // 공백만 입력한 댓글 차단
    if (!trimmedContent) {
      return res.status(400).json({
        message: "댓글을 입력해 주세요.",
      });
    }

    // 새 댓글 생성
    const createdComment = await prisma.articleComment.create({
      data: {
        content: trimmedContent,
        articleId: parsedArticleId,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        articleId: true,
      },
    });

    return res.status(201).json(createdComment);
  } catch (error) {
    console.error("게시글 댓글 처리 오류:", error);

    return res.status(500).json({
      message:
        req.method === "POST"
          ? "댓글을 등록하지 못했습니다."
          : "댓글을 불러오지 못했습니다.",
    });
  }
}