'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import SafeImage from './SafeImage';
import AlertMessage from './AlertMessage';
import { getArticleList } from '@/lib/client-api';

const DESKTOP_PAGE_SIZE = 5;
const MOBILE_PAGE_SIZE = 3;
const SORT_OPTIONS = [
  { value: 'recent', label: '최신 순' },
  { value: 'like', label: '좋아요 순' },
];

function formatDate(value) {
  if (!value) return '';
  return new Date(value).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

function formatLikeCount(value) {
  const count = Number(value || 0);
  return count > 9999 ? '9999+' : count.toLocaleString('ko-KR');
}

function getPageNumbers(currentPage, totalPages) {
  const visibleCount = 5;
  const half = Math.floor(visibleCount / 2);
  let start = Math.max(1, currentPage - half);
  const end = Math.min(totalPages, start + visibleCount - 1);
  start = Math.max(1, end - visibleCount + 1);
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function BestArticleCard({ article }) {
  return (
    <Link className="board-best-card" href={`/free-board/${article.id}`}>
      <span className="board-best-badge"><span aria-hidden="true" />Best</span>
      <div className="board-best-card__content">
        <h3>{article.title}</h3>
        <SafeImage src={article.image} alt="" />
      </div>
      <div className="board-article-meta">
        <span>총명한판다</span>
        <span aria-label={`좋아요 ${formatLikeCount(article.likeCount)}개`}>♡ {formatLikeCount(article.likeCount)}</span>
        <time>{formatDate(article.createdAt)}</time>
      </div>
    </Link>
  );
}

function ArticleRow({ article }) {
  return (
    <Link className="board-article-row" href={`/free-board/${article.id}`}>
      <div className="board-article-row__body">
        <h3>{article.title}</h3>
        <div className="board-article-meta">
          <span className="board-avatar" aria-hidden="true" />
          <span>총명한 판다</span>
          <time>{formatDate(article.createdAt)}</time>
        </div>
      </div>
      <SafeImage src={article.image} alt="" />
      <span className="board-like" aria-label={`좋아요 ${formatLikeCount(article.likeCount)}개`}>
        ♡ {formatLikeCount(article.likeCount)}
      </span>
    </Link>
  );
}

function ArticlePagination({ page, totalCount, pageSize, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const pages = getPageNumbers(Math.min(page, totalPages), totalPages);

  return (
    <nav className="board-pagination" aria-label="게시글 목록 페이지">
      <button type="button" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>‹</button>
      {pages.map((pageNumber) => (
        <button
          type="button"
          key={pageNumber}
          className={pageNumber === page ? 'is-active' : ''}
          aria-current={pageNumber === page ? 'page' : undefined}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button type="button" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>›</button>
    </nav>
  );
}

export default function ArticleBoard({
  initialKeyword = '',
  initialOrderBy = 'recent',
  initialPage = 1,
  initialNotice = '',
}) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(initialKeyword);
  const [keyword, setKeyword] = useState(initialKeyword);
  const [orderBy, setOrderBy] = useState(initialOrderBy);
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(DESKTOP_PAGE_SIZE);
  const [articles, setArticles] = useState({ list: [], totalCount: 0 });
  const [bestArticles, setBestArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [deleteNotice, setDeleteNotice] = useState(initialNotice);
  const [isSortOpen, setIsSortOpen] = useState(false);

  useEffect(() => {
    if (!isSortOpen) return undefined;

    function closeSortOptions(event) {
      if (event.key === 'Escape') setIsSortOpen(false);
    }

    window.addEventListener('keydown', closeSortOptions);
    return () => window.removeEventListener('keydown', closeSortOptions);
  }, [isSortOpen]);

  useEffect(() => {
    if (!deleteNotice) return undefined;
    const timerId = window.setTimeout(() => setDeleteNotice(''), 2500);
    return () => window.clearTimeout(timerId);
  }, [deleteNotice]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 46.4375rem)');
    const updatePageSize = () => setPageSize(mediaQuery.matches ? MOBILE_PAGE_SIZE : DESKTOP_PAGE_SIZE);
    updatePageSize();
    mediaQuery.addEventListener('change', updatePageSize);
    return () => mediaQuery.removeEventListener('change', updatePageSize);
  }, []);

  useEffect(() => {
    let ignore = false;
    getArticleList({ page: 1, pageSize: 3, orderBy: 'recent' })
      .then((data) => {
        if (!ignore) setBestArticles(Array.isArray(data.list) ? data.list : []);
      })
      .catch(() => {
        if (!ignore) setBestArticles([]);
      });
    return () => { ignore = true; };
  }, []);

  useEffect(() => {
    let ignore = false;
    getArticleList({ page, pageSize, keyword, orderBy })
      .then((data) => {
        if (ignore) return;
        setArticles({
          list: Array.isArray(data.list) ? data.list : [],
          totalCount: Number(data.totalCount || 0),
        });
      })
      .catch((error) => {
        if (ignore) return;
        setArticles({ list: [], totalCount: 0 });
        setStatus(error.message || '게시글을 불러오지 못했습니다.');
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });
    return () => { ignore = true; };
  }, [keyword, orderBy, page, pageSize]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(articles.totalCount / pageSize)),
    [articles.totalCount, pageSize],
  );

  function updateUrl(next = {}) {
    const nextKeyword = next.keyword ?? keyword;
    const nextOrderBy = next.orderBy ?? orderBy;
    const nextPage = next.page ?? page;
    const params = new URLSearchParams();
    if (nextKeyword) params.set('q', nextKeyword);
    if (nextOrderBy !== 'recent') params.set('orderBy', nextOrderBy);
    if (nextPage > 1) params.set('page', String(nextPage));
    router.replace(params.size ? `/free-board?${params.toString()}` : '/free-board', { scroll: false });
  }

  function submitSearch(event) {
    event.preventDefault();
    const nextKeyword = searchValue.trim();
    setIsLoading(true);
    setStatus('');
    setKeyword(nextKeyword);
    setPage(1);
    updateUrl({ keyword: nextKeyword, page: 1 });
  }

  function changeOrder(nextOrderBy) {
    setIsSortOpen(false);
    if (nextOrderBy === orderBy) return;

    setIsLoading(true);
    setStatus('');
    setOrderBy(nextOrderBy);
    setPage(1);
    updateUrl({ orderBy: nextOrderBy, page: 1 });
  }

  function changePage(nextPage) {
    const safePage = Math.min(Math.max(1, nextPage), totalPages);
    setIsLoading(true);
    setStatus('');
    setPage(safePage);
    updateUrl({ page: safePage });
    window.scrollTo({ top: 540, behavior: 'smooth' });
  }

  return (
    <main className="board-main">
      <AlertMessage
        message={deleteNotice}
        variant="success"
        onClose={() => setDeleteNotice('')}
      />

      <section className="board-section" aria-labelledby="best-articles-title">
        <h1 id="best-articles-title" className="board-title">베스트 게시글</h1>
        <div className="board-best-grid">
          {bestArticles.length
            ? bestArticles.map((article) => <BestArticleCard key={article.id} article={article} />)
            : <div className="board-empty-card">등록된 게시글이 없습니다.</div>}
        </div>
      </section>

      <section className="board-section board-list-section" aria-labelledby="articles-title">
        <div className="board-list-header">
          <h2 id="articles-title" className="board-title">게시글</h2>
          <Link className="board-primary-button" href="/free-board/new">글쓰기</Link>
        </div>

        <div className="board-toolbar">
          <form className="board-search-form" role="search" onSubmit={submitSearch}>
            <label className="sr-only" htmlFor="article-search">게시글 제목 검색</label>
            <button className="board-search-icon" type="submit" aria-label="검색" />
            <input
              id="article-search"
              type="search"
              placeholder="검색할 게시글을 입력해주세요"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
          </form>
          <div className={`board-sort-control ${isSortOpen ? 'is-open' : ''}`}>
            <button
              className="board-sort-trigger"
              type="button"
              aria-label="게시글 정렬"
              aria-expanded={isSortOpen}
              aria-controls="article-sort-options"
              onClick={() => setIsSortOpen((isOpen) => !isOpen)}
            >
              <span>{SORT_OPTIONS.find((option) => option.value === orderBy)?.label}</span>
              <span className="board-sort-chevron" aria-hidden="true" />
            </button>
            {isSortOpen ? (
              <div id="article-sort-options" className="board-sort-options" aria-label="정렬 방식 선택">
                {SORT_OPTIONS.map((option) => (
                  <button
                    className={option.value === orderBy ? 'is-selected' : ''}
                    type="button"
                    key={option.value}
                    aria-pressed={option.value === orderBy}
                    onClick={() => changeOrder(option.value)}
                  >
                    <span>{option.label}</span>
                    <span className="board-sort-check" aria-hidden="true">
                      {option.value === orderBy ? '✓' : ''}
                    </span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <p className="board-status" aria-live="polite">
          {status || (isLoading ? '게시글을 불러오는 중입니다.' : `총 ${articles.totalCount}개 게시글`)}
        </p>
        <div className="board-article-list">
          {articles.list.map((article) => <ArticleRow key={article.id} article={article} />)}
          {!isLoading && !status && !articles.list.length ? (
            <p className="board-empty-list">검색 결과가 없습니다.</p>
          ) : null}
        </div>
        <ArticlePagination
          page={page}
          totalCount={articles.totalCount}
          pageSize={pageSize}
          onPageChange={changePage}
        />
      </section>
    </main>
  );
}
