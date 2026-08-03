import ArticleList from "@/components/ArticleList";
import SearchForm from "@/components/SearchForm";

export default async function Board() {
  const res = await fetch(
    "https://one4-sprint-mission-prisma.onrender.com/articles",
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("게시글 목록을 불러오는 데 실패했습니다");
  }

  const data = await res.json();
  return (
    <div>
      <h2>베스트 게시글</h2>
      <h2>게시글</h2>
      <SearchForm />
      <ArticleList articles={data} />
    </div>
  );
}
