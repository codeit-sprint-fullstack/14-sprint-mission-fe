//게시글 상세페이지 댓글 담당(댓글 목록, 작성, 수정, 삭제)
import Image from "next/image";
import { useState } from "react";

import {
  createArticleComment,
  deleteArticleComment,
  updateArticleComment,
} from "@/lib/api/articles";
import { formatDate, getMockMetadata } from "@/lib/articles/presentation";
import styles from "@/styles/ArticleDetailPage.module.css";

export default function CommentSection({ articleId, initialComments }) {
  const [comments, setComments] = useState(initialComments);
  const [commentContent, setCommentContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingCommentId, setPendingCommentId] = useState(null);
  const [error, setError] = useState("");
  const canSubmitComment = commentContent.trim() !== "" && !isSubmitting;

  async function handleCreateComment(event) {
    event.preventDefault();

    if (!canSubmitComment) {
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const comment = await createArticleComment(
        articleId,
        commentContent.trim(),
      );
      setComments((currentComments) => [comment, ...currentComments]);
      setCommentContent("");
    } catch (createError) {
      setError(createError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  function startEditing(comment) {
    setEditingId(comment.id);
    setEditingContent(comment.content);
  }

  async function handleUpdateComment(commentId) {
    const content = editingContent.trim();

    if (!content) {
      return;
    }

    setPendingCommentId(commentId);
    setError("");

    try {
      const updatedComment = await updateArticleComment(commentId, content);
      setComments((currentComments) =>
        currentComments.map((comment) =>
          comment.id === commentId ? updatedComment : comment,
        ),
      );
      setEditingId(null);
      setEditingContent("");
    } catch (updateError) {
      setError(updateError.message);
    } finally {
      setPendingCommentId(null);
    }
  }

  async function handleDeleteComment(commentId) {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) {
      return;
    }

    setPendingCommentId(commentId);
    setError("");

    try {
      await deleteArticleComment(commentId);
      setComments((currentComments) =>
        currentComments.filter((comment) => comment.id !== commentId),
      );
    } catch (deleteError) {
      setError(deleteError.message);
    } finally {
      setPendingCommentId(null);
    }
  }

  return (
    <section className={styles.commentsSection}>
      <h2 className={styles.commentsHeading}>댓글달기</h2>
      <form className={styles.commentForm} onSubmit={handleCreateComment}>
        <textarea
          value={commentContent}
          onChange={(event) => setCommentContent(event.target.value)}
          placeholder="댓글을 입력해주세요."
        />
        <button type="submit" disabled={!canSubmitComment}>
          {isSubmitting ? "등록 중" : "등록"}
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      {comments.length === 0 ? (
        <div className={styles.emptyComments}>
          <Image
            className={styles.emptyImage}
            src="/images/Img_reply_empty.png"
            alt=""
            width={120}
            height={120}
          />
          <p>아직 댓글이 없어요.</p>
          <p>지금 댓글을 달아보세요!</p>
        </div>
      ) : (
        <ul className={styles.commentList}>
          {comments.map((comment) => {
            const commentMetadata = getMockMetadata(comment.id);
            const isPending = pendingCommentId === comment.id;

            return (
              <li className={styles.commentItem} key={comment.id}>
                {editingId === comment.id ? (
                  <div className={styles.editForm}>
                    <textarea
                      value={editingContent}
                      onChange={(event) =>
                        setEditingContent(event.target.value)
                      }
                    />
                    <div className={styles.editActions}>
                      <button type="button" onClick={() => setEditingId(null)}>
                        취소
                      </button>
                      <button
                        type="button"
                        disabled={!editingContent.trim() || isPending}
                        onClick={() => handleUpdateComment(comment.id)}
                      >
                        수정
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className={styles.commentContent}>{comment.content}</p>
                    <div className={styles.commentMetadata}>
                      <Image
                        className={styles.commentAvatar}
                        src="/images/user-profile.svg"
                        alt=""
                        width={40}
                        height={40}
                      />
                      <div className={styles.commentAuthorInfo}>
                        <span>{commentMetadata.nickname}</span>
                        <time dateTime={comment.createdAt}>
                          {formatDate(comment.createdAt)}
                        </time>
                      </div>
                    </div>
                    <details className={styles.commentMenu}>
                      <summary aria-label="댓글 메뉴">⋮</summary>
                      <div className={styles.menuPanel}>
                        <button
                          type="button"
                          onClick={() => startEditing(comment)}
                        >
                          수정하기
                        </button>
                        <button
                          type="button"
                          disabled={isPending}
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          삭제하기
                        </button>
                      </div>
                    </details>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
