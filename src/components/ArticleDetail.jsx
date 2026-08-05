'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deleteArticle, getArticle } from '../../services/ArticleService.js';
import { formatDate, getLikeCount, getNickname } from '../utils/articleDisplay.js';
import KebabMenu from './KebabMenu';
import CommentSection from './CommentSection';
import Footer from './Footer';

function ArticleDetail({ articleId }) {
  const router = useRouter();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    setLoading(true);
    setError(null);

    getArticle(articleId)
      .then((data) => {
        if (!ignore) setArticle(data);
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

  const handleDelete = async () => {
    if (!window.confirm('게시글을 삭제하시겠습니까?')) return;

    try {
      await deleteArticle(articleId);
      router.push('/board');
    } catch {
      window.alert('삭제에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <>
      <div className="main">
        <div className="inner">
          {loading && <div className="articleStatus">로딩 중...</div>}

          {!loading && error && (
            <div className="articleStatus">게시글을 불러오지 못했습니다.</div>
          )}

          {!loading && !error && article && (
            <>
              <article className="articleDetail">
                <div className="articleDetailHeader">
                  <h1 className="articleDetailTitle">{article.title}</h1>
                  <KebabMenu
                    onEdit={() => router.push(`/board/${article.id}/edit`)}
                    onDelete={handleDelete}
                  />
                </div>

                <div className="articleDetailMeta">
                  <span className="articleAvatar" aria-hidden="true" />
                  <span className="articleNickname">{getNickname(article.id)}</span>
                  <span className="articleDate">{formatDate(article.createdAt)}</span>
                  <span className="articleLike">♡ {getLikeCount(article.id)}</span>
                </div>

                <p className="articleDetailContent">{article.content}</p>
              </article>

              <CommentSection articleId={article.id} />

              <div className="backToListRow">
                <Link className="backToListBtn" href="/board">목록으로 돌아가기 ↩</Link>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ArticleDetail;
