'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import formatDate from '@/utils/formatDate'
import styles from '@/app/(with-layout)/boards/[id]/articleDetailPage.module.css'

function ArticleDetailPage() {
  const { id: articleId } = useParams()
  const [article, setArticle] = useState(null)
  const [comments, setComments] = useState([])

  useEffect(() => {
    if (!articleId) return

    async function getArticle() {
      try {
        const res = await fetch(`/api/articles/${articleId}`)
        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.message)
        }

        setArticle(data)
      } catch (error) {
        console.error(error)
        alert('게시글을 불러오지 못했습니다.')
      }
    }

    getArticle()
  }, [articleId])

  useEffect(() => {
    if (!articleId) return

    async function getComments() {
      try {
        const res = await fetch(`/api/articles/${articleId}/comments`)
        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.message)
        }

        setComments(data.list)
      } catch (error) {
        console.error(error)
        alert('댓글을 불러오지 못했습니다.')
      }
    }

    getComments()
  }, [articleId])

  return (
    <main className={styles.articleDetailPage}>
      <section className={styles.articleSection}>
        <p className={styles.articleTitle}>{article?.title}</p>
        <div className={styles.articleMeta}>
          <div className={styles.articleUser}>
            <Image
              className={styles.articleUserProfile}
              src="/ic_profile.svg"
              alt="프로필 사진"
              width={40}
              height={40}
            />
            <div className={styles.articleUserInfo}>
              <span className={styles.articleUserNickname}>
                둥근해저거또떴네
              </span>
              <span className={styles.articleCreatedAt}>
                {article?.createdAt ? formatDate(article.createdAt) : ''}
              </span>
            </div>
          </div>
          <div className={styles.articleFavoriteChip}>
            <Image
              className={styles.emptyHeartIcon}
              src="/ic_empty_heart.svg"
              width={32}
              height={32}
            />
            <span className={styles.articleFavoriteCount}>276</span>
          </div>
          <p className={styles.articleContent}>{article?.content}</p>
        </div>
      </section>
      <section className={styles.commentRegistrationSection}>
        <h3 className={styles.commentRegistrationSectionLabel}>댓글달기</h3>
        <textarea
          className={styles.commentRegistrationcontent}
          placeholder="댓글을 입력해주세요."
        />
        <button className={styles.commentRegistrationButton}>등록</button>
      </section>
      <section className={styles.emptyCommentSection}>
        <Image
          className={styles.emptyCommentImg}
          src="/img_reply_empty.png"
          alt=""
          width={140}
          height={140}
        />
        <p className={styles.emptyCommentMessage}>
          아직 댓글이 없어요, <br />
          지금 댓글을 달아보세요!
        </p>
      </section>
      <section className={styles.commentsSection}>
        <div className={styles.commentsList}>댓글카드 컴포넌트 자리</div>
      </section>
      <Link className={styles.goBackBoardButton} href="/boards">
        <span className={styles.goBackBoeardText}>목록으로 돌아가기</span>
        <Image
          className={styles.backIcon}
          src="ic_back.svg"
          alt=""
          width={24}
          height={24}
        />
      </Link>
    </main>
  )
}

export default ArticleDetailPage
