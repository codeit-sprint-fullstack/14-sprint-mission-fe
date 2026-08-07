import { useState } from "react";
import Image from "next/image";
import styles from "./CommentItem.module.css";
import formatTimeAgo from "@/lib/formatTimeAgo";

export default function CommentItem({ comment, onUpdate, onDelete }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  function handleStartEdit() {
    setEditedContent(comment.content);
    setIsEditing(true);
    setIsMenuOpen(false);
  }

  function handleCancelEdit() {
    setEditedContent(comment.content);
    setIsEditing(false);
  }

  async function handleUpdateComment(event) {
    event.preventDefault();

    const trimmedContent = editedContent.trim();

    if (!trimmedContent || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/comments/${comment.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: trimmedContent,
        }),
      });

      const updatedComment = await response.json();

      if (!response.ok) {
        throw new Error(updatedComment.message);
      }

      onUpdate(updatedComment);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteComment() {
    if (isDeleting) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/comments/${comment.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      onDelete(comment.id);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsDeleting(false);
    }
  }

  if (isEditing) {
    return (
      <div className={styles.commentItem}>
        <form className={styles.editForm} onSubmit={handleUpdateComment}>
          <textarea
            className={styles.editInput}
            value={editedContent}
            onChange={(event) => setEditedContent(event.target.value)}
          />

          <div className={styles.commentBottom}>
            <div className={styles.authorInfo}>
              <Image
                src="/images/default_profile.png"
                alt="댓글 작성자 기본 프로필 이미지"
                width={18}
                height={18}
              />

              <div>
                <p className={styles.nickname}>똑똑한판다</p>

                <p className={styles.date}>
                  {formatTimeAgo(comment.createdAt)}
                </p>
              </div>
            </div>

            <div className={styles.editButtons}>
              <button
                className={styles.cancelButton}
                type="button"
                onClick={handleCancelEdit}
              >
                취소
              </button>

              <button
                className={styles.updateButton}
                type="submit"
                disabled={!editedContent.trim() || isSubmitting}
              >
                {isSubmitting ? "수정 중..." : "수정 완료"}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className={styles.commentItem}>
      <div className={styles.commentHeader}>
        <p className={styles.content}>{comment.content}</p>

        <div className={styles.menuWrapper}>
          <button
            className={styles.menuButton}
            type="button"
            aria-label="댓글 메뉴 열기"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Image
              src="/images/menu_button.png"
              alt=""
              width={24}
              height={24}
            />
          </button>

          {isMenuOpen && (
            <div className={styles.menu}>
              <button
                className={styles.menuItem}
                type="button"
                onClick={handleStartEdit}
              >
                수정하기
              </button>

              <button
                className={styles.menuItem}
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteComment}
              >
                삭제하기
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={styles.authorInfo}>
        <Image
          src="/images/default_profile.png"
          alt="댓글 작성자 기본 프로필 이미지"
          width={18}
          height={18}
        />

        <div>
          <p className={styles.nickname}>똑똑한판다</p>

          <p className={styles.date}>{formatTimeAgo(comment.createdAt)}</p>
        </div>
      </div>
    </div>
  );
}
