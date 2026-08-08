"use client";

import Image from "next/image";
import styles from "./CommentItem.module.css";
import { formatRelativeTime } from "@/lib/dateUtils";
import Dropdown from "@/components/Dropdown/Dropdown";
import { useState } from "react";
import Button from "@/components/Button/Button";
import { deleteArticleComment, updateArticleComment } from "@/lib/commentApi";
import { useRouter } from "next/navigation";
import useAsyncAction from "@/hooks/useAsyncAction";

export default function CommentItem({ comment }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
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

  const isEditEmpty = editContent.trim() === "";

  const menuOptions = [
    { label: "수정하기", value: "edit" },
    { label: "삭제하기", value: "delete" },
  ];

  const handleDelete = async () => {
    if (isDeleting) return;

    const shouldDelete = window.confirm("댓글을 삭제하시겠습니까?");

    if (!shouldDelete) return;

    const result = await executeDelete(() => deleteArticleComment(comment.id));

    if (!result.success) return;

    router.refresh();
  };

  const handleMenuChange = (value) => {
    if (value === "edit") {
      clearUpdateError();
      clearDeleteError();
      setEditContent(comment.content);
      setIsEditing(true);
    }

    if (value === "delete") {
      handleDelete();
    }
  };

  const handleCancel = () => {
    setEditContent(comment.content);
    setIsEditing(false);
  };

  const handleUpdate = async () => {
    if (isEditEmpty || isUpdating) return;

    const result = await executeUpdate(() =>
      updateArticleComment(comment.id, editContent.trim()),
    );

    if (!result.success) return;

    setIsEditing(false);
    router.refresh();
  };

  return (
    <article className={styles.comment}>
      <div className={styles.top}>
        {isEditing ? (
          <textarea
            className={styles.editTextarea}
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
        ) : (
          <p className={styles.content}>{comment.content}</p>
        )}

        {!isEditing && (
          <Dropdown
            options={menuOptions}
            variant="menu"
            onChange={handleMenuChange}
          />
        )}
      </div>

      {isEditing && updateErrorMessage && (
        <p className={styles.errorMessage} role="alert">
          {updateErrorMessage}
        </p>
      )}

      {!isEditing && deleteErrorMessage && (
        <p className={styles.errorMessage} role="alert">
          {deleteErrorMessage}
        </p>
      )}

      <div className={styles.bottom}>
        <div className={styles.meta}>
          <Image src="/images/ic_profile.svg" alt="" width={32} height={32} />

          <div className={styles.author}>
            <span className={styles.nickname}>잘하고 싶다</span>
            <time className={styles.date}>
              {formatRelativeTime(comment.createdAt)}
            </time>
          </div>
        </div>

        {isEditing && (
          <div className={styles.editActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleCancel}
            >
              취소
            </button>

            <Button
              type="button"
              disabled={isEditEmpty || isUpdating}
              onClick={handleUpdate}
            >
              수정 완료
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}
