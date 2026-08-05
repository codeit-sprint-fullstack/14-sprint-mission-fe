import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getArticle } from '../../services/ArticleService.js';
import { formatDate, getLikeCount, getNickname } from '../utils/articleDisplay.js';
import Footer from '../components/Footer';
import '../styles/board.css';

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    setLoading(true);
    setError(null);

    getArticle(id)
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
  }, [id]);

  return (
    <>
      <div className="main">
        <div className="inner">
          {loading && <div className="articleStatus">로딩 중...</div>}

          {!loading && error && (
            <div className="articleStatus">게시글을 불러오지 못했습니다.</div>
          )}

          {!loading && !error && article && (
            <article className="articleDetail">
              <h1 className="articleDetailTitle">{article.title}</h1>

              <div className="articleDetailMeta">
                <span className="articleAvatar" aria-hidden="true" />
                <span className="articleNickname">{getNickname(article.id)}</span>
                <span className="articleDate">{formatDate(article.createdAt)}</span>
                <span className="articleLike">♡ {getLikeCount(article.id)}</span>
              </div>

              <p className="articleDetailContent">{article.content}</p>

              <Link className="backToListBtn" to="/board">목록으로 돌아가기</Link>
            </article>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ArticleDetail;
