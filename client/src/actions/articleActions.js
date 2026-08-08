"use server";

import { redirect } from "next/navigation";

// 게시글 생성
export async function createArticle(formData) {
  // 제출된 폼에서 제목과 내용 가져오기
  const title = formData.get("title");
  const content = formData.get("content");

  // 게시글 생성 API 요청
  const res = await fetch(`${process.env.API_BASE_URL}/articles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });

  if (!res.ok) {
    throw new Error("게시글 작성에 실패했습니다");
  }

  // 생성된 게시글의 상세 페이지로 이동
  const article = await res.json();
  redirect(`/articles/${article.id}`);
}

// 게시글 수정
export async function updateArticle(articleId, formData) {
  // 제출된 폼에서 제목과 내용 가져오기
  const title = formData.get("title");
  const content = formData.get("content");

  // 게시글 수정 API 요청
  const res = await fetch(`${process.env.API_BASE_URL}/articles/${articleId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });

  if (!res.ok) {
    throw new Error("게시글 수정에 실패했습니다");
  }

  // 수정된 게시글의 상세 페이지로 이동
  redirect(`/articles/${articleId}`);
}

// 게시글 삭제
export async function deleteArticle(articleId) {
  // 게시글 삭제 API 요청
  const res = await fetch(`${process.env.API_BASE_URL}/articles/${articleId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("게시글 삭제에 실패했습니다");
  }

  // 자유 게시판 페이지로 이동
  redirect("/articles");
}
