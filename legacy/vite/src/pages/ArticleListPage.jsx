import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';
import useArticles from '../hooks/useArticles.js';
import useBreakpoint from '../hooks/useBreakpoint.js';

const FALLBACK_IMAGE = '/images/Img_home_01.png';
const PAGE_SIZE = {
  desktop: 5,
  tablet: 5,
  mobile: 3,
};

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

function getPageNumbers(currentPage, totalPages) {
  const visibleCount = 5;
  const half = Math.floor(visibleCount / 2);
  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, start + visibleCount - 1);
  start = Math.max(1, end - visibleCount + 1);

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function ArticlePagination({ page, totalCount, pageSize, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const pages = getPageNumbers(page, totalPages);

  return (
    <nav className="board-pagination" aria-label="게시글 목록 페이지">
      <button type="button" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>‹</button>
      {pages.map((pageNumber) => (
        <button
          type="button"
          key={pageNumber}
          className={pageNumber === page ? 'is-active' : ''}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button type="button" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>›</button>
    </nav>
  );
}

function BestArticleCard({ article }) {
  return (
    <Link className="board-best-card" to={`/free-board/${article.id}`}>
      <span className="board-best-badge"><span aria-hidden="true" />Best</span>
      <div className="board-best-card__content">
        <h3>{article.title}</h3>
        <img src={article.image || FALLBACK_IMAGE} alt="" />
      </div>
      <div className="board-article-meta">
        <span>총명한판다</span>
        <span aria-hidden="true">♡ 9999+</span>
        <time>{formatDate(article.createdAt)}</time>
      </div>
    </Link>
  );
}

function ArticleRow({ article }) {
  return (
    <Link className="board-article-row" to={`/free-board/${article.id}`}>
      <div className="board-article-row__body">
        <h3>{article.title}</h3>
        <div className="board-article-meta">
          <span className="board-avatar" aria-hidden="true" />
          <span>총명한 판다</span>
          <time>{formatDate(article.createdAt)}</time>
        </div>
      </div>
      <img src={article.image || FALLBACK_IMAGE} alt="" />
      <span className="board-like">♡ 9999+</span>
    </Link>
  );
}

function ArticleListPage() {
  const breakpoint = useBreakpoint();
  const pageSize = PAGE_SIZE[breakpoint];
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [keyword, setKeyword] = useState('');
  const articles = useArticles({ page, pageSize, keyword });

  useEffect(() => {
    setPage(1);
  }, [breakpoint, keyword]);

  useEffect(() => {
    const timerId = window.setTimeout(() => setKeyword(searchValue.trim()), 350);
    return () => window.clearTimeout(timerId);
  }, [searchValue]);

  const bestArticles = useMemo(() => {
    const count = breakpoint === 'desktop' ? 2 : 1;
    return articles.list.slice(0, count);
  }, [articles.list, breakpoint]);

  const submitSearch = (event) => {
    event.preventDefault();
    setKeyword(searchValue.trim());
  };

  return (
    <div className="board-page">
      <Header logoMode="market" />
      <main className="board-main">
        <section className="board-section" aria-labelledby="best-articles-title">
          <h1 id="best-articles-title" className="board-title">베스트 게시글</h1>
          <div className="board-best-grid">
            {bestArticles.length ? (
              bestArticles.map((article) => <BestArticleCard key={article.id} article={article} />)
            ) : (
              <div className="board-empty-card">게시글을 불러오는 중입니다.</div>
            )}
          </div>
        </section>

        <section className="board-section board-list-section" aria-labelledby="articles-title">
          <div className="board-list-header">
            <h2 id="articles-title" className="board-title">게시글</h2>
            <Link className="board-primary-button" to="/free-board/new">글쓰기</Link>
          </div>

          <div className="board-toolbar">
            <form className="board-search-form" role="search" onSubmit={submitSearch}>
              <label className="sr-only" htmlFor="article-search">게시글 검색</label>
              <span className="board-search-icon" aria-hidden="true" />
              <input
                id="article-search"
                type="search"
                placeholder="검색할 게시글을 입력해주세요"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
              />
            </form>
            <button className="board-sort-button" type="button" aria-label="게시글 정렬 최신순">
              <span>최신순</span>
              <span className="board-sort-icon" aria-hidden="true" />
            </button>
          </div>

          <p className="board-status" aria-live="polite">
            {articles.error || (articles.isLoading ? '게시글을 불러오는 중입니다.' : `총 ${articles.totalCount}개 게시글`)}
          </p>

          <div className="board-article-list">
            {articles.list.map((article) => <ArticleRow key={article.id} article={article} />)}
          </div>

          <ArticlePagination
            page={page}
            totalCount={articles.totalCount}
            pageSize={pageSize}
            onPageChange={setPage}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default ArticleListPage;
