import { deleteArticle } from "@/app/actions";
import CommentForm from "@/app/components/CommentForm";
import CommentList from "@/app/components/CommentList";
import KebabMenu from "@/app/components/KebabMenu";
import styles from "./[id].module.css";
import Link from "next/link";
import profileIc from "@/public/icon_profile.png";
import backIc from "@/public/ic_back.png";
import Image from "next/image";

export default async function postDetailPage({ params }) {
  const { id } = await params;
  const res = await fetch(`${process.env.API_URL}/articles/${id}`);
  const { title, content, createdAt } = await res.json();

  return (
    <>
      <section className={styles.postDetailArea}>
        <div className={styles.postHeader}>
          <div>
            <h2>{title}</h2>
            <KebabMenu
              confirmMessage="게시글을 삭제하시겠습니까?"
              onDelete={deleteArticle.bind(null, id)}
              editHref={`/posts/${id}/edit`}
            />
          </div>
          <footer>
            <span>
              <Image src={profileIc} alt="" width={40} />
              말랑판다
            </span>
            <time dateTime={createdAt}>
              {createdAt.slice(0, 10).replaceAll("-", ". ")}
            </time>
            <span>♡ 9999+</span>
          </footer>
        </div>
        <p className={styles.content}>{content}</p>
      </section>
      <section className={styles.commentArea}>
        <CommentForm postId={id} />
        <CommentList postId={id} />
      </section>
      <div className={styles.backBtArea}>
        <Link className={styles.backBt} href="/posts">
          목록으로 돌아가기
          <Image src={backIc} alt="" width={24} />
        </Link>
      </div>
    </>
  );
}
