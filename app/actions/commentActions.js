"use server";

import { revalidatePath } from "next/cache";

const USER_ID = "6c3a18b0-11c5-4d97-9019-9ebe3c4d1317";

export async function createComment(articleId, formData) {
  const content = formData.get("content");

  if (!content) {
    throw new Error("댓글 내용을 입력해주세요");
  }

  const res = await fetch(
    `https://one4-sprint-mission-prisma.onrender.com/articles/${articleId}/comments`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: USER_ID, content }),
    },
  );

  if (!res.ok) {
    throw new Error("댓글 등록에 실패했습니다");
  }

  revalidatePath(`/articles/${articleId}`);
}

// 삭제

export async function deleteComment(articleId, commentId) {
  const res = await fetch(
    `https://one4-sprint-mission-prisma.onrender.com/comments/${commentId}`,
    {
      method: "DELETE",
    },
  );

  if (!res.ok) {
    throw new Error("댓글 삭제에 실패했습니다");
  }

  revalidatePath(`/articles/${articleId}`);
}
