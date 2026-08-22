'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ArticleComments from './ArticleComments';
import AlertModal from './AlertModal';
import { deleteArticle, getArticle } from '@/lib/client-api';

function formatDate(value) {
  if (!value) return '';
  return new Date(value).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

export default function ArticleDetailView({ articleId }) {
  const router = useRouter();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    let ignore = false;
    getArticle(articleId)
      .then((data) => {
        if (!ignore) setArticle(data);
      })
      .catch((requestError) => {
        if (!ignore) setError(requestError.message || '게시글을 불러오지 못했습니다.');
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });
    return () => { ignore = true; };
  }, [articleId]);

  async function removeArticle() {
    setIsDeleting(true);
    setError('');
    try {
      await deleteArticle(articleId);
      router.push('/free-board?notice=deleted');
      router.refresh();
    } catch (requestError) {
      setError(requestError.message || '게시글 삭제에 실패했습니다.');
      setIsDeleting(false);
    }
  }

  return (
    <main className="article-detail-main">
      {isLoading ? <p className="board-status">게시글을 불러오는 중입니다.</p> : null}
      {error ? <p className="article-submit-error" role="alert">{error}</p> : null}

      {article ? (
        <>
          <article className="article-detail">
            <div className="article-menu-wrap article-menu-wrap--top">
              <button
                type="button"
                className="article-more-button"
                aria-label="게시글 메뉴"
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen((current) => !current)}
              >⋮</button>
              {isMenuOpen ? (
                <div className="article-action-menu" role="menu">
                  <Link href={`/free-board/${articleId}/edit`} role="menuitem">수정하기</Link>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsDeleteModalOpen(true);
                    }}
                    disabled={isDeleting}
                  >
                    {isDeleting ? '삭제 중' : '삭제하기'}
                  </button>
                </div>
              ) : null}
            </div>
            <h1>{article.title}</h1>
            <div className="article-detail-meta">
              <span className="board-avatar" aria-hidden="true" />
              <span>총명한판다</span>
              <time>{formatDate(article.createdAt)}</time>
              <span className="article-like" aria-label={`좋아요 ${article.likeCount || 0}개`}>
                ♡ {Number(article.likeCount || 0).toLocaleString('ko-KR')}
              </span>
            </div>
            <p>{article.content}</p>
          </article>

          <ArticleComments articleId={articleId} />
        </>
      ) : null}

      <Link className="article-back-link" href="/free-board">
        목록으로 돌아가기 <span aria-hidden="true">↩</span>
      </Link>

      <AlertModal
        isOpen={isDeleteModalOpen}
        title="게시글을 삭제하시겠어요?"
        message="게시글과 등록된 댓글이 모두 삭제되며 복구할 수 없습니다."
        variant="danger"
        confirmLabel="삭제"
        isPending={isDeleting}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={removeArticle}
      />
    </main>
  );
}
