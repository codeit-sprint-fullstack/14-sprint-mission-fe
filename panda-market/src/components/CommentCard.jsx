'use client'

import { useState } from 'react'
import Image from 'next/image'
import formatRelativeTime from '@/utils/formatRelativeTime'
import styles from './CommentCard.module.css'

function CommentCard({ comment, getComments }) {
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
    if (!editedContent.trim()) return

    try {
      const res = await fetch(`/api/comments/${comment.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: editedContent.trim(),
        }),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.message)
      }

      setIsEditing(false)
      await getComments()
    } catch (error) {
      console.error(error)
      alert('댓글 수정에 실패했습니다.')
    }
  }

  async function onDeleteComment() {
    const isConfirmed = window.confirm('댓글을 삭제하시겠습니까?')

    if (!isConfirmed) return

    try {
      const res = await fetch(`/api/comments/${comment.id}`, {
        method: 'DELETE',
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.message)
      }

      await getComments()
    } catch (error) {
      console.error(error)
      alert('댓글 삭제에 실패했습니다.')
    }
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
            src="/ic_profile.svg"
            alt="프로필 사진"
            width={32}
            height={32}
          />

          <div className={styles.commentUserInfo}>
            <span className={styles.commentUserNickname}>
              생갈치1호의행방불명
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
            >
              취소
            </button>

            <button
              className={styles.commentUpdateButton}
              type="button"
              onClick={onUpdateComment}
              disabled={!editedContent.trim()}
            >
              수정 완료
            </button>
          </div>
        ) : (
          <div className={styles.commentMenu}>
            <button
              className={styles.commentMenuButton}
              type="button"
              onClick={handleMenuToggle}
              aria-label="댓글 메뉴 열기"
              aria-expanded={isMenuOpen}
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
                >
                  수정하기
                </button>

                <button
                  className={styles.commentDeleteButton}
                  type="button"
                  onClick={onDeleteComment}
                >
                  삭제하기
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

export default CommentCard
