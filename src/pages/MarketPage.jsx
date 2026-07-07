import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';
import ScrollTopButton from '../components/ScrollTopButton.jsx';
import useBreakpoint from '../hooks/useBreakpoint.js';
import useProducts from '../hooks/useProducts.js';

const FALLBACK_IMAGE = '/images/Img_home_01.png';
const PAGE_SIZE = {
  desktop: { products: 15 },
  tablet: { products: 9 },
  mobile: { products: 8 },
};

function formatPrice(price) {
  return `${Number(price || 0).toLocaleString('ko-KR')}원`;
}

function ProductCard({ product, isLoading = false }) {
  return (
    <article className={`market-product-card ${isLoading ? 'is-loading' : ''}`}>
      <img
        className="market-product-card__image"
        src={product?.image || FALLBACK_IMAGE}
        alt={product?.name || '상품 이미지'}
        loading="lazy"
        onError={(event) => {
          event.currentTarget.src = FALLBACK_IMAGE;
        }}
      />
      <div className="market-product-card__body">
        <h3 className="market-product-card__name">{product?.name || '불러오는 중'}</h3>
        <p className="market-product-card__price">{formatPrice(product?.price)}</p>
        {product?.createdAt ? (
          <p className="market-product-card__date">
            {new Date(product.createdAt).toLocaleDateString('ko-KR')}
          </p>
        ) : null}
      </div>
    </article>
  );
}

function ProductGrid({ products, pageSize, isLoading }) {
  const list = isLoading
    ? Array.from({ length: pageSize }, (_, index) => ({ id: `loading-products-${index}` }))
    : products;

  return (
    <div className="market-product-grid market-products-grid">
      {list.map((product) => (
        <Link
          key={product.id || product._id || product.name}
          className="market-product-card-link"
          to={product.id ? `/items/${product.id}` : '#'}
          tabIndex={isLoading ? -1 : 0}
          aria-disabled={isLoading}
        >
          <ProductCard product={product} isLoading={isLoading} />
        </Link>
      ))}
    </div>
  );
}

function getPageNumbers(currentPage, totalPages) {
  const visibleCount = 5;
  const half = Math.floor(visibleCount / 2);
  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, start + visibleCount - 1);
  start = Math.max(1, end - visibleCount + 1);

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function Pagination({ page, totalCount, pageSize, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const pages = getPageNumbers(page, totalPages);

  return (
    <nav className="market-pagination" aria-label="상품 목록 페이지">
      <button
        className="market-pagination__button"
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(Math.max(1, page - 1))}
        aria-label="이전 페이지"
      >
        ‹
      </button>
      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`market-pagination__button ${pageNumber === page ? 'is-active' : ''}`}
          type="button"
          onClick={() => onPageChange(pageNumber)}
          aria-label={pageNumber === page ? `현재 ${pageNumber}페이지` : `${pageNumber}페이지로 이동`}
        >
          {pageNumber}
        </button>
      ))}
      <button
        className="market-pagination__button"
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        aria-label="다음 페이지"
      >
        ›
      </button>
    </nav>
  );
}

function MarketSortFilter() {
  return (
    <div className="market-sort-control">
      <button className="market-sort-button" type="button" aria-label="상품 정렬 기준 최신순">
        <span className="market-sort-button__label">최신순</span>
        <span className="market-sort-button__icon" aria-hidden="true" />
      </button>
    </div>
  );
}

function MarketFloatingControls({ searchValue, onSearchChange, onSubmitSearch }) {
  return (
    <div className="market-floating-panel">
      <div className="market-floating-controls" aria-label="상품 검색, 정렬과 등록">
        <form className="market-search-form" role="search" onSubmit={onSubmitSearch}>
          <label className="sr-only" htmlFor="product-search">상품 검색</label>
          <span className="market-search-form__icon" aria-hidden="true" />
          <input
            id="product-search"
            type="search"
            placeholder="검색할 상품을 입력해주세요"
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            autoComplete="off"
          />
        </form>
        <MarketSortFilter />
        <Link className="market-register-button" to="/registration">상품 등록하기</Link>
      </div>
      <ScrollTopButton />
    </div>
  );
}

function MarketPage() {
  const breakpoint = useBreakpoint();
  const sizes = PAGE_SIZE[breakpoint];
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [keyword, setKeyword] = useState('');

  const products = useProducts({ page, pageSize: sizes.products, keyword });

  useEffect(() => {
    setPage(1);
  }, [breakpoint, keyword]);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setKeyword(searchValue.trim());
    }, 350);

    return () => window.clearTimeout(timerId);
  }, [searchValue]);

  const statusText = useMemo(() => {
    if (products.isLoading) {
      return '상품을 불러오는 중입니다.';
    }

    if (products.error) {
      return '상품 데이터를 불러오지 못했습니다.';
    }

    return products.totalCount ? `총 ${products.totalCount.toLocaleString('ko-KR')}개 상품` : '검색 결과가 없습니다.';
  }, [products.error, products.isLoading, products.totalCount]);

  const submitSearch = (event) => {
    event.preventDefault();
    setKeyword(searchValue.trim());
  };

  return (
    <div className="market-page" id="top">
      <Header logoMode="market" />
      <MarketFloatingControls
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onSubmitSearch={submitSearch}
      />
      <div className="market-desktop-scroll-slot">
        <ScrollTopButton />
      </div>
      <main className="market-main">
        <section className="market-section market-sale-section" aria-labelledby="sale-title">
          <div className="market-sale-toolbar">
            <h1 id="sale-title" className="market-section-title">판매 중인 상품</h1>
          </div>

          <p className="market-product-status" aria-live="polite">{statusText}</p>
          {products.error ? (
            <p className="market-product-status">{products.error}</p>
          ) : (
            <ProductGrid products={products.list} pageSize={sizes.products} isLoading={products.isLoading} />
          )}
          <Pagination page={page} totalCount={products.totalCount} pageSize={sizes.products} onPageChange={setPage} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default MarketPage;
