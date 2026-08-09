import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Board.module.css";
import SortDropDown from "./SortDropDown";
import SampleImg from "@/assets/sample.webp"
import Input from "./Input";
import BoardItem from "./BoardItem";
const articles = [
  {
    id: 1,
    title: "이 스파이더맨 피규어 얼마면 살 수 있어요?",
    nickname: "닉네임",
    createdAt: "2024. 05. 16",
    favCount: 120,
  },
  {
    id: 2,
    title: "맥북 중고로 팔려고 하는데 가격 괜찮을까요?",
    nickname: "닉네임",
    createdAt: "2024. 05. 17",
    favCount: 35,
  },
  {
    id: 3,
    title: "닌텐도 스위치 판매합니다",
    nickname: "닉네임",
    createdAt: "2024. 05. 18",
    favCount: 72,
  },
];
export default function board() {
  return (
    <>
      <div className={styles.boardWrap}>
        <div className={styles.boardSearch}>
          <Input
            variant="board"
            className={styles.boardInput}
            placeholder="검색할 내용을 입력해주세요"
          />
          <SortDropDown />
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