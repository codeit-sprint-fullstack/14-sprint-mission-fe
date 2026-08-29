import { notFound } from "next/navigation";
import ArticleForm from "@/components/ArticleForm";

async function getArticle(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/${id}`,
    { cache: "no-store" },
  );

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) throw new Error("게시글 조회 실패");
  return res.json();
}

export default async function EditBoard({ params }) {
  const { id } = await params;
  const article = await getArticle(id);

  return (
    <ArticleForm
      mode="edit"
      articleId={id}
      initialTitle={article.title ?? ""}
      initialContent={article.content ?? ""}
      initialImage={article.image ?? null}
    />
  );
}