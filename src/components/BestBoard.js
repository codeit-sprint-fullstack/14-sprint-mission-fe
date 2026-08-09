import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "@/styles/BestBoard.module.css";
import SampleImg from "@/assets/sample.webp";

export default function BestBoard() {
  const [bestArticles, setBestArticles] = useState([]);

  useEffect(() => {
    const getBestArticles = async () => {
      const response = await fetch(
        "http://localhost:3001/api/articles/best"
      );

      const data = await response.json();

      setBestArticles(data);
    };

    getBestArticles();
  }, []);

  return (
    <>
      <div className={styles.bestBoardWrap}>
        {bestArticles.map((article) => (
          <div
            className={styles.bestBoardCont}
            key={article.id}
          >
            <div className={styles.bestMark}>
              <img
                src="/assets/ic_medal.png"
                alt=""
              />
              <p>Best</p>
            </div>

            <div className={styles.bestContents}>
              <div className={styles.bestTop}>
                <div className={styles.bestText}>
                  {article.title}
                </div>

                <div className={styles.bestImgWrap}>
                  <Image
                    src={article.image || SampleImg}
                    alt={article.title}
                    fill
                    sizes="100px"
                  />
                </div>
              </div>

              <div className={styles.bestBottom}>
                <div className={styles.left}>
                  <div className={styles.bestNick}></div>

                  <div className={styles.favWrap}>
                    <img
                      src="/assets/ic_fav.png"
                      alt=""
                    />
                    <p>{article.likeCount}</p>
                  </div>
                </div>

                <div className={styles.right}>
                  <div className={styles.date}>
                    {new Date(
                      article.createdAt
                    ).toLocaleDateString("ko-KR")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}