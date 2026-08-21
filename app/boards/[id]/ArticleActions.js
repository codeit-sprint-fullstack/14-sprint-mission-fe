"use client";

import { useRouter } from "next/navigation";
import ActionDropdown from "./ActionDropdown";

export default function ArticleActions({ articleId }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("게시글을 삭제하시겠어요?")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/${articleId}`,
        { method: "DELETE" },
      );
      if (!res.ok) throw new Error("게시글 삭제 실패");
      router.push("/boards");
    } catch (err) {
      alert("게시글 삭제에 실패했어요. 다시 시도해주세요.");
    }
  }

  return (
    <ActionDropdown
      onEdit={() => router.push(`/boards/${articleId}/edit`)}
      onDelete={handleDelete}
    />
  );
}