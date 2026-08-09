import prisma from "@/lib/prisma";

// 특정 댓글의 수정과 삭제를 처리하는 API
export default async function handler(req, res) {
  // PATCH, DELETE 요청만 허용
  if (!["PATCH", "DELETE"].includes(req.method)) {
    res.setHeader("Allow", ["PATCH", "DELETE"]);

    return res.status(405).json({
      message: "허용되지 않은 요청 방식입니다.",
    });
  }

  // 주소에서 게시글 ID와 댓글 ID 추출
  const { articleId, commentId } = req.query;

  const parsedArticleId = Number(articleId);
  const parsedCommentId = Number(commentId);

  // 게시글 ID가 올바른 숫자인지 확인
  if (!Number.isInteger(parsedArticleId) || parsedArticleId <= 0) {
    return res.status(400).json({
      message: "올바른 게시글 ID가 필요합니다.",
    });
  }

  // 댓글 ID가 올바른 숫자인지 확인
  if (!Number.isInteger(parsedCommentId) || parsedCommentId <= 0) {
    return res.status(400).json({
      message: "올바른 댓글 ID가 필요합니다.",
    });
  }

  try {
    // 현재 게시글에 속한 댓글인지 확인
    const existingComment = await prisma.articleComment.findFirst({
      where: {
        id: parsedCommentId,
        articleId: parsedArticleId,
      },
    });

    // 해당 댓글이 없는 경우 처리
    if (!existingComment) {
      return res.status(404).json({
        message: "댓글을 찾을 수 없습니다.",
      });
    }

    // 댓글 삭제 처리
    if (req.method === "DELETE") {
      await prisma.articleComment.delete({
        where: {
          id: parsedCommentId,
        },
      });

      return res.status(200).json({
        message: "댓글이 삭제되었습니다.",
        id: parsedCommentId,
      });
    }

    // 수정할 댓글 내용 추출
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

    // 댓글 내용 수정
    const updatedComment = await prisma.articleComment.update({
      where: {
        id: parsedCommentId,
      },
      data: {
        content: trimmedContent,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        articleId: true,
      },
    });

    return res.status(200).json(updatedComment);
  } catch (error) {
    console.error("댓글 수정·삭제 처리 오류:", error);

    return res.status(500).json({
      message:
        req.method === "PATCH"
          ? "댓글을 수정하지 못했습니다."
          : "댓글을 삭제하지 못했습니다.",
    });
  }
}