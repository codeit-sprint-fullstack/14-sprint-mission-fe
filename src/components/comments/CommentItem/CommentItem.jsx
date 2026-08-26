"use client";

import Button from "@/components/Button/Button";
import Dropdown from "@/components/Dropdown/Dropdown";
import { formatRelativeTime } from "@/lib/dateUtils";
import { useState } from "react";
import styles from "./CommentItem.module.css";

const DEFAULT_PROFILE_IMAGE = "/images/ic_profile.svg";

export default function CommentItem({
  content,
  createdAt,
  nickname,
  profileImageSrc = DEFAULT_PROFILE_IMAGE,
  canManage = false,
  onUpdate,
  onDelete,
  onEditStart,
  isUpdating = false,
  updateErrorMessage = "",
  deleteErrorMessage = "",
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);

  const isEditEmpty = editContent.trim() === "";

  const menuOptions = [
    { label: "수정하기", value: "edit" },
    { label: "삭제하기", value: "delete" },
  ];

  const handleMenuChange = (value) => {
    if (value === "edit") {
      onEditStart?.();
      setEditContent(content);
      setIsEditing(true);
    }

    if (value === "delete") {
      onDelete?.();
    }
  };

  const handleCancel = () => {
    setEditContent(content);
    setIsEditing(false);
  };

  const handleUpdate = async () => {
    if (isEditEmpty || isUpdating) return;

    const isSuccess = await onUpdate(editContent.trim());

    if (!isSuccess) return;

    setIsEditing(false);
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
          <p className={styles.content}>{content}</p>
        )}

        {!isEditing && canManage && (
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profileImageSrc || DEFAULT_PROFILE_IMAGE}
            alt=""
            width={32}
            height={32}
            onError={(e) => {
              e.currentTarget.src = DEFAULT_PROFILE_IMAGE;
            }}
          />

          <div className={styles.author}>
            <span className={styles.nickname}>{nickname}</span>
            <time className={styles.date}>{formatRelativeTime(createdAt)}</time>
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
