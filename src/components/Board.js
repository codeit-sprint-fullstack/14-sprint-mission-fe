import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "@/styles/Board.module.css";
import SortDropDown from "./SortDropDown";
import SampleImg from "@/assets/sample.webp"
import Input from "./Input";
import BoardItem from "./BoardItem";

export default function board() {
  const [articles, setArticles] = useState([]);
  const [orderBy, setOrderBy] = useState("recent");
  useEffect(() => {
    const getArticles = async () => {
      const response = await fetch(`http://localhost:3001/api/articles?orderBy=${orderBy}`
);
      const data = await response.json();

      setArticles(data);
    };

    getArticles();
  }, [orderBy]);

  return (
    <>
      <div className={styles.boardWrap}>
        <div className={styles.boardSearch}>
          <Input
            variant="board"
            className={styles.boardInput}
            placeholder="검색할 내용을 입력해주세요"
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