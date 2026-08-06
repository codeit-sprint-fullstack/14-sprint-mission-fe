'use client'

import { useState } from 'react'
import Image from 'next/image'
import formatDate from '@/utils/formatDate'
import styles from './CommentCard.module.css'

function CommentCard({ comment }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function handleMenuToggle() {
    setIsMenuOpen((prev) => !prev)
  }

  return (
    <article className={styles.commentCard}>
      <p className={styles.commentContent}>{comment.content}</p>

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
              <button type="button">수정하기</button>
              <button type="button">삭제하기</button>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default CommentCard
