"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { updateComment } from "../actions";
import { createProductComment } from "../lib/api/comments";
import styles from "./ProductCommentForm.module.css";

export default function ProductCommentForm({
  id: productId,
  comment,
  onClose,
}) {
  const isEditMode = Boolean(comment);
  const [value, setValue] = useState(comment?.content ?? "");
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (content) =>
      isEditMode
        ? updateComment({ commentId: comment.id, content })
        : createProductComment({ productId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", productId] });
      setValue("");
    },
  });

  const handleChange = (e) => setValue(e.target.value);

  const canSubmit = !isPending && value.trim();

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    mutate(value);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.content}>
        <div>
          <label htmlFor="content">{comment ? "댓글 수정" : "댓글달기"}</label>
          <textarea
            id="content"
            name="content"
            placeholder="댓글을 입력해주세요."
            onChange={handleChange}
            value={value}
            required
          />
        </div>
        <div className={styles.btnsArea}>
          {onClose && (
            <button
              className="btStyle inActive"
              type="button"
              onClick={() => onClose()}
            >
              취소
            </button>
          )}
          <button
            type="submit"
            className={`btStyle ${!canSubmit && `inActive`}`}
            disabled={!canSubmit}
          >
            등록
          </button>
        </div>
      </form>
    </>
  );
}
