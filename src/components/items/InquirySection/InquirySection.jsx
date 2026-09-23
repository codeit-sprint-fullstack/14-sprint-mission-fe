"use client";

import CommentForm from "@/components/comments/CommentForm/CommentForm";
import CommentItem from "@/components/comments/CommentItem/CommentItem";
import ConfirmModal from "@/components/ConfirmModal/ConfirmModal";
import useProductComments from "@/hooks/useProductComments";
import { getApiErrorMessage } from "@/lib/apiError";
import Image from "next/image";
import { useState } from "react";
import styles from "./InquirySection.module.css";

export default function InquirySection({ productId, currentUserId }) {
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const {
    comments,
    isPending,
    isError,
    commentsError,

    handleCreateComment,
    isCreating,
    isCreateError,
    createError,

    handleUpdateComment,
    isUpdating,
    isUpdateError,
    updateError,
    updatingComment,

    handleDeleteComment,
    isDeleting,
    isDeleteError,
    deleteError,
    deletingCommentId,
  } = useProductComments(productId);

  const handleConfirmDelete = async () => {
    if (deleteTargetId === null) return;

    await handleDeleteComment(deleteTargetId);
    setDeleteTargetId(null);
  };

  const commentsErrorMessage = getApiErrorMessage(
    commentsError,
    "문의 목록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.",
  );

  const createErrorMessage = getApiErrorMessage(
    createError,
    "문의를 등록하지 못했습니다. 잠시 후 다시 시도해 주세요.",
  );

  const updateErrorMessage = getApiErrorMessage(
    updateError,
    "문의를 수정하지 못했습니다. 잠시 후 다시 시도해 주세요.",
  );

  const deleteErrorMessage = getApiErrorMessage(
    deleteError,
    "문의를 삭제하지 못했습니다. 잠시 후 다시 시도해 주세요.",
  );

  return (
    <section className={styles.inquirySection}>
      <CommentForm
        title="문의하기"
        placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
        onSubmit={handleCreateComment}
        isLoading={isCreating}
        errorMessage={isCreateError ? createErrorMessage : ""}
      />

      {isPending && <p>문의 목록을 불러오는 중입니다.</p>}

      {isError && <p>{commentsErrorMessage}</p>}

      {!isPending && !isError && comments.length === 0 && (
        <div className={styles.emptyState}>
          <Image
            src="/images/Img_inquiry_empty.png"
            alt=""
            width={196}
            height={196}
          />
          <p className={styles.emptyText}>아직 문의가 없어요</p>
        </div>
      )}

      {!isPending && !isError && comments.length > 0 && (
        <div className={styles.commentList}>
          {comments.map((comment) => {
            const canManage = comment.owner.id === currentUserId;

            return (
              <CommentItem
                key={comment.id}
                content={comment.content}
                createdAt={comment.createdAt}
                nickname={comment.owner.nickname}
                profileImageSrc={comment.owner.image}
                canManage={canManage}
                onUpdate={(content) => handleUpdateComment(comment.id, content)}
                onDelete={() => setDeleteTargetId(comment.id)}
                isUpdating={
                  isUpdating && updatingComment?.commentId === comment.id
                }
                updateErrorMessage={
                  isUpdateError && updatingComment?.commentId === comment.id
                    ? updateErrorMessage
                    : ""
                }
                deleteErrorMessage={
                  isDeleteError && deletingCommentId === comment.id
                    ? deleteErrorMessage
                    : ""
                }
              />
            );
          })}
        </div>
      )}

      <ConfirmModal
        isOpen={deleteTargetId !== null}
        message="정말로 문의를 삭제하시겠어요?"
        onCancel={() => setDeleteTargetId(null)}
        onConfirm={handleConfirmDelete}
        isPending={isDeleting}
      />
    </section>
  );
}
