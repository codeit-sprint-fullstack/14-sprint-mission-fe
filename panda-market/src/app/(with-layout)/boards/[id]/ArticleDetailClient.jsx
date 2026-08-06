'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import formatDate from '@/utils/formatDate'
import CommentCard from '@/components/CommentCard'
import styles from '@/app/(with-layout)/boards/[id]/articleDetailPage.module.css'

function ArticleDetailClient({ article }) {
  const router = useRouter()

  const [comments, setComments] = useState([])
  const [commentContent, setCommentContent] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCommentsLoading, setIsCommentsLoading] = useState(true)
  const [commentsError, setCommentsError] = useState('')

  const articleId = article.id
  const articleURL = `/api/articles/${articleId}`

  function handleMenuToggle() {
    setIsMenuOpen((prev) => !prev)
  }

  async function getComments() {
    setIsCommentsLoading(true)
    setCommentsError('')

    try {
      const res = await fetch(`${articleURL}/comments`)
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message)
      }

      setComments(data.list)
    } catch (error) {
      console.error(error)
      setCommentsError('댓글을 불러오지 못했습니다.')
    } finally {
      setIsCommentsLoading(false)
    }
  }

  useEffect(() => {
    getComments()
  }, [articleId])

  async function onDeleteArticle() {
    const isConfirmed = window.confirm('게시글을 삭제하시겠습니까?')

    if (!isConfirmed) return

    try {
      const res = await fetch(articleURL, {
        method: 'DELETE',
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.message)
      }

      router.push('/boards')
    } catch (error) {
      console.error(error)
      alert('게시글 삭제에 실패했습니다.')
    }
  }

  async function onSubmitComment(e) {
    e.preventDefault()

    if (!commentContent.trim()) return

    try {
      const res = await fetch(`${articleURL}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: commentContent.trim(),
        }),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.message)
      }

      setCommentContent('')
      await getComments()
    } catch (error) {
      console.error(error)
      alert('댓글 등록에 실패했습니다.')
    }
  }

  return (
    <main className={styles.articleDetailPage}>
      <article className={styles.articleSection}>
        <header className={styles.articleHeader}>
          <h1 className={styles.articleTitle}>{article.title}</h1>

          <div className={styles.articleMenu}>
            <button
              className={styles.articleMenuButton}
              type="button"
              onClick={handleMenuToggle}
              aria-label="게시글 메뉴 열기"
              aria-expanded={isMenuOpen}
            >
              <Image src="/ic_kebab.svg" alt="" width={24} height={24} />
            </button>

            {isMenuOpen && (
              <div className={styles.articleMenuDropdown}>
                <Link
                  className={styles.articleUpdateButton}
                  href={`/boards/write?id=${articleId}`}
                >
                  수정하기
                </Link>

                <button
                  className={styles.articleDeleteButton}
                  type="button"
                  onClick={onDeleteArticle}
                >
                  삭제하기
                </button>
              </div>
            )}
          </div>
        </header>

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

              <time
                className={styles.articleCreatedAt}
                dateTime={article.createdAt}
              >
                {formatDate(article.createdAt)}
              </time>
            </div>
          </div>

          <div className={styles.articleFavoriteChip}>
            <Image
              className={styles.articleFavoriteIcon}
              src="/ic_empty_heart.svg"
              alt=""
              width={32}
              height={32}
            />

            <span className={styles.articleFavoriteCount}>276</span>
          </div>

          <p className={styles.articleContent}>{article.content}</p>
        </div>
      </article>

      <form
        className={styles.commentRegistrationForm}
        onSubmit={onSubmitComment}
      >
        <h2 className={styles.commentFormTitle}>댓글달기</h2>

        <textarea
          className={styles.commentRegistrationTextarea}
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="댓글을 입력해주세요."
        />

        <button
          className={styles.commentSubmitButton}
          type="submit"
          disabled={!commentContent.trim()}
        >
          등록
        </button>
      </form>

      {isCommentsLoading ? (
        <section className={styles.commentEmptySection}>
          <p className={styles.commentEmptyMessage}>
            댓글을 불러오는 중입니다.
          </p>
        </section>
      ) : commentsError ? (
        <section className={styles.commentEmptySection}>
          <p className={styles.commentEmptyMessage}>{commentsError}</p>
        </section>
      ) : comments.length === 0 ? (
        <section className={styles.commentEmptySection}>
          <Image
            className={styles.commentEmptyImage}
            src="/img_reply_empty.png"
            alt=""
            width={140}
            height={140}
          />

          <p className={styles.commentEmptyMessage}>
            아직 댓글이 없어요, <br />
            지금 댓글을 달아보세요!
          </p>
        </section>
      ) : (
        <section className={styles.commentListSection}>
          <div className={styles.commentList}>
            {comments.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                getComments={getComments}
              />
            ))}
          </div>
        </section>
      )}

      <Link className={styles.boardBackLink} href="/boards">
        <span className={styles.boardBackText}>목록으로 돌아가기</span>

        <Image
          className={styles.boardBackIcon}
          src="/ic_back.svg"
          alt=""
          width={24}
          height={24}
        />
      </Link>
    </main>
  )
}

export default ArticleDetailClient
