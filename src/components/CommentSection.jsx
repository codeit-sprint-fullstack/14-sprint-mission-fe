import { useState, useEffect, useCallback } from 'react';
import {
  createArticleComment,
  deleteComment,
  getArticleComments,
  patchComment,
} from '../../services/CommentService.js';
import CommentItem from './CommentItem';

const PAGE_SIZE = 10;

function CommentSection({ articleId }) {
  const [comments, setComments] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // 첫 페이지 로드 (게시글이 바뀌면 처음부터 다시)
  useEffect(() => {
    let ignore = false;

    setLoading(true);
    setError(null);

    getArticleComments(articleId, undefined, PAGE_SIZE)
      .then((data) => {
        if (ignore) return;
        setComments(data.list);
        setNextCursor(data.nextCursor);
      })
      .catch((err) => {
        if (!ignore) setError(err);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [articleId]);

  const loadMore = useCallback(async () => {
    if (!nextCursor) return;

    try {
      const data = await getArticleComments(articleId, nextCursor, PAGE_SIZE);
      setComments((prev) => [...prev, ...data.list]);
      setNextCursor(data.nextCursor);
    } catch (err) {
      setError(err);
    }
  }, [articleId, nextCursor]);

  const handleSubmit = async () => {
    if (content.trim() === '' || submitting) return;

    setSubmitting(true);
    try {
      const created = await createArticleComment(articleId, content.trim());
      // 최신순 정렬이므로 새 댓글을 맨 앞에 붙인다
      setComments((prev) => [created, ...prev]);
      setContent('');
    } catch (err) {
      setError(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (commentId, nextContent) => {
    const updated = await patchComment(commentId, nextContent);
    setComments((prev) => prev.map((c) => (c.id === commentId ? updated : c)));
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return;

    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (err) {
      setError(err);
    }
  };

  return (
    <section className="commentSection">
      <h2 className="commentSectionTitle">댓글달기</h2>

      <textarea
        className="commentInput"
        placeholder="댓글을 입력해주세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="commentSubmitRow">
        <button
          className="commentSubmitBtn"
          disabled={content.trim() === '' || submitting}
          onClick={handleSubmit}
        >
          등록
        </button>
      </div>

      {loading && <div className="articleStatus">댓글을 불러오는 중...</div>}

      {!loading && error && (
        <div className="articleStatus">댓글을 불러오지 못했습니다.</div>
      )}

      {!loading && !error && comments.length === 0 && (
        <div className="articleStatus">아직 댓글이 없어요.</div>
      )}

      {comments.length > 0 && (
        <ul className="commentList">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}

      {nextCursor && (
        <button className="loadMoreBtn" onClick={loadMore}>댓글 더보기</button>
      )}
    </section>
  );
}

export default CommentSection;
