"use client";

import { useState } from "react";
import styles from "./CommentForm.module.css";
import { createComment, updateComment } from "../actions";

export default function CommentForm({ comment, onClose, postId }) {
  const [isValid, setIsValid] = useState(Boolean(comment));

  const action = async (formData) => {
    if (comment) {
      await updateComment(postId, comment.id, formData);
      onClose();
    } else {
      await createComment(postId, formData);
      setIsValid(false);
    }
  };

  const handleChange = (e) => setIsValid(Boolean(e.target.value.trim()));

  return (
    <>
      <form action={action} className={styles.content}>
        <div>
          <label htmlFor="content">{comment ? "댓글 수정" : "댓글달기"}</label>
          <textarea
            id="content"
            name="content"
            placeholder="댓글을 입력해주세요."
            onChange={handleChange}
            defaultValue={comment?.content}
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
            className={`btStyle ${!isValid && `inActive`}`}
            disabled={!isValid}
          >
            등록
          </button>
        </div>
      </form>
    </>
  );
}
