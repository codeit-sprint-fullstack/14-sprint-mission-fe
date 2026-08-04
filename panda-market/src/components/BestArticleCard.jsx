import Link from 'next/link'
import Image from 'next/image'
import styles from '@/components/BestArticleCard.module.css'

function BestArticleCard({ article }) {
  return (
    <Link href={`/boards/${article.id}`} className={styles.bestArticleCard}>
      <div className={styles.bestArticleCardTop}>
        <Image src="/ic_medal.svg" alt="" width={12.391} height={14.906} />
        <span>Best</span>
      </div>
      <div className={styles.bestArticleCardCenter}>
        article.title 데이터자리 (데스크탑은 2줄/태블릿,모바일은 3줄)
        {/* article 데이터 모델에 사진, 닉네임, 종아요수 필드이 없으므로 프론트엔드에서 처리 */}
        <div className={styles.bestArticleImage}>
          <Image
            src="/default_image.png"
            alt="제품사진"
            width={48}
            height={44.571}
          />
        </div>
      </div>
      <div className={styles.bestArticleCardBottom}>
        <div className={styles.bestArticleCardBottomLeft}>
          <span>userNickname</span>
          <div className={styles.bestArticleFavoriteCount}>
            <Image src="/ic_empty_heart.svg" alt="" width={16} height={16} />
            <span>articleFavoriteCount</span>
          </div>
        </div>
        <div className={styles.bestArticleCardBottomRight}>
          article.createdAt 데이터자리
        </div>
      </div>
    </Link>
  )
}

export default BestArticleCard
