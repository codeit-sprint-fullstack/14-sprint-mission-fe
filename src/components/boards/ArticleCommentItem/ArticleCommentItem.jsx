"use client";

import CommentItem from "@/components/comments/CommentItem/CommentItem";
import { DEFAULT_NICKNAME } from "@/constants/board";
import useAsyncAction from "@/hooks/useAsyncAction";
import { deleteArticleComment, updateArticleComment } from "@/lib/commentApi";
import { useRouter } from "next/navigation";

export default function ArticleCommentItem({ comment }) {
  const router = useRouter();

  const {
    execute: executeUpdate,
    isLoading: isUpdating,
    errorMessage: updateErrorMessage,
    clearError: clearUpdateError,
  } = useAsyncAction("댓글을 수정하지 못했습니다. 잠시 후 다시 시도해 주세요.");

  const {
    execute: executeDelete,
    isLoading: isDeleting,
    errorMessage: deleteErrorMessage,
    clearError: clearDeleteError,
  } = useAsyncAction("댓글을 삭제하지 못했습니다. 잠시 후 다시 시도해 주세요.");

  const handleEditStart = () => {
    clearUpdateError();
    clearDeleteError();
  };

  const handleUpdate = async (content) => {
    const result = await executeUpdate(() =>
      updateArticleComment(comment.id, content),
    );

    if (!result.success) return false;

    router.refresh();

    return true;
  };

  const handleDelete = async () => {
    if (isDeleting) return;

    const shouldDelete = window.confirm("댓글을 삭제하시겠습니까?");

    if (!shouldDelete) return;

    const result = await executeDelete(() => deleteArticleComment(comment.id));

    if (!result.success) return;

    router.refresh();
  };

  return (
    <CommentItem
      content={comment.content}
      createdAt={comment.createdAt}
      nickname={DEFAULT_NICKNAME}
      canManage
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      onEditStart={handleEditStart}
      isUpdating={isUpdating}
      updateErrorMessage={updateErrorMessage}
      deleteErrorMessage={deleteErrorMessage}
    />
  );
}
