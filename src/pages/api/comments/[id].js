import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const allowedMethods = ["PATCH", "DELETE"];

  if (!allowedMethods.includes(req.method)) {
    res.setHeader("Allow", allowedMethods);

    return res.status(405).json({
      message: "허용되지 않은 메서드입니다.",
    });
  }

  const { id } = req.query;

  try {
    const existingComment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!existingComment) {
      return res.status(404).json({
        message: "댓글을 찾을 수 없습니다.",
      });
    }

    if (req.method === "PATCH") {
      const content =
        typeof req.body?.content === "string"
          ? req.body.content.trim()
          : "";

      if (!content) {
        return res.status(400).json({
          message: "댓글 내용을 입력해주세요.",
        });
      }

      const updatedComment = await prisma.comment.update({
        where: { id },
        data: { content },
      });

      return res.status(200).json(updatedComment);
    }

    await prisma.comment.delete({
      where: { id },
    });

    return res.status(204).end();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "댓글 요청을 처리하지 못했습니다.",
    });
  }
}
