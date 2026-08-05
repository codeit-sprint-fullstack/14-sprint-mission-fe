'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Dropdown from '@/components/Dropdown'
import styles from '@/app/(with-layout)/boards/boardPage.module.css'

function BoardsPage() {
  const [sort, setSort] = useState('recent')
  return (
    <>
      <section className={styles.bestArticlesSection}>
        <h2 className={styles.sectionTitle}>베스트 게시글</h2>
        <div className={styles.bestArticleList}>
          베스트 게시글 카드 컴포넌트 들어올 자리
          (데스크탑:3개/태블릿:2개/모바일:1개)
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
          게시글 카드 컴포넌트 들어올 자리 (데스크탑:4개/태블릿:6개/모바일:3개)
        </div>
      </section>
    </>
  )
}

export default BoardsPage
