import BestArticleCard from "@/components/boards/BestArticleCard/BestArticleCard";
import Dropdown from "@/components/Dropdown/Dropdown";
import styles from "./page.module.css";
import ArticleCard from "@/components/boards/ArticleCard/ArticleCard";
import Button from "@/components/Button/Button";
import SearchInput from "@/components/SearchInput/SearchInput";

export default function BoardsPage() {
  const bestArticles = [
    {
      id: 1,
      title: "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?",
      nickname: "총명한판다",
      likeCount: "9999+",
      createdAt: "2024. 04. 16",
    },
    {
      id: 2,
      title: "아이패드 프로 중고 가격 어느 정도가 적당할까요?",
      nickname: "귀여운판다",
      likeCount: 128,
      createdAt: "2024. 04. 15",
    },
    {
      id: 3,
      title: "노트북 판매하려는데 가격 조언 부탁드립니다.",
      nickname: "용감한판다",
      likeCount: 82,
      createdAt: "2024. 04. 14",
    },
  ];

  const articles = [
    {
      id: 4,
      title: "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?",
      nickname: "총명한 판다",
      likeCount: "9999+",
      createdAt: "2024. 04. 16",
    },
    {
      id: 5,
      title: "아이패드 에어 중고로 사려고 하는데 가격 괜찮을까요?",
      nickname: "든든한 판다",
      likeCount: 328,
      createdAt: "2024. 04. 15",
    },
    {
      id: 6,
      title: "혹시 오늘 도림천 같이 산책할 분 계신가요~?",
      nickname: "행복한 판다",
      likeCount: 120,
      createdAt: "2024. 04. 14",
    },
    {
      id: 7,
      title: "노트북 중고 거래할 때 확인해야 할 게 뭐가 있을까요?",
      nickname: "용감한 판다",
      likeCount: 56,
      createdAt: "2024. 04. 13",
    },
    {
      id: 8,
      title: "다들 중고거래할 때 어디서 만나시나요?",
      nickname: "친절한 판다",
      likeCount: 31,
      createdAt: "2024. 04. 12",
    },
  ];

  const sortOptions = [{ label: "최신순", value: "recent" }];

  return (
    <div className={styles.page}>
      <section className={styles.bestSection}>
        <h1 className={styles.bestTitle}>베스트 게시글</h1>

        <div className={styles.bestList}>
          {bestArticles.map((article) => (
            <BestArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      <section className={styles.articleSection}>
        <div className={styles.articleHeader}>
          <h2 className={styles.articleTitle}>게시글</h2>
          <Button href={"/boards/new"}>글쓰기</Button>
        </div>

        <div className={styles.articleControls}>
          <SearchInput placeholder="검색할 게시글을 입력해 주세요" />

          <Dropdown options={sortOptions} defaultValue="recent" />
        </div>

        <div className={styles.articleList}>
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}
