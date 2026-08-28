import styles from '@/app/(with-layout)/boards/[id]/articleDetailPage.module.css'

function ArticleDetailLoading() {
  return (
    <main className={styles.articleDetailPage}>
      <p>게시글을 불러오는 중입니다.</p>
    </main>
  )
}

export default ArticleDetailLoading
