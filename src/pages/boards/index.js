import { useEffect, useState } from "react";
import BestBoardCard from "@/components/boards/BestBoardCard";
import styles from "./BoardList.module.css";

const nicknames = [
  "인생이 난리자베스",
  "월급통장 스루패스",
  "퇴사욕구 최고조",
  "영혼 빼고 출근 완료",
  "점심은 언제먹지",
];

export default function BoardListPage() {
  const [bestArticles, setBestArticles] = useState([]);

  useEffect(() => {
    async function getBestArticles() {
      try {
        const response = await fetch(
          "/api/articles?sort=recent&limit=3&offset=0",
        );

        if (!response.ok) {
          throw new Error("베스트 게시글을 불러오지 못했습니다.");
        }

        const data = await response.json();
        setBestArticles(data.list);
      } catch (error) {
        console.error(error);
      }
    }

    getBestArticles();
  }, []);

  return (
    <div className={styles.page}>
      <section className={styles.bestBoardSection}>
        <h1 className={styles.sectionTitle}>베스트 게시글</h1>

        <div className={styles.bestCardList}>
          {bestArticles.map((article, index) => (
            <BestBoardCard
              key={article.id}
              id={article.id}
              title={article.title}
              nickname={nicknames[index]}
              createdAt={new Date(article.createdAt).toLocaleDateString(
                "ko-KR",
              )}
            />
          ))}
        </div>
      </section>

      <section className={styles.normalBoardSection}>
        <div>게시글 제목과 글쓰기 버튼</div>

        <div>검색창과 정렬 드롭다운</div>

        <div>일반 게시글 목록</div>
      </section>
    </div>
  );
}
