"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ActionDropdown from "@/components/ActionDropdown";
import styles from "./detail.module.css";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import { authFetch } from "@/utils/authFetch";

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

export default function ProductInquirySection({
  productId,
  initialInquiries = [],
}) {
  const [inquiries, setInquiries] = useState(initialInquiries);

  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [editSubmitting, setEditSubmitting] = useState(false);

  const [deleteTargetId, setDeleteTargetId] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!content.trim() || submitting) return;

    setSubmitting(true);

    try {
      const res = await authFetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${productId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: content.trim(),
          }),
        },
      );

      if (!res.ok) {
        throw new Error("문의 등록 실패");
      }

      const newInquiry = await res.json();

      setInquiries((prev) => [newInquiry, ...prev]);
      setContent("");
    } catch (error) {
      if (error.message !== "인증 만료") {
        alert("문의 등록에 실패했어요. 다시 시도해주세요.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  function handleDelete(id) {
    setDeleteTargetId(id);
  }

  function handleDeleteCancel() {
    setDeleteTargetId(null);
  }

  async function handleDeleteConfirm() {
    const id = deleteTargetId;
    if (!id) return;

    try {
      const res = await authFetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/comments/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) {
        throw new Error("문의 삭제 실패");
      }

      setInquiries((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      if (error.message !== "인증 만료") {
        alert("문의 삭제에 실패했어요. 다시 시도해주세요.");
      }
    } finally {
      setDeleteTargetId(null);
    }
  }

  function handleEditStart(inquiry) {
    setEditingId(inquiry.id);
    setEditContent(inquiry.content);
  }

  function handleEditCancel() {
    setEditingId(null);
    setEditContent("");
  }

  async function handleEditSave(id) {
    if (!editContent.trim() || editSubmitting) return;

    setEditSubmitting(true);

    try {
      const res = await authFetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/comments/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: editContent.trim(),
          }),
        },
      );

      if (!res.ok) {
        throw new Error("문의 수정 실패");
      }

      const updatedInquiry = await res.json();

      setInquiries((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, ...updatedInquiry } : item,
        ),
      );

      setEditingId(null);
      setEditContent("");
    } catch (error) {
      if (error.message !== "인증 만료") {
        alert("문의 수정에 실패했어요. 다시 시도해주세요.");
      }
    } finally {
      setEditSubmitting(false);
    }
  }

  return (
    <section className={styles.inquirySection}>
      <ConfirmDeleteModal
        isOpen={!!deleteTargetId}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />

      <h3 className={styles.inquiryTitle}>문의하기</h3>

      <form className={styles.inquiryForm} onSubmit={handleSubmit}>
        <textarea
          className={styles.inquiryInput}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          type="submit"
          className={styles.inquiryButton}
          disabled={!content.trim() || submitting}
        >
          {submitting ? "등록 중..." : "등록"}
        </button>
      </form>

      {inquiries.length > 0 ? (
        <ul className={styles.inquiryList}>
          {inquiries.map((item) => (
            <li key={item.id} className={styles.inquiryItem}>
              {editingId === item.id ? (
                <>
                  <div className={styles.inquiryEditContent}>
                    <textarea
                      className={styles.inquiryInput}
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      autoFocus
                    />
                  </div>

                  <div className={styles.inquiryEditFooter}>
                    <div className={styles.inquiryWriter}>
                      <Image
                        src={
                          item.writer?.image || "/images/board/ic_profile.svg"
                        }
                        alt=""
                        width={32}
                        height={32}
                      />

                      <div>
                        <p>{item.writer?.nickname || "작성자"}</p>
                        <span>{formatRelativeTime(item.createdAt)}</span>
                      </div>
                    </div>

                    <div className={styles.inquiryEditActions}>
                      <button
                        type="button"
                        onClick={handleEditCancel}
                        disabled={editSubmitting}
                      >
                        취소
                      </button>

                      <button
                        type="button"
                        className={styles.inquiryButton}
                        onClick={() => handleEditSave(item.id)}
                        disabled={!editContent.trim() || editSubmitting}
                      >
                        {editSubmitting ? "수정 중..." : "수정완료"}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.inquiryTop}>
                    <p className={styles.inquiryContent}>{item.content}</p>

                    <ActionDropdown
                      onEdit={() => handleEditStart(item)}
                      onDelete={() => handleDelete(item.id)}
                    />
                  </div>

                  <div className={styles.inquiryWriter}>
                    <Image
                      src={item.writer?.image || "/images/board/ic_profile.svg"}
                      alt=""
                      width={32}
                      height={32}
                    />

                    <div>
                      <p>{item.writer?.nickname || "작성자"}</p>
                      <span>{formatRelativeTime(item.createdAt)}</span>
                    </div>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.emptyCommentContainer}>
          <div className={styles.emptyCommentWrapper}>
            <Image
              src="/images/icons/ic_empty_comment.svg"
              alt=""
              className={styles.emptyIcon}
              width={133}
              height={124}
            />

            <p className={styles.emptyComment}>아직 문의가 없어요</p>
          </div>

          <Link href="/items" className={styles.backToListButton}>
            목록으로 돌아가기
            <Image
              src="/images/board/ic_back.svg"
              alt=""
              width={24}
              height={24}
            />
          </Link>
        </div>
      )}
    </section>
  );
}
