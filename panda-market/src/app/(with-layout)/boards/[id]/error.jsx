'use client'

import styles from '@/app/(with-layout)/boards/[id]/articleDetailPage.module.css'

function ArticleDetailError() {
  return (
    <main className={styles.articleDetailPage}>
      <p>게시글을 불러오지 못했습니다.</p>
    </main>
  )
}

export default ArticleDetailError
