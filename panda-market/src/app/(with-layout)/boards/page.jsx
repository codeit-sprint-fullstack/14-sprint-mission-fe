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

  useEffect(() => {
    async function loadArticles() {
      try {
        setArticlesError('')

        const res = await fetch(`/api/articles?sort=${sort}`)

        if (!res.ok) {
          throw new Error('게시글 목록을 불러오지 못했습니다.')
        }

        const data = await res.json()

        setArticles(data.list)
      } catch (error) {
        console.error(error)
        setArticlesError(error.message)
      }
    }

    loadArticles()
  }, [sort])

  useEffect(() => {
    async function loadBestArticles() {
      try {
        setBestArticlesError('')

        const res = await fetch('/api/articles?sort=recent&pageSize=3')

        if (!res.ok) {
          throw new Error('베스트 게시글을 불러오지 못했습니다.')
        }

        const data = await res.json()

        setBestArticles(data.list)
      } catch (error) {
        console.error(error)
        setBestArticlesError(error.message)
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
          {bestArticles.map((article) => (
            <BestArticleCard key={article.id} article={article} />
          ))}
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
          <form className={styles.searchForm}>
            <Image
              className={styles.searchIcon}
              src="/ic_search.svg"
              alt=""
              width={24}
              height={24}
            />
            <input
              className={styles.searchInput}
              placeholder="검색어를 입력해주세요"
            />
          </form>
          <Dropdown value={sort} onChange={setSort} />
        </div>
        <div className={styles.articlesList}>
          {/* 데스크탑:4개/태블릿:6개/모바일:3개 */}
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </>
  )
}

export default BoardsPage
