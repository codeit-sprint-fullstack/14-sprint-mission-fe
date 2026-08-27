import Image from "next/image";
import Link from "next/link";

import { formatDate, getMockMetadata } from "@/lib/articles/presentation";
import BestIcon from "./BestIcon";
import HeartIcon from "./HeartIcon";
import styles from "./ArticleList.module.css";

export default function ArticleList({ articles, variant = "default" }) {
  if (articles.length === 0) {
    return <p className={styles.empty}>등록된 게시글이 없습니다.</p>;
  }

  return (
    <ul
      className={`${styles.list} ${variant === "best" ? styles.bestList : ""}`}
    >
      {articles.map((article) => {
        const { nickname, likeCount } = getMockMetadata(article.id);

        return (
          <li
            className={`${styles.item} ${variant === "best" ? styles.bestItem : ""}`}
            key={article.id}
          >
            <Link
              className={styles.link}
              href={`/articles/${encodeURIComponent(article.id)}`}
            >
              <article className={styles.article}>
                <div className={styles.content}>
                  {variant === "best" && (
                    <span className={styles.bestBadge}>
                      <BestIcon />
                      Best
                    </span>
                  )}
                  <h2 className={styles.title}>{article.title}</h2>
                  <div className={styles.metadata}>
                    {variant !== "best" && (
                      <Image
                        className={styles.profile}
                        src="/images/user-profile.svg"
                        alt=""
                        width={24}
                        height={24}
                      />
                    )}
                    <span className={styles.nickname}>{nickname}</span>
                    <time className={styles.date} dateTime={article.createdAt}>
                      {formatDate(article.createdAt)}
                    </time>
                    <span
                      className={styles.likeCount}
                      aria-label={`좋아요 ${likeCount}개`}
                    >
                      <HeartIcon className={styles.heartIcon} />
                      <span>{likeCount}</span>
                    </span>
                  </div>
                </div>
                <Image
                  className={styles.image}
                  src="/images/article-default.png"
                  alt="게시글 기본 이미지"
                  width={72}
                  height={72}
                />
              </article>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
