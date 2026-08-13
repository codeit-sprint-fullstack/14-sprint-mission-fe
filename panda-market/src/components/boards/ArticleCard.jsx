import Link from 'next/link'
import Image from 'next/image'
import formatDate from '@/utils/formatDate'
import styles from '@/components/boards/ArticleCard.module.css'

function ArticleCard({ article }) {
  return (
    <Link href={`/boards/${article.id}`} className={styles.articleCard}>
      <div className={styles.articleCardTop}>
        {/* 데스크탑은 2줄/태블릿,모바일은 3줄 */}
        <p className={styles.articleTitle}>{article.title}</p>
        {/* article 데이터 모델에 사진, 닉네임, 종아요수 필드이 없으므로 프론트엔드에서 처리 */}
        <div className={styles.articleImage}>
          <Image
            src="/default_image.png"
            alt="제품사진"
            width={48}
            height={44.571}
          />
        </div>
      </div>
      <div className={styles.articleCardBottom}>
        <div className={styles.articleCardBottomLeft}>
          <Image
            src="/ic_profile.svg"
            alt="프로필 사진"
            width={24}
            height={24}
          />
          <span className={styles.articleUserNickname}>
            일찍일어난새가졸리다
          </span>
          <span className={styles.articleCreatdeAt}>
            {formatDate(article.createdAt)}
          </span>
        </div>
        <div className={styles.articleCardBottomRight}>
          <div className={styles.articleFavoriteCountView}>
            <Image src="/ic_empty_heart.svg" alt="" width={16} height={16} />
            <span className={styles.articleFavoriteCount}>999+</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ArticleCard
