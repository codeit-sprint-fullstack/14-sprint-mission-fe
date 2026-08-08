import { useEffect, useState } from "react";
import styles from "./BoardList.module.css";
import Link from "next/link";
import Image from "next/image";
import BestBoardCard from "@/components/boards/BestBoardCard";
import BoardListItem from "@/components/boards/BoardListItem";
import getNickname from "@/lib/getNickname";

export default function BoardListPage() {
  const [bestArticles, setBestArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("recent");

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

  useEffect(() => {
    async function getArticles() {
      try {
        const response = await fetch(
          `/api/articles?sort=${sort}&limit=10&offset=0&keyword=${keyword}`,
        );

        if (!response.ok) {
          throw new Error("게시글을 불러오지 못했습니다.");
        }

        const data = await response.json();
        setArticles(data.list);
      } catch (error) {
        console.error(error);
      }
    }

    getArticles();
  }, [keyword, sort]);

  return (
    <div className={styles.page}>
      <section className={styles.bestBoardSection}>
        <h1 className={styles.sectionTitle}>베스트 게시글</h1>

        <div className={styles.bestCardList}>
          {bestArticles.map((article) => (
            <BestBoardCard
              key={article.id}
              id={article.id}
              title={article.title}
              nickname={getNickname(article.id)}
              createdAt={new Date(article.createdAt).toLocaleDateString(
                "ko-KR",
              )}
            />
          ))}
        </div>
      </section>

      <section className={styles.normalBoardSection}>
        <div className={styles.boardHeader}>
          <h2 className={styles.boardTitle}>게시글</h2>

          <Link href="/boards/new" className={styles.writeButton}>
            글쓰기
          </Link>
        </div>

        <div className={styles.searchArea}>
          <div className={styles.searchBox}>
            <Image
              src="/images/search.png"
              alt="돋보기"
              width={18}
              height={18}
            />

            <input
              className={styles.searchInput}
              type="text"
              placeholder="검색할 상품을 입력해주세요"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
          </div>

          <select
            className={styles.sortSelect}
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="recent">최신순</option>
            <option value="oldest">오래된순</option>
          </select>
        </div>

        <div className={styles.boardList}>
          {articles.map((article) => (
            <BoardListItem
              key={article.id}
              id={article.id}
              title={article.title}
              nickname={getNickname(article.id)}
              createdAt={new Date(article.createdAt).toLocaleDateString(
                "ko-KR",
              )}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
