"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createArticle(formData) {
  const title = formData.get("title");
  const content = formData.get("content");

  const res = await fetch(
    "https://one4-sprint-mission-prisma.onrender.com/articles",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    },
  );

  if (!res.ok) {
    throw new Error("게시글 등록에 실패했습니다");
  }

  const article = await res.json();
  redirect(`/articles/${article.id}`);
}

// 삭제

export async function deleteArticle(articleId) {
  const res = await fetch(
    `https://one4-sprint-mission-prisma.onrender.com/articles/${articleId}`,
    {
      method: "DELETE",
    },
  );

  if (!res.ok) {
    throw new Error("게시글 삭제에 실패했습니다");
  }

  revalidatePath("/articles");
  redirect(`/articles`);
}

//수정
export async function updateArticle(articleId, formData) {
  const title = String(formData.get("title") ?? "");
  const content = String(formData.get("content") ?? "");

  const res = await fetch(
    "https://one4-sprint-mission-prisma.onrender.com/articles",
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    },
  );

  if (!res.ok) {
    throw new Error("게시글 수정에 실패했습니다");
  }

  revalidatePath("/articles");
  revalidatePath(`/articles/${articleId}`);
  redirect(`/articles/${articleId}`);
}
