import emptyImg from "@/public/img_reply_empty.png";
import Image from "next/image";
import CommentItems from "./CommentItems.jsx";
import styles from "./CommentList.module.css";

export default async function CommentList({ postId }) {
  const res = await fetch(`${process.env.API_URL}/articles/${postId}/comments`);

  if (!res.ok) {
    throw new Error("댓글을 불러오기에 실패했습니다.");
  }
  const { comments } = await res.json();

  return (
    <div className={styles.commentArea}>
      {comments && comments.length > 0 ? (
        <CommentItems postId={postId} comments={comments} />
      ) : (
        <div className={styles.emptyComment}>
          <figure>
            <Image src={emptyImg} alt="" width={140} />
          </figure>
          <p>
            아직 댓글이 없어요. <br />
            지금 댓글을 달아보세요!
          </p>
        </div>
      )}
    </div>
  );
}
