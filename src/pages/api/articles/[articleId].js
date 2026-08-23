import prisma from "@/lib/prisma";

// 게시글 ID에 해당하는 상세 정보를 처리하는 API
export default async function handler(req, res) {
  // GET, PATCH, DELETE 요청만 허용
  if (!["GET", "PATCH", "DELETE"].includes(req.method)) {
    res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);

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
    // ID가 일치하는 게시글 한 개 조회
    const existingArticle = await prisma.article.findUnique({
      where: {
        id: parsedArticleId,
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // 해당 게시글이 없는 경우 처리
    if (!existingArticle) {
      return res.status(404).json({
        message: "게시글을 찾을 수 없습니다.",
      });
    }

    // 게시글 상세 조회 처리
    if (req.method === "GET") {
      return res.status(200).json(existingArticle);
    }

    // 게시글 삭제 처리
    if (req.method === "DELETE") {
      await prisma.article.delete({
        where: {
          id: parsedArticleId,
        },
      });

      return res.status(200).json({
        message: "게시글이 삭제되었습니다.",
        id: parsedArticleId,
      });
    }

    // 수정할 제목과 내용 추출
    const { title, content } = req.body ?? {};

    // 제목이 문자열인지 확인
    if (typeof title !== "string") {
      return res.status(400).json({
        message: "제목을 입력해 주세요.",
      });
    }

    // 내용이 문자열인지 확인
    if (typeof content !== "string") {
      return res.status(400).json({
        message: "내용을 입력해 주세요.",
      });
    }

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    // 공백만 입력한 제목 차단
    if (!trimmedTitle) {
      return res.status(400).json({
        message: "제목을 입력해 주세요.",
      });
    }

    // 공백만 입력한 내용 차단
    if (!trimmedContent) {
      return res.status(400).json({
        message: "내용을 입력해 주세요.",
      });
    }

    // 게시글 제목과 내용 수정
    const updatedArticle = await prisma.article.update({
      where: {
        id: parsedArticleId,
      },
      data: {
        title: trimmedTitle,
        content: trimmedContent,
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(200).json(updatedArticle);
  } catch (error) {
    console.error("게시글 상세 처리 오류:", error);

    return res.status(500).json({
      message:
        req.method === "PATCH"
          ? "게시글을 수정하지 못했습니다."
          : req.method === "DELETE"
            ? "게시글을 삭제하지 못했습니다."
            : "게시글을 불러오지 못했습니다.",
    });
  }
}
