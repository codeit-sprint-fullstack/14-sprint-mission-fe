'use client'

import { useState } from 'react'
import Image from 'next/image'
import formatRelativeTime from '@/utils/formatRelativeTime'
import styles from '@/components/common/CommentCard.module.css'

function CommentCard({
  comment,
  isAuthor,
  onUpdate,
  onDelete,
  isUpdating = false,
  isDeleting = false,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(comment.content)

  function handleMenuToggle() {
    setIsMenuOpen((prev) => !prev)
  }

  function onCancelEditComment() {
    setEditedContent(comment.content)
    setIsEditing(false)
  }

  async function onUpdateComment() {
    if (!editedContent.trim() || isUpdating) return

    await onUpdate(comment.id, editedContent.trim())
    setIsEditing(false)
  }

  function onDeleteComment() {
    if (isDeleting) return

    const isConfirmed = window.confirm('댓글을 삭제하시겠습니까?')

    if (!isConfirmed) return

    onDelete(comment.id)
  }

  return (
    <article className={styles.commentCard}>
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
              수정 완료
            </button>
          </div>
        ) : (
          isAuthor && (
            <div className={styles.commentMenu}>
              <button
                className={styles.commentMenuButton}
                type="button"
                onClick={handleMenuToggle}
                aria-label="댓글 메뉴 열기"
                aria-expanded={isMenuOpen}
                disabled={isDeleting}
              >
                <Image src="/ic_kebab.svg" alt="" width={24} height={24} />
              </button>

              {isMenuOpen && (
                <div className={styles.commentMenuDropdown}>
                  <button
                    className={styles.commentEditButton}
                    type="button"
                    onClick={() => {
                      setIsEditing(true)
                      setIsMenuOpen(false)
                    }}
                    disabled={isDeleting}
                  >
                    수정하기
                  </button>

                  <button
                    className={styles.commentDeleteButton}
                    type="button"
                    onClick={onDeleteComment}
                    disabled={isDeleting}
                  >
                    삭제하기
                  </button>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </article>
  )
}

export default CommentCard
