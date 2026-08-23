import Image from "next/image";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createArticleComment,
  deleteArticleComment,
  getArticleComments,
  updateArticleComment,
} from "@/lib/api/articles";
import { formatDate, getMockMetadata } from "@/lib/articles/presentation";
import { queryKeys } from "@/lib/queryKeys";
import styles from "@/styles/ArticleDetailPage.module.css";

export default function CommentSection({ articleId }) {
  const queryClient = useQueryClient();
  const [commentContent, setCommentContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [error, setError] = useState("");
  const commentsKey = queryKeys.articles.comments(articleId);

  const commentsQuery = useQuery({
    queryKey: commentsKey,
    queryFn: () => getArticleComments(articleId),
    enabled: Boolean(articleId),
  });

  const refreshComments = () =>
    queryClient.invalidateQueries({ queryKey: commentsKey });

  const createMutation = useMutation({
    mutationFn: (content) => createArticleComment(articleId, content),
    onSuccess: async () => {
      setCommentContent("");
      await refreshComments();
    },
    onError: (createError) => setError(createError.message),
  });

  const updateMutation = useMutation({
    mutationFn: ({ commentId, content }) =>
      updateArticleComment(commentId, content),
    onSuccess: async () => {
      setEditingId(null);
      setEditingContent("");
      await refreshComments();
    },
    onError: (updateError) => setError(updateError.message),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteArticleComment,
    onSuccess: refreshComments,
    onError: (deleteError) => setError(deleteError.message),
  });

  const comments = commentsQuery.data?.list ?? [];
  const canSubmitComment =
    commentContent.trim() !== "" && !createMutation.isPending;
  const pendingCommentId = updateMutation.isPending
    ? updateMutation.variables?.commentId
    : deleteMutation.isPending
      ? deleteMutation.variables
      : null;

  function handleCreateComment(event) {
    event.preventDefault();

    if (!canSubmitComment) return;

    setError("");
    createMutation.mutate(commentContent.trim());
  }

  function startEditing(comment) {
    setEditingId(comment.id);
    setEditingContent(comment.content);
  }

  function handleUpdateComment(commentId) {
    const content = editingContent.trim();

    if (!content) return;

    setError("");
    updateMutation.mutate({ commentId, content });
  }

  function handleDeleteComment(commentId) {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;

    setError("");
    deleteMutation.mutate(commentId);
  }

  return (
    <section className={styles.commentsSection}>
      <h2 className={styles.commentsHeading}>댓글달기</h2>
      <form className={styles.commentForm} onSubmit={handleCreateComment}>
        <textarea
          value={commentContent}
          onChange={(event) => setCommentContent(event.target.value)}
          placeholder="댓글을 입력해주세요."
        />
        <button type="submit" disabled={!canSubmitComment}>
          {createMutation.isPending ? "등록 중" : "등록"}
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}
      {commentsQuery.isPending && (
        <p className={styles.error}>댓글을 불러오는 중입니다.</p>
      )}
      {commentsQuery.isError && (
        <p className={styles.error}>댓글을 불러오지 못했습니다.</p>
      )}

      {!commentsQuery.isPending &&
        !commentsQuery.isError &&
        (comments.length === 0 ? (
          <div className={styles.emptyComments}>
            <Image
              className={styles.emptyImage}
              src="/images/Img_reply_empty.png"
              alt=""
              width={120}
              height={120}
            />
            <p>아직 댓글이 없어요.</p>
            <p>지금 댓글을 달아보세요!</p>
          </div>
        ) : (
          <ul className={styles.commentList}>
            {comments.map((comment) => {
              const commentMetadata = getMockMetadata(comment.id);
              const isPending = pendingCommentId === comment.id;

              return (
                <li className={styles.commentItem} key={comment.id}>
                  {editingId === comment.id ? (
                    <div className={styles.editForm}>
                      <textarea
                        value={editingContent}
                        onChange={(event) =>
                          setEditingContent(event.target.value)
                        }
                      />
                      <div className={styles.editActions}>
                        <button type="button" onClick={() => setEditingId(null)}>
                          취소
                        </button>
                        <button
                          type="button"
                          disabled={!editingContent.trim() || isPending}
                          onClick={() => handleUpdateComment(comment.id)}
                        >
                          수정
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className={styles.commentContent}>{comment.content}</p>
                      <div className={styles.commentMetadata}>
                        <Image
                          className={styles.commentAvatar}
                          src="/images/user-profile.svg"
                          alt=""
                          width={40}
                          height={40}
                        />
                        <div className={styles.commentAuthorInfo}>
                          <span>{commentMetadata.nickname}</span>
                          <time dateTime={comment.createdAt}>
                            {formatDate(comment.createdAt)}
                          </time>
                        </div>
                      </div>
                      <details className={styles.commentMenu}>
                        <summary aria-label="댓글 메뉴">⋮</summary>
                        <div className={styles.menuPanel}>
                          <button
                            type="button"
                            onClick={() => startEditing(comment)}
                          >
                            수정하기
                          </button>
                          <button
                            type="button"
                            disabled={isPending}
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            삭제하기
                          </button>
                        </div>
                      </details>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        ))}
    </section>
  );
}
