import Image from "next/image";
import styles from "./ArticleCard.module.css";

export default function ArticleCard({ article }) {
  return (
    <article className={styles.card}>
      <div className={styles.content}>
        <h3 className={styles.title}>{article.title}</h3>

        <div className={styles.thumbnail}>
          <Image
            src="/images/img_default.png"
            alt="게시글 기본 이미지"
            width={72}
            height={72}
          />
        </div>
      </div>

      <div className={styles.meta}>
        <div className={styles.authorInfo}>
          <Image src="/images/ic_profile.svg" alt="" width={24} height={24} />

          <span>{article.nickname}</span>
          <time>{article.createdAt}</time>
        </div>

        <div className={styles.likes}>
          <Image src="/images/ic_heart.svg" alt="" width={24} height={24} />
          <span>{article.likeCount}</span>
        </div>
      </div>
    </article>
  );
}
