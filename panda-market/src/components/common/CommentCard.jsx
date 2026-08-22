'use client'

import { useState } from 'react'
import Image from 'next/image'
import EditDeleteMenu from '@/components/common/EditDeleteMenu'
import formatRelativeTime from '@/utils/formatRelativeTime'
import styles from '@/components/common/CommentCard.module.css'

function CommentCard({
  comment,
  isAuthor,
  isEditing,
  onStartEdit,
  onCancelEdit,
  onUpdate,
  onDelete,
  isUpdating = false,
  isDeleting = false,
}) {
  const [editedContent, setEditedContent] = useState(comment.content)

  function onCancelEditComment() {
    setEditedContent(comment.content)
    onCancelEdit()
  }

  function onUpdateComment() {
    if (!editedContent.trim() || isUpdating) return

    onUpdate(comment.id, editedContent.trim())
  }

  function onDeleteComment() {
    if (isDeleting) return

    const isConfirmed = window.confirm('댓글을 삭제하시겠습니까?')

    if (!isConfirmed) return

    onDelete(comment.id)
  }

  return (
    <article
      className={`${styles.commentCard} ${
        isEditing ? styles.commentCardEditing : ''
      }`}
    >
      {isEditing ? (
        <div className={styles.commentEditArea}>
          <textarea
            className={styles.commentEditTextarea}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            aria-label="댓글 수정 내용"
          />
        </div>
      ) : (
        <p className={styles.commentContent}>{comment.content}</p>
      )}

      <div className={styles.commentBottom}>
        <div className={styles.commentUser}>
          <Image
            className={styles.commentUserProfile}
            src={comment.writer.image || '/ic_profile.svg'}
            alt="프로필 사진"
            width={32}
            height={32}
          />

          <div className={styles.commentUserInfo}>
            <span className={styles.commentUserNickname}>
              {comment.writer.nickname}
            </span>

            <time
              className={styles.commentCreatedAt}
              dateTime={comment.createdAt}
            >
              {formatRelativeTime(comment.createdAt)}
            </time>
          </div>
        </div>

        {isEditing ? (
          <div className={styles.commentEditActions}>
            <button
              className={styles.commentCancelButton}
              type="button"
              onClick={onCancelEditComment}
              disabled={isUpdating}
            >
              취소
            </button>

            <button
              className={styles.commentUpdateButton}
              type="button"
              onClick={onUpdateComment}
              disabled={!editedContent.trim() || isUpdating}
            >
              {isUpdating ? '수정 중...' : '수정 완료'}
            </button>
          </div>
        ) : (
          isAuthor && (
            <div className={styles.commentMenu}>
              <EditDeleteMenu
                onEdit={() => {
                  setEditedContent(comment.content)
                  onStartEdit(comment.id)
                }}
                onDelete={onDeleteComment}
                disabled={isDeleting}
                menuButtonAriaLabel="댓글 메뉴 열기"
              />
            </div>
          )
        )}
      </div>
    </article>
  )
}

export default CommentCard
