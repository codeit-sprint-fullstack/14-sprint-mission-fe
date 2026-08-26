"use client";

import CommentForm from "@/components/comments/CommentForm/CommentForm";
import useAsyncAction from "@/hooks/useAsyncAction";
import { createArticleComment } from "@/lib/commentApi";
import { useRouter } from "next/navigation";

export default function ArticleCommentForm({ articleId }) {
  const router = useRouter();

  const { execute, isLoading, errorMessage } = useAsyncAction(
    "댓글을 등록하지 못했습니다. 잠시 후 다시 시도해 주세요.",
  );

  const handleSubmit = async (content) => {
    const result = await execute(() =>
      createArticleComment(articleId, content),
    );

    if (!result.success) return false;

    router.refresh();

    return true;
  };

  return (
    <CommentForm
      title="댓글 달기"
      placeholder="댓글을 입력해 주세요."
      onSubmit={handleSubmit}
      isLoading={isLoading}
      errorMessage={errorMessage}
    />
  );
}
