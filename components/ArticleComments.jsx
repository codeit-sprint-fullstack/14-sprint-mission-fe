'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  createArticleComment,
  deleteComment,
  getArticleComments,
  patchComment,
} from '@/lib/client-api';
import AlertMessage from './AlertMessage';
import AlertModal from './AlertModal';

function formatDate(value) {
  if (!value) return '';
  return new Date(value).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

function CommentItem({
  comment,
  isMenuOpen,
  isEditing,
  isBusy,
  onToggleMenu,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onDelete,
}) {
  const [editValue, setEditValue] = useState(comment.content);

  return (
    <article className={`article-comment-item ${isEditing ? 'is-editing' : ''}`}>
      {isEditing ? (
        <form
          className="article-comment-edit-form"
          onSubmit={(event) => {
            event.preventDefault();
            onSaveEdit(editValue.trim());
          }}
        >
          <textarea
            value={editValue}
            onChange={(event) => setEditValue(event.target.value)}
            aria-label="댓글 수정 내용"
            autoFocus
          />
          <div className="article-comment-edit-actions">
            <button type="button" onClick={onCancelEdit}>취소</button>
            <button type="submit" className="is-primary" disabled={!editValue.trim() || isBusy}>
              {isBusy ? '수정 중' : '수정 완료'}
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="article-menu-wrap">
            <button
              type="button"
              className="article-more-button"
              aria-label="댓글 메뉴"
              aria-expanded={isMenuOpen}
              onClick={onToggleMenu}
            >⋮</button>
            {isMenuOpen ? (
              <div className="article-action-menu" role="menu">
                <button type="button" role="menuitem" onClick={onStartEdit}>수정하기</button>
                <button type="button" role="menuitem" onClick={onDelete} disabled={isBusy}>삭제하기</button>
              </div>
            ) : null}
          </div>
          <p>{comment.content}</p>
        </>
      )}
      <div className="article-comment-meta">
        <span className="board-avatar" aria-hidden="true" />
        <span>똑똑한판다</span>
        <time>{formatDate(comment.createdAt)}</time>
      </div>
    </article>
  );
}

export default function ArticleComments({ articleId }) {
  const [comments, setComments] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [commentValue, setCommentValue] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [busyId, setBusyId] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [deleteNotice, setDeleteNotice] = useState('');

  useEffect(() => {
    let ignore = false;
    getArticleComments(articleId, { pageSize: 3 })
      .then((data) => {
        if (ignore) return;
        setComments(data.list || []);
        setNextCursor(data.nextCursor || null);
      })
      .catch((requestError) => {
        if (!ignore) setError(requestError.message || '댓글을 불러오지 못했습니다.');
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });
    return () => { ignore = true; };
  }, [articleId]);

  const isSubmitDisabled = useMemo(
    () => !commentValue.trim() || isSubmitting,
    [commentValue, isSubmitting],
  );

  async function submitComment(event) {
    event.preventDefault();
    if (isSubmitDisabled) return;

    setError('');
    setIsSubmitting(true);
    try {
      const comment = await createArticleComment(articleId, commentValue.trim());
      setComments((current) => [comment, ...current]);
      setCommentValue('');
    } catch (requestError) {
      setError(requestError.message || '댓글 등록에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function saveComment(commentId, content) {
    if (!content) return;
    setBusyId(commentId);
    setError('');
    try {
      const updated = await patchComment(commentId, content);
      setComments((current) => current.map((comment) => comment.id === commentId ? updated : comment));
      setEditingId(null);
    } catch (requestError) {
      setError(requestError.message || '댓글 수정에 실패했습니다.');
    } finally {
      setBusyId(null);
    }
  }

  useEffect(() => {
    if (!deleteNotice) return undefined;
    const timerId = window.setTimeout(() => setDeleteNotice(''), 2500);
    return () => window.clearTimeout(timerId);
  }, [deleteNotice]);

  async function removeComment() {
    const commentId = deleteTargetId;
    if (!commentId) return;
    setBusyId(commentId);
    setError('');
    try {
      await deleteComment(commentId);
      setComments((current) => current.filter((comment) => comment.id !== commentId));
      setOpenMenuId(null);
      setDeleteTargetId(null);
      setDeleteNotice('댓글이 삭제되었습니다.');
    } catch (requestError) {
      setError(requestError.message || '댓글 삭제에 실패했습니다.');
    } finally {
      setBusyId(null);
    }
  }

  async function loadMoreComments() {
    if (!nextCursor || isLoadingMore) return;
    setIsLoadingMore(true);
    setError('');
    try {
      const data = await getArticleComments(articleId, { cursor: nextCursor, pageSize: 3 });
      setComments((current) => [...current, ...(data.list || [])]);
      setNextCursor(data.nextCursor || null);
    } catch (requestError) {
      setError(requestError.message || '댓글을 더 불러오지 못했습니다.');
    } finally {
      setIsLoadingMore(false);
    }
  }

  return (
    <>
      <section className="article-comment-section" aria-labelledby="comment-title">
        <h2 id="comment-title">댓글달기</h2>
        <form className="article-comment-form" onSubmit={submitComment}>
          <textarea
            value={commentValue}
            onChange={(event) => setCommentValue(event.target.value)}
            placeholder="댓글을 입력해주세요."
          />
          <button type="submit" disabled={isSubmitDisabled}>
            {isSubmitting ? '등록 중' : '등록'}
          </button>
        </form>
        {error ? <p className="article-submit-error" role="alert">{error}</p> : null}
      </section>

      <section className="article-comments" aria-label="댓글 목록">
        {isLoading ? <p className="board-status">댓글을 불러오는 중입니다.</p> : null}
        {!isLoading && comments.length ? (
          <>
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                isMenuOpen={openMenuId === comment.id}
                isEditing={editingId === comment.id}
                isBusy={busyId === comment.id}
                onToggleMenu={() => setOpenMenuId((current) => current === comment.id ? null : comment.id)}
                onStartEdit={() => {
                  setEditingId(comment.id);
                  setOpenMenuId(null);
                }}
                onCancelEdit={() => setEditingId(null)}
                onSaveEdit={(content) => saveComment(comment.id, content)}
                onDelete={() => {
                  setOpenMenuId(null);
                  setDeleteTargetId(comment.id);
                }}
              />
            ))}
            {nextCursor ? (
              <button
                className="article-load-more"
                type="button"
                disabled={isLoadingMore}
                onClick={loadMoreComments}
              >
                {isLoadingMore ? '불러오는 중' : '댓글 더보기'}
              </button>
            ) : null}
          </>
        ) : null}
        {!isLoading && !comments.length ? (
          <div className="article-empty-comments">
            <div className="article-empty-comments__icon" aria-hidden="true" />
            <p>아직 댓글이 없어요,<br />지금 댓글을 달아보세요!</p>
          </div>
        ) : null}
      </section>

      <AlertMessage
        message={deleteNotice}
        variant="success"
        onClose={() => setDeleteNotice('')}
      />

      <AlertModal
        isOpen={Boolean(deleteTargetId)}
        title="댓글을 삭제하시겠어요?"
        message="삭제한 댓글은 다시 복구할 수 없습니다."
        variant="danger"
        confirmLabel="삭제"
        isPending={busyId === deleteTargetId}
        onCancel={() => setDeleteTargetId(null)}
        onConfirm={removeComment}
      />
    </>
  );
}
