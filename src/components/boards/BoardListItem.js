import Image from "next/image";
import Link from "next/link";
import styles from "./BoardListItem.module.css";

export default function BoardListItem({ id, title, nickname, createdAt }) {
  return (
    <Link href={`/boards/${id}`} className={styles.itemLink}>
      <article className={styles.item}>
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>

          <Image
            src="/images/default_post.png"
            alt="게시글 기본 이미지"
            width={40}
            height={40}
          />
        </div>

        <div className={styles.meta}>
          <div className={styles.authorInfo}>
            <Image
              src="/images/default_profile.png"
              alt="작성자 기본 프로필 이미지"
              width={10}
              height={10}
            />

            <span className={styles.nickname}>{nickname}</span>
            <span className={styles.date}>{createdAt}</span>
          </div>

          <div className={styles.likeInfo}>
            <Image
              src="/images/heart.png"
              alt="좋아요"
              width={15}
              height={15}
            />

            <span>9999+</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
