import Image from "next/image";
import Link from "next/link";
import styles from "./BestBoardCard.module.css";

export default function BestBoardCard({ id, title, nickname, createdAt }) {
  return (
    <Link href={`/boards/${id}`} className={styles.cardLink}>
      <article className={styles.card}>
        <Image
          src="/images/best_badge.png"
          alt="Best 배지"
          width={70}
          height={20}
        />

        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>

          <Image
            className={styles.thumbnail}
            src="/images/default_post.png"
            alt="게시글 기본 이미지"
            width={40}
            height={40}
          />
        </div>

        <div className={styles.meta}>
          <div className={styles.authorInfo}>
            <span className={styles.nickname}>{nickname}</span>
            <div className={styles.likeInfo}>
              <Image
                src="/images/heart.png"
                alt="좋아요"
                width={10}
                height={10}
              />

              <span className={styles.likeCount}>9999+</span>
            </div>
          </div>

          <span className={styles.date}>{createdAt}</span>
        </div>
      </article>
    </Link>
  );
}
