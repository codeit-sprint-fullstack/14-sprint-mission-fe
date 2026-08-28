'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState, useEffect } from 'react'
import styles from '@/app/(with-layout)/boards/write/writePage.module.css'

function WritePageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const articleId = searchParams.get('id')

  const [articleTitle, setArticleTitle] = useState('')
  const [articleContent, setArticleContent] = useState('')

  useEffect(() => {
    if (!articleId) return

    async function getArticle() {
      try {
        const res = await fetch(`/api/articles/${articleId}`)
        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.message)
        }

        setArticleTitle(data.title)
        setArticleContent(data.content)
      } catch (error) {
        console.error(error)
        alert('게시글을 불러오지 못했습니다.')
      }
    }

    getArticle()
  }, [articleId])

  const canSubmitArticle =
    articleTitle.trim() !== '' && articleContent.trim() !== ''

  async function onArticleSubmit(e) {
    e.preventDefault()

    if (!canSubmitArticle) return

    try {
      const url = articleId ? `/api/articles/${articleId}` : '/api/articles'
      const method = articleId ? 'PATCH' : 'POST'

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: articleTitle.trim(),
          content: articleContent.trim(),
        }),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.message)
      }

      router.push(`/boards/${result.article.id}`)
    } catch (error) {
      console.error(error)
      alert(
        articleId
          ? '게시글 수정에 실패했습니다.'
          : '게시글 등록에 실패했습니다.',
      )
    }
  }

  return (
    <main className={styles.writePage}>
      <form className={styles.writeForm} onSubmit={onArticleSubmit}>
        <header className={styles.articleWriteHeader}>
          <h1 className={styles.articleWriteTitle}>게시글 쓰기</h1>

          <button
            className={styles.articleSubmitButton}
            type="submit"
            disabled={!canSubmitArticle}
          >
            등록
          </button>
        </header>

        <div className={styles.articleTitleField}>
          <h2 className={styles.articleTitleLabel}>*제목</h2>
          <input
            className={styles.articleTitleInput}
            type="text"
            value={articleTitle}
            onChange={(e) => setArticleTitle(e.target.value)}
            placeholder="제목을 입력해주세요."
          />
        </div>

        <div className={styles.articleContentField}>
          <h2 className={styles.articleContentLabel}>*내용</h2>
          <textarea
            className={styles.articleContentTextarea}
            value={articleContent}
            onChange={(e) => setArticleContent(e.target.value)}
            placeholder="내용을 입력해주세요."
          />
        </div>
      </form>
    </main>
  )
}

function WritePage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <WritePageContent />
    </Suspense>
  )
}

export default WritePage
