"use client";

import styles from "@/styles/Board.module.css";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import BoardItem from "./BoardItem";
import Input from "./Input";
import SortDropDown from "./SortDropDown";

export default function Board() {
  const [orderBy, setOrderBy] = useState("recent");
  const [keyword, setKeyword] = useState("");

  const { data } = useQuery({
    queryKey: ["articles", orderBy, keyword],

    queryFn: async () => {
      const response = await fetch(
        `https://panda-market-api.vercel.app/articles?orderBy=${orderBy}&keyword=${encodeURIComponent(keyword)}`
      );

      const data = await response.json();

      console.log(data);

      return data;
    },
  });

  const articles = data?.list ?? [];

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
  );
}