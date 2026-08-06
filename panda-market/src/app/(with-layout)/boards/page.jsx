'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Dropdown from '@/components/Dropdown'
import ArticleCard from '@/components/ArticleCard'
import BestArticleCard from '@/components/BestArticleCard'
import styles from '@/app/(with-layout)/boards/boardPage.module.css'

function BoardsPage() {
  const [sort, setSort] = useState('recent')
  const [articles, setArticles] = useState([])
  const [bestArticles, setBestArticles] = useState([])
  const [articlesError, setArticlesError] = useState('')
  const [bestArticlesError, setBestArticlesError] = useState('')
  const [isArticlesLoading, setIsArticlesLoading] = useState(false)
  const [isBestArticlesLoading, setIsBestArticlesLoading] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [submittedKeyword, setSubmittedKeyword] = useState('')

  function onSearchArticlesSubmit(event) {
    event.preventDefault()
    setSubmittedKeyword(keyword.trim())
  }

  useEffect(() => {
    async function loadArticles() {
      try {
        setIsArticlesLoading(true)
        setArticlesError('')

        const res = await fetch(
          `/api/articles?sort=${sort}&keyword=${encodeURIComponent(submittedKeyword)}&pageSize=4`,
        )

        if (!res.ok) {
          throw new Error('게시글 목록을 불러오지 못했습니다.')
        }

        const data = await res.json()

        if (!Array.isArray(data.list)) {
          throw new Error('게시글 데이터를 올바르게 받지 못했습니다.')
        }

        setArticles(data.list)
      } catch (error) {
        console.error(error)
        setArticlesError(error.message)
      } finally {
        setIsArticlesLoading(false)
      }
    }

    loadArticles()
  }, [sort, submittedKeyword])

  useEffect(() => {
    async function loadBestArticles() {
      try {
        setIsBestArticlesLoading(true)
        setBestArticlesError('')

        const res = await fetch('/api/articles?sort=recent&pageSize=3')

        if (!res.ok) {
          throw new Error('베스트 게시글을 불러오지 못했습니다.')
        }

        const data = await res.json()

        if (!Array.isArray(data.list)) {
          throw new Error('베스트 게시글 데이터를 올바르게 받지 못했습니다.')
        }

        setBestArticles(data.list)
      } catch (error) {
        console.error(error)
        setBestArticlesError(error.message)
      } finally {
        setIsBestArticlesLoading(false)
      }
    }

    loadBestArticles()
  }, [])

  return (
    <>
      <section className={styles.bestArticlesSection}>
        <h2 className={styles.sectionTitle}>베스트 게시글</h2>
        <div className={styles.bestArticleList}>
          {/* 데스크탑:3개/태블릿:2개/모바일:1개 */}
          {isBestArticlesLoading ? (
            <p>베스트 게시글을 불러오는 중입니다.</p>
          ) : bestArticlesError ? (
            <p>{bestArticlesError}</p>
          ) : bestArticles.length === 0 ? (
            <p>등록된 베스트 게시글이 없습니다.</p>
          ) : (
            bestArticles.map((article) => (
              <BestArticleCard key={article.id} article={article} />
            ))
          )}
        </div>
      </section>

      <section className={styles.articlesSection}>
        <div className={styles.articlesSectionHeader}>
          <h2 className={styles.sectionTitle}>게시글</h2>
          <Link href="/boards/write" className={styles.createArticleButton}>
            글쓰기
          </Link>
        </div>
        <div className={styles.listToolbar}>
          <form className={styles.searchForm} onSubmit={onSearchArticlesSubmit}>
            <Image
              className={styles.searchIcon}
              src="/ic_search.svg"
              alt=""
              width={24}
              height={24}
            />
            <input
              className={styles.searchInput}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="검색어를 입력해주세요"
            />
          </form>
          <Dropdown value={sort} onChange={setSort} />
        </div>
        <div className={styles.articlesList}>
          {/* 데스크탑:4개/태블릿:6개/모바일:3개 */}
          {isArticlesLoading ? (
            <p>
              {submittedKeyword
                ? '검색 결과를 불러오는 중입니다.'
                : '게시글을 불러오는 중입니다.'}
            </p>
          ) : articlesError ? (
            <p>{articlesError}</p>
          ) : articles.length === 0 ? (
            <p>
              {submittedKeyword
                ? '검색 결과가 없습니다.'
                : '등록된 게시글이 없습니다.'}
            </p>
          ) : (
            articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))
          )}
        </div>
      </section>
    </>
  )
}

export default BoardsPage
