import heart from "@/assets/ic_heart.png";
import profileIcon from "@/assets/ic_profile.png";
import defaultIcon from "@/assets/img_default.svg";
import formatDate from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";
import styles from "./ArticleCard.module.css";

export default function ArticleCard({ article }) {
  return (
    <Link href={`/articles/${article.id}`} className={styles.card}>
      <div className={styles.content}>
        <p className={styles.title}>{article.title}</p>
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
          <Image
            src={profileIcon}
            width={24}
            height={24}
            loading="eager"
            alt="프로필 아이콘"
          />
          <p className={styles.nickname}>{article.writer.nickname}</p>
          <p className={styles.date}>{formatDate(article.createdAt)}</p>
        </div>
        <div className={styles.heart}>
          <Image
            src={heart}
            width={20}
            height={17}
            loading="eager"
            alt="좋아요 수"
          />
          <p className={styles.heartCount}>{article.likeCount || 0}</p>
        </div>
      </div>
    </Link>
  );
}
