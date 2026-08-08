import Image from "next/image";
import styles from "./BestArticleCard.module.css";
import Link from "next/link";

export default function BestArticleCard({ article }) {
  return (
    <Link href={`/boards/${article.id}`} className={styles.link}>
      <article className={styles.card}>
        <div className={styles.badge}>
          <Image src="/images/ic_medal.svg" alt="" width={16} height={16} />
          <span>Best</span>
        </div>

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
          <div className={styles.metaLeft}>
            <span>{article.nickname}</span>

            <div className={styles.likes}>
              <Image src="/images/ic_heart.svg" alt="" width={16} height={16} />
              <span>{article.likeCount}</span>
            </div>
          </div>

          <time className={styles.date}>{article.createdAt}</time>
        </div>
      </article>
    </Link>
  );
}
