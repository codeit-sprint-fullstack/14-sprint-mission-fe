"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DEFAULT_PROFILE_IMAGE } from "@/constant/board";
import ActionDropdown from "../../../components/ActionDropdown";
import styles from "./detail.module.css";
import { getFallbackNickname } from "@/utils/nickname";

function formatRelativeTime(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);

  if (diffSec < 60) return "방금 전";
  if (diffMin < 60) return `${diffMin}분 전`;
  if (diffHour < 24) return `${diffHour}시간 전`;

  return date.toLocaleDateString("ko-KR");
}

function getAuthHeader() {
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export default function CommentSection({ articleId, initialComments }) {
  const [comments, setComments] = useState(initialComments ?? []);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [editSubmitting, setEditSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!content.trim() || submitting) return;

    setSubmitting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/${articleId}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", ...getAuthHeader() },
          body: JSON.stringify({ content }),
        },
      );
      if (!res.ok) throw new Error("댓글 등록 실패");
      const newComment = await res.json();
      setComments((prev) => [newComment, ...prev]);
      setContent("");
    } catch (err) {
      alert("댓글 등록에 실패했어요. 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(commentId) {
    if (!confirm("댓글을 삭제하시겠어요?")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/comments/${commentId}`,
        { method: "DELETE", headers: { ...getAuthHeader() } },
      );
      if (!res.ok) throw new Error("댓글 삭제 실패");
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (err) {
      alert("댓글 삭제에 실패했어요. 다시 시도해주세요.");
    }
  }

  function handleEditStart(comment) {
    setEditingId(comment.id);
    setEditContent(comment.content);
  }

  function handleEditCancel() {
    setEditingId(null);
    setEditContent("");
  }

  async function handleEditSave(commentId) {
    if (!editContent.trim() || editSubmitting) return;

    setEditSubmitting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/comments/${commentId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json", ...getAuthHeader() },
          body: JSON.stringify({ content: editContent }),
        },
      );
      if (!res.ok) throw new Error("댓글 수정 실패");
      const updatedComment = await res.json();
      setComments((prev) =>
        prev.map((c) => (c.id === commentId ? { ...c, ...updatedComment } : c)),
      );
      setEditingId(null);
      setEditContent("");
    } catch (err) {
      alert("댓글 수정에 실패했어요. 다시 시도해주세요.");
    } finally {
      setEditSubmitting(false);
    }
  }

  return (
    <section className={styles.commentSection}>
      <h3 className={styles.commentSectionTitle}>댓글달기</h3>

      <form className={styles.commentForm} onSubmit={handleSubmit}>
        <textarea
          className={styles.commentTextarea}
          placeholder="댓글을 입력해주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="submit"
          className={styles.commentSubmitButton}
          disabled={!content.trim() || submitting}
        >
          등록
        </button>
      </form>

      {comments.length === 0 ? (
        <div className={styles.emptyCommentWrapper}>
          <Image
            src="/images/board/Img_reply_empty.svg"
            alt=""
            width={140}
            height={140}
          />
          <p className={styles.emptyComment}>
            아직 댓글이 없어요,
            <br />
            지금 댓글을 달아보세요!
          </p>
        </div>
      ) : (
        <ul className={styles.commentList}>
          {comments.map((comment) => (
            <li key={comment.id} className={styles.commentItem}>
              {editingId === comment.id ? (
                <>
                  <div className={styles.commentContentRow}>
                    <textarea
                      className={styles.commentTextarea}
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      autoFocus
                    />
                  </div>

                  <div className={styles.commentEditFooter}>
                    <div className={styles.commentMetaLeft}>
                      <Image
                        src={DEFAULT_PROFILE_IMAGE}
                        alt=""
                        width={32}
                        height={32}
                        className={styles.profileImage}
                      />
                      <span className={styles.commentAuthor}>
                        {comment.writer?.nickname ??
                          getFallbackNickname(comment.id)}
                      </span>
                      <span className={styles.commentDate}>
                        {formatRelativeTime(comment.createdAt)}
                      </span>
                    </div>

                    <div className={styles.commentEditActions}>
                      <button
                        type="button"
                        onClick={handleEditCancel}
                        disabled={editSubmitting}
                      >
                        취소
                      </button>
                      <button
                        type="button"
                        className={styles.commentSubmitButton}
                        onClick={() => handleEditSave(comment.id)}
                        disabled={!editContent.trim() || editSubmitting}
                      >
                        {editSubmitting ? "수정 중..." : "수정완료"}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.commentContentRow}>
                    <p className={styles.commentContent}>{comment.content}</p>
                    <ActionDropdown
                      onEdit={() => handleEditStart(comment)}
                      onDelete={() => handleDelete(comment.id)}
                    />
                  </div>

                  <div className={styles.commentMetaLeft}>
                    <Image
                      src={DEFAULT_PROFILE_IMAGE}
                      alt=""
                      width={32}
                      height={32}
                      className={styles.profileImage}
                    />
                    <span className={styles.commentAuthor}>
                      {comment.writer?.nickname ??
                        getFallbackNickname(comment.id)}
                    </span>
                    <span className={styles.commentDate}>
                      {formatRelativeTime(comment.createdAt)}
                    </span>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
