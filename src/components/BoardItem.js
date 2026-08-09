import SampleImg from "@/assets/sample.webp";
import styles from "@/styles/Board.module.css";
import Image from "next/image";

export default function BoardItem({article}) {
  return (
    <div className={styles.boardContents}>
      <div className={styles.boardTop}>
        <div className={styles.boardText}>
          {article.title}
        </div>
        <div className={styles.boardImgWrap}>
          <Image
            src={SampleImg}
            fill
          >
          </Image>
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
              {article.createdAt}
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.boardFavWrap}>
            <img src="/assets/ic_fav.png" />
            <p>{article.favCount}</p>
          </div>
        </div>
      </div>
    </div>
  )
}