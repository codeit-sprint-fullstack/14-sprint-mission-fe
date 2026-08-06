import ArticleForm from "@/components/boards/ArticleForm/ArticleForm";
import { getArticle } from "@/lib/articleApi";
import { notFound } from "next/navigation";

export default async function EditBoardPage({ params }) {
  const { id } = await params;

  const article = await getArticle(id);

  if (!article) {
    notFound();
  }

  return (
    <ArticleForm
      articleId={article.id}
      initialTitle={article.title}
      initialContent={article.content}
    />
  );
}
