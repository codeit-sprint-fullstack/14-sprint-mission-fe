'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from '@/app/(with-layout)/boards/write/writePage.module.css'

function WritePage() {
  const router = useRouter()

  const [articleTitle, setArticleTitle] = useState('')
  const [articleContents, setArticleContents] = useState('')

  const canSubmitArticle =
    articleTitle.trim() !== '' && articleContents.trim() !== ''

  async function onArticleSubmit(e) {
    e.preventDefault()

    if (!canSubmitArticle) {
      return
    }

    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: articleTitle.trim(),
          content: articleContents.trim(),
        }),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.message)
      }

      router.push(`/boards/${result.article.id}`)
    } catch (error) {
      console.error(error)
      alert('게시글 등록에 실패했습니다.')
    }
  }

  return (
    <main className={styles.writePage}>
      <form className={styles.writeForm} onSubmit={onArticleSubmit}>
        <div className={styles.writePageHeaderBar}>
          <h2 className={styles.writePageHeader}>게시글 쓰기</h2>

          <button
            className={styles.writeButton}
            type="submit"
            disabled={!canSubmitArticle}
          >
            등록
          </button>
        </div>

        <div className={styles.writeArticleTitle}>
          <h3 className={styles.writeArticleTitleHeader}>*제목</h3>
          <input
            className={styles.articleTitleInput}
            type="text"
            value={articleTitle}
            onChange={(e) => setArticleTitle(e.target.value)}
            placeholder="제목을 입력해주세요."
          />
        </div>

        <div className={styles.writeArticleContents}>
          <h3 className={styles.writeArticleContentsHeader}>*내용</h3>
          <textarea
            className={styles.articleContentTextarea}
            value={articleContents}
            onChange={(e) => setArticleContents(e.target.value)}
            placeholder="내용을 입력해주세요."
          />
        </div>
      </form>
    </main>
  )
}

export default WritePage
