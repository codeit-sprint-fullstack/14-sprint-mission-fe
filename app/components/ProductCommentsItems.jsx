"use client";

import profileIc from "@/public/icon_profile.png";
import Image from "next/image";
import { useState } from "react";
import { deleteComment } from "../actions";
import { getRelativeTime } from "../utils/formatDate";
import styles from "./ProductCommentItems.module.css";
import KebabMenu from "./KebabMenu";
import ProductCommentForm from "./ProductCommentForm";

export default function ProductCommentItems({ productId, comments }) {
  const [editingId, setEditingId] = useState(null);

  return (
    <>
      {comments.map((comment) =>
        comment.id === editingId ? (
          <ProductCommentForm
            key={comment.id}
            comment={comment}
            id={productId}
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
                  <span>{comment.writer.nickname}</span>
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
