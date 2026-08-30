import { updateArticle } from "@/actions/articleActions";
import ArticleForm from "../../_components/ArticleForm";
import styles from "./page.module.css";

export default async function EditArticle({ params }) {
  const { id } = await params;

  const res = await fetch(`${process.env.API_BASE_URL}/articles/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("게시글을 불러오지 못했습니다.");
  }

  const article = await res.json();

  // AI로 문제 해결
  // 문제: 게시글 수정 함수는 articleId, formData 두 가지 값이 필요
  //      formData는 form이 자동적으로 전달, articleId는 미리 연결해야 함
  // 해결: Server Action에 articleId를 미리 전달하도록 bind 사용
  const updateArticleWithId = updateArticle.bind(null, id);

  return (
    <div className={styles.wrapper}>
      <ArticleForm
        action={updateArticleWithId}
        initialTitle={article.title}
        initialContent={article.content}
        submitText="수정"
      />
    </div>
  );
}
