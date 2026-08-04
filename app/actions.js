"use server";

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
    throw new Error("게시글 등록 실패했습니다");
  }

  const article = await res.json();
  redirect(`/articles/${article.id}`);
}
