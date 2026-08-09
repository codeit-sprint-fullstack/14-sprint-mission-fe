import styles from "@/styles/Board.module.css";
import { useEffect, useState } from "react";
import BoardItem from "./BoardItem";
import Input from "./Input";
import SortDropDown from "./SortDropDown";

export default function board() {
  const [articles, setArticles] = useState([]);
  const [orderBy, setOrderBy] = useState("recent");
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    const getArticles = async () => {
      const response = await fetch(
        `http://localhost:3001/api/articles?orderBy=${orderBy}&keyword=${encodeURIComponent(keyword)}`
      );
      const data = await response.json();

      setArticles(data);
    };

    getArticles();
  }, [orderBy, keyword]);

  return (
    <>
      <div className={styles.boardWrap}>
        <div className={styles.boardSearch}>
          <Input
            variant="board"
            className={styles.boardInput}
            placeholder="검색할 내용을 입력해주세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <SortDropDown
            orderBy={orderBy}
            setOrderBy={setOrderBy}
          />
        </div>
        <div className={styles.boardCont}>
          {articles.map((article) => (
            <BoardItem
              key={article.id}
              article={article}
            />
          ))}

        </div>
      </div>
    </>
  )
}