"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createArticle(formData) {
  const title = formData.get("title");
  const content = formData.get("content");
  const res = await fetch(`${process.env.API_URL}/articles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });

  if (!res.ok) {
    throw new Error("게시글 작성에 실패했습니다.");
  }

  const { id } = await res.json();

  revalidatePath("/posts");

  redirect(`/posts/${id}`);
}

export async function updateArticle(articleId, formData) {
  const title = formData.get("title");
  const content = formData.get("content");

  const res = await fetch(`${process.env.API_URL}/articles/${articleId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });

  if (!res.ok) {
    throw new Error("게시글 수정에 실패했습니다.");
  }

  revalidatePath(`/posts/${articleId}`);
  redirect(`/posts/${articleId}`);
}

export async function deleteArticle(articleId) {
  const res = await fetch(`${process.env.API_URL}/articles/${articleId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("게시글 삭제에 실패했습니다.");
  }

  revalidatePath("/posts");

  redirect("/posts");
}

export async function createComment(articleId, formData) {
  const content = formData.get("content");

  const res = await fetch(
    `${process.env.API_URL}/articles/${articleId}/comments`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    },
  );
  if (!res.ok) {
    throw new Error("댓글 등록에 실패했습니다.");
  }

  revalidatePath(`/posts/${articleId}`);
}

export async function updateComment(articleId, commentId, formData) {
  const content = formData.get("content");
  const res = await fetch(
    `${process.env.API_URL}/articles/${articleId}/comments/${commentId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    },
  );

  if (!res.ok) {
    throw new Error("댓글 수정에 실패했습니다.");
  }

  revalidatePath(`/posts/${articleId}`);
}

export async function deleteComment(articleId, commentId) {
  const res = await fetch(
    `${process.env.API_URL}/articles/${articleId}/comments/${commentId}`,
    {
      method: "DELETE",
    },
  );

  if (!res.ok) {
    throw new Error("댓글 삭제에 실패했습니다.");
  }

  revalidatePath(`/posts/${articleId}`);
}
