import commentEmptyImg from "@/assets/img_reply_empty.png";
import Image from "next/image";
import CommentCard from "./CommentCard";
import styles from "./CommentList.module.css";

export default function CommentList({ articleId, comments = [] }) {
  if (comments.length === 0) {
    return (
      <div className={styles.emptyComment}>
        <Image
          src={commentEmptyImg}
          width={140}
          height={140}
          loading="eager"
          alt=""
        />
        <p>
          아직 댓글이 없어요,
          <br />
          지금 댓글을 달아보세요!
        </p>
      </div>
    );
  }

  return (
    <ul className={styles.commentList}>
      {comments.map((comment) => (
        <li key={comment.id}>
          <CommentCard articleId={articleId} comment={comment} />
        </li>
      ))}
    </ul>
  );
}
