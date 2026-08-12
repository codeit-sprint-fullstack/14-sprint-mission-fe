import { deleteArticle } from "@/actions/articleActions";
import { createComment } from "@/actions/commentActions";
import heartIcon from "@/assets/ic_heart.png";
import profileIcon from "@/assets/ic_profile.png";
import BackLink from "@/components/BackLink";
import EditDeleteMenu from "@/components/EditDeleteMenu";
import CommentForm from "@/components/comment/CommentForm";
import CommentList from "@/components/comment/CommentList";
import formatDate from "@/utils/formatDate";
import Image from "next/image";
import styles from "./page.module.css";

export default async function ArticleDetail({ params }) {
  const { id } = await params;

  // 게시글 불러오기 API 요청
  const articleRes = await fetch(`${process.env.API_BASE_URL}/articles/${id}`, {
    cache: "no-store",
  });
  if (!articleRes.ok) {
    throw new Error("게시글을 불러오는 데 실패했습니다");
  }
  const article = await articleRes.json();

  // 댓글 불러오기 API 요청
  const commentRes = await fetch(
    `${process.env.API_BASE_URL}/articles/${id}/comments`,
    { cache: "no-store" }
  );
  if (!commentRes.ok) {
    throw new Error("댓글을 불러오는 데 실패했습니다");
  }
  const comments = await commentRes.json();

  // 문제:
  const createCommentWithArticleId = createComment.bind(null, id);

  // 문제: onDelete?.() 전달받은 함수를 실행하는 구조 (articleId는 모른채)
  // 해결: Server Action에 articleId를 미리 전달하도록 bind 사용
  const deleteArticleWithArticleId = deleteArticle.bind(null, id);

  return (
    <div className={styles.wrapper}>
      <section className={styles.articleSection}>
        <div className={styles.header}>
          <h1 className={styles.title}>{article.title}</h1>
          <EditDeleteMenu
            editHref={`/articles/${article.id}/edit`}
            onDelete={deleteArticleWithArticleId}
          />
        </div>
        <div className={styles.info}>
          <div className={styles.infoLeft}>
            <Image
              src={profileIcon}
              width={40}
              height={40}
              loading="eager"
              alt="프로필 아이콘"
            />
            <p className={styles.nickname}>
              {article.nickname || "총명한 판다"}
            </p>
            <p className={styles.date}>{formatDate(article.createdAt)}</p>
          </div>
          <div className={styles.heart}>
            <Image
              src={heartIcon}
              width={26}
              height={23}
              loading="eager"
              alt="좋아요 수"
            />
            <p className={styles.heartCount}>{article.favoriteCount || 0}</p>
          </div>
        </div>
        <p className={styles.content}>{article.content}</p>
      </section>

      <section className={styles.commentFormSection}>
        <CommentForm
          action={createCommentWithArticleId}
          label="댓글 달기"
          variant="createComment"
        />
      </section>

      <section>
        <CommentList articleId={id} comments={comments} />
        <div className={styles.backLink}>
          <BackLink />
        </div>
      </section>
    </div>
  );
}
