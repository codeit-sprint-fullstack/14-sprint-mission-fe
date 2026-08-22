"use client";

import profileIc from "@/public/icon_profile.png";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { deleteComment } from "../lib/api/comments";
import { getRelativeTime } from "../utils/formatDate";
import KebabMenu from "./KebabMenu";
import ProductCommentForm from "./ProductCommentForm";
import styles from "./ProductCommentItems.module.css";
import { getMe } from "../lib/api/auth";

//댓글 목록. 케밥- 삭제는 모달처리 후 삭제
export default function ProductCommentItems({ productId, comments }) {
  const [editingId, setEditingId] = useState(null);
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (commentId) => deleteComment({ commentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", productId] });
    },
  });
  const { data: me } = useQuery({
    queryKey: ["users", "me"],
    queryFn: () => getMe(),
  });

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
                {comment.writer.id === me?.id && (
                  <KebabMenu
                    confirmMessage="댓글을 삭제하시겠습니까?"
                    onEdit={() => setEditingId(comment.id)}
                    onDelete={() => mutate(comment.id)}
                  />
                )}
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
