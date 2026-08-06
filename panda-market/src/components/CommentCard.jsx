'use client'

import { useState } from 'react'
import Image from 'next/image'
import formatDate from '@/utils/formatDate'
import styles from './CommentCard.module.css'

function CommentCard({ comment, getComments }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(comment.content)

  function handleMenuToggle() {
    setIsMenuOpen((prev) => !prev)
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
          />

          <div className={styles.commentEditActions}>
            <button
              className={styles.updateCommentButton}
              type="button"
              onClick={onUpdateComment}
              disabled={!editedContent.trim()}
            >
              저장
            </button>

            <button
              className={styles.cancelEditCommentButton}
              type="button"
              onClick={() => {
                setEditedContent(comment.content)
                setIsEditing(false)
              }}
            >
              취소
            </button>
          </div>
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
            <span className={styles.commentCreatedAt}>
              {formatDate(comment.createdAt)}
            </span>
          </div>
        </div>

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
                className={styles.editComment}
                type="button"
                onClick={() => {
                  setIsEditing(true)
                  setIsMenuOpen(false)
                }}
              >
                수정하기
              </button>

              <button
                className={styles.deleteComment}
                type="button"
                onClick={onDeleteComment}
              >
                삭제하기
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default CommentCard
