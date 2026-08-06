"use client";

import profileIc from "@/public/icon_profile.png";
import Image from "next/image";
import { useState } from "react";
import { deleteComment } from "../actions";
import CommentForm from "./CommentForm";
import styles from "./CommentItems.module.css";
import KebabMenu from "./KebabMenu";
import { getRelativeTime } from "../utils/formatDate";

export default function CommentItems({ postId, comments }) {
  const [editingId, setEditingId] = useState(null);

  return (
    <>
      {comments.map((comment) =>
        comment.id === editingId ? (
          <CommentForm
            key={comment.id}
            comment={comment}
            postId={postId}
            onClose={() => setEditingId(null)}
          />
        ) : (
          <div key={comment.id} className={styles.eachCommentArea}>
            <article className={styles.content}>
              <div>
                <p>{comment.content}</p>
                <KebabMenu
                  confirmMessage="댓글을 삭제하시겠습니까?"
                  onEdit={() => setEditingId(comment.id)}
                  onDelete={() => deleteComment(postId, comment.id)}
                />
              </div>
              <div className={styles.profile}>
                <Image src={profileIc} alt="" width={32} />
                <div>
                  <span>말랑판다</span>
                  <time dateTime={comment.createdAt} suppressHydrationWarning>
                    {getRelativeTime(comment.createdAt)}
                  </time>
                </div>
              </div>
            </article>
          </div>
        ),
      )}
    </>
  );
}
