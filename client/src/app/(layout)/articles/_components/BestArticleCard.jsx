import heart from "@/assets/ic_heart.png";
import medalIcon from "@/assets/ic_medal.png";
import defaultIcon from "@/assets/img_default.svg";
import formatDate from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";
import styles from "./BestArticleCard.module.css";

export default function BestArticleCard({ article }) {
  return (
    <Link href={`/articles/${article.id}`} className={styles.card}>
      <div className={styles.badge}>
        <Image
          src={medalIcon}
          width={16}
          height={16}
          loading="eager"
          alt="메달 아이콘"
        />
        <p className={styles.badgeText}>Best</p>
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>{article.title}</h1>
        <div className={styles.img}>
          <Image
            src={defaultIcon}
            width={48}
            height={48}
            loading="eager"
            alt={article.title}
          />
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.infoLeft}>
          <p className={styles.nickname}>{article.nickname || "총명한 판다"}</p>
          <div className={styles.heart}>
            <Image
              src={heart}
              width={13}
              height={11}
              loading="eager"
              alt="좋아요 수"
            />
            <p className={styles.heartCount}>{article.likeCount || 0}</p>
          </div>
        </div>
        <p className={styles.date}>{formatDate(article.createdAt)}</p>
      </div>
    </Link>
  );
}
