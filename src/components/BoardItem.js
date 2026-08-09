import SampleImg from "@/assets/sample.webp";
import styles from "@/styles/Board.module.css";
import Image from "next/image";

export default function BoardItem({ article }) {
  return (
    <div className={styles.boardContents}>
      <div className={styles.boardTop}>
        <div className={styles.boardText}>
          {article.title}
        </div>
        <div className={styles.boardImgWrap}>
          <Image
            src={article.image || SampleImg}
            alt={article.title || "게시글 이미지"}
            fill
          />
        </div>
      </div>
      <div className={styles.boardBottom}>
        <div className={styles.left}>
          <div className={styles.boardNickWrap}>
            <div className={styles.boardNickImg}>
              <img src="/assets/nick_default.png" />
            </div>
            <div className={styles.boardNickText}>{article.nickname}</div>
            <div className={styles.boardDate}>
              {new Date(article.createdAt).toLocaleDateString("ko-KR")}
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.boardFavWrap}>
            <img src="/assets/ic_fav.png" />
            <p>{article.likeCount}</p>
          </div>
        </div>
      </div>
    </div>
  )
}