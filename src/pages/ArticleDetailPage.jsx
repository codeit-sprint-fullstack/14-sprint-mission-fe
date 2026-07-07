import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';
import useArticleComments from '../hooks/useArticleComments.js';
import { createArticleComment, getArticle } from '../services/pandaApi.js';

function formatDate(value) {
  if (!value) {
    return '';
  }

  return new Date(value).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

function CommentItem({ comment }) {
  return (
    <article className="article-comment-item">
      <button type="button" className="article-more-button" aria-label="댓글 메뉴">⋮</button>
      <p>{comment.content}</p>
      <div className="article-comment-meta">
        <span className="board-avatar" aria-hidden="true" />
        <span>똑똑한판다</span>
        <time>{formatDate(comment.createdAt)}</time>
      </div>
    </article>
  );
}

function ArticleDetailPage() {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [articleError, setArticleError] = useState('');
  const [commentValue, setCommentValue] = useState('');
  const [commentError, setCommentError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const comments = useArticleComments(articleId);

  useEffect(() => {
    let ignore = false;

    setArticleError('');
    getArticle(articleId)
      .then((response) => {
        if (!ignore) {
          setArticle(response);
        }
      })
      .catch((error) => {
        if (!ignore) {
          setArticleError(error.message || '게시글을 불러오지 못했습니다.');
        }
      });

    return () => {
      ignore = true;
    };
  }, [articleId]);

  const isSubmitDisabled = useMemo(
    () => !commentValue.trim() || isSubmitting,
    [commentValue, isSubmitting],
  );

  const submitComment = async (event) => {
    event.preventDefault();
    setCommentError('');

    if (isSubmitDisabled) {
      return;
    }

    setIsSubmitting(true);

    try {
      const comment = await createArticleComment(articleId, { content: commentValue.trim() });
      comments.prependComment(comment);
      setCommentValue('');
    } catch (error) {
      setCommentError(error.message || '댓글 등록에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="article-detail-page">
      <Header logoMode="market" />
      <main className="article-detail-main">
        {articleError ? <p className="board-status">{articleError}</p> : null}
        {article ? (
          <article className="article-detail">
            <button type="button" className="article-more-button article-more-button--top" aria-label="게시글 메뉴">⋮</button>
            <h1>{article.title}</h1>
            <div className="article-detail-meta">
              <span className="board-avatar" aria-hidden="true" />
              <span>총명한판다</span>
              <time>{formatDate(article.createdAt)}</time>
              <span className="article-like">♡ 123</span>
            </div>
            <p>{article.content}</p>
          </article>
        ) : null}

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
          {commentError ? <p className="article-submit-error">{commentError}</p> : null}
        </section>

        <section className="article-comments" aria-label="댓글 목록">
          {comments.error ? <p className="board-status">{comments.error}</p> : null}
          {comments.comments.length ? (
            <>
              {comments.comments.map((comment) => <CommentItem key={comment.id} comment={comment} />)}
              <nav className="article-comment-pagination" aria-label="댓글 페이지">
                <button type="button" disabled>‹</button>
                <span className="is-active">1</span>
                <button type="button" disabled={!comments.nextCursor} onClick={comments.loadMore}>›</button>
              </nav>
            </>
          ) : (
            <div className="article-empty-comments">
              <div className="article-empty-comments__icon" aria-hidden="true" />
              <p>아직 댓글이 없어요,<br />지금 댓글을 달아보세요!</p>
            </div>
          )}
        </section>

        <Link className="article-back-link" to="/free-board">목록으로 돌아가기 <span aria-hidden="true">↩</span></Link>
      </main>
      <Footer />
    </div>
  );
}

export default ArticleDetailPage;
