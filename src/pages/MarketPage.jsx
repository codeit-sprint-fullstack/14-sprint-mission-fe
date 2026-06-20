import { useEffect, useMemo, useState } from 'react';
import ScrollTopButton from '../components/ScrollTopButton.jsx';
import useBreakpoint from '../hooks/useBreakpoint.js';
import useProducts from '../hooks/useProducts.js';
import { goToMarketTop, handleMobileHeaderClick } from '../utils/navigation.js';

const FALLBACK_IMAGE = '/images/Img_home_01.png';
const LOGO_IMAGE = '/images/panda-logo.png';
const PAGE_SIZE = {
  desktop: { best: 4, products: 15 },
  tablet: { best: 2, products: 6 },
  mobile: { best: 1, products: 4 },
};
const ORDER_LABELS = {
  recent: '최신순',
  favorite: '좋아요순',
};

const socialLinks = [
  ['https://www.facebook.com/', '/images/ic_facebook.png', 'Facebook'],
  ['https://x.com/', '/images/ic_twitter.png', 'X'],
  ['https://www.youtube.com/', '/images/ic_youtube.png', 'YouTube'],
  ['https://www.instagram.com/', '/images/ic_instagram.png', 'Instagram'],
];

function formatPrice(price) {
  return `${Number(price || 0).toLocaleString('ko-KR')}원`;
}

function getProductImage(product) {
  return product?.images?.[0] || product?.image || FALLBACK_IMAGE;
}

function ProductCard({ product, isLoading = false }) {
  return (
    <article className={`market-product-card ${isLoading ? 'is-loading' : ''}`}>
      <img
        className="market-product-card__image"
        src={getProductImage(product)}
        alt={product?.name || '상품 이미지'}
        loading="lazy"
        onError={(event) => {
          event.currentTarget.src = FALLBACK_IMAGE;
        }}
      />
      <div className="market-product-card__body">
        <h3 className="market-product-card__name">{product?.name || '불러오는 중'}</h3>
        <p className="market-product-card__price">{formatPrice(product?.price)}</p>
        <p className="market-product-card__favorite">
          <span aria-hidden="true">♡</span>
          <span>{Number(product?.favoriteCount || 0).toLocaleString('ko-KR')}</span>
        </p>
      </div>
    </article>
  );
}

function ProductGrid({ products, pageSize, isLoading, type }) {
  const list = isLoading
    ? Array.from({ length: pageSize }, (_, index) => ({ id: `loading-${type}-${index}` }))
    : products;

  return (
    <div className={`market-product-grid market-${type}-grid`}>
      {list.map((product) => (
        <ProductCard key={product.id || `${type}-${product.name}`} product={product} isLoading={isLoading} />
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

function MarketHeader() {
  const handleLogoClick = (event) => {
    event.preventDefault();
    goToMarketTop();
  };

  return (
    <header className="market-header" onClick={handleMobileHeaderClick}>
      <div className="market-header__inner">
        <nav className="market-header__left" aria-label="주요 메뉴">
          <a className="market-logo" href="#/market" onClick={handleLogoClick} aria-label="판다마켓 최상단으로 이동">
            <img className="market-logo__image" src={LOGO_IMAGE} alt="" />
            <span className="market-logo__text">판다마켓</span>
          </a>
          <a className="market-nav-link" href="#free-board">자유게시판</a>
          <a className="market-nav-link" href="#top">중고마켓</a>
        </nav>
        <a className="market-login" href="#/login">로그인</a>
      </div>
    </header>
  );
}

function MarketFooter() {
  return (
    <footer className="market-footer">
      <div className="market-footer__inner">
        <p className="market-footer__copy">©codeit - 2024</p>
        <nav className="market-footer__links" aria-label="푸터 메뉴">
          <a href="#/policy">Privacy Policy</a>
          <a href="#/faq">FAQ</a>
        </nav>
        <div className="market-footer__socials">
          {socialLinks.map(([href, src, label]) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
              <img src={src} alt="" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

function MarketPage() {
  const breakpoint = useBreakpoint();
  const sizes = PAGE_SIZE[breakpoint];
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState('recent');
  const [searchValue, setSearchValue] = useState('');
  const [keyword, setKeyword] = useState('');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const bestProducts = useProducts({ page: 1, pageSize: sizes.best, orderBy: 'favorite' });
  const products = useProducts({ page, pageSize: sizes.products, keyword, orderBy });

  useEffect(() => {
    setPage(1);
  }, [breakpoint, keyword, orderBy]);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setKeyword(searchValue.trim());
    }, 350);

    return () => window.clearTimeout(timerId);
  }, [searchValue]);

  useEffect(() => {
    if (!isSortOpen) {
      return undefined;
    }

    const closeSort = (event) => {
      if (!event.target.closest('.market-sort-control')) {
        setIsSortOpen(false);
      }
    };

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setIsSortOpen(false);
      }
    };

    document.addEventListener('click', closeSort);
    document.addEventListener('keydown', closeOnEscape);

    return () => {
      document.removeEventListener('click', closeSort);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isSortOpen]);

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

  const selectOrder = (nextOrderBy) => {
    setOrderBy(nextOrderBy);
    setIsSortOpen(false);
  };

  return (
    <div className="market-page" id="top">
      <MarketHeader />
      <main className="market-main">
        <section className="market-section market-best-section" aria-labelledby="best-title">
          <h1 id="best-title" className="market-section-title">베스트 상품</h1>
          {bestProducts.error ? (
            <p className="market-product-status">{bestProducts.error}</p>
          ) : (
            <ProductGrid products={bestProducts.list} pageSize={sizes.best} isLoading={bestProducts.isLoading} type="best" />
          )}
        </section>

        <section className="market-section market-sale-section" aria-labelledby="sale-title">
          <div className="market-sale-toolbar">
            <h2 id="sale-title" className="market-section-title">판매 중인 상품</h2>
            <div className="market-sale-actions">
              <form className="market-search-form" role="search" onSubmit={submitSearch}>
                <label className="sr-only" htmlFor="product-search">상품 검색</label>
                <span className="market-search-form__icon" aria-hidden="true" />
                <input
                  id="product-search"
                  type="search"
                  placeholder="검색할 상품을 입력해주세요"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  autoComplete="off"
                />
              </form>
              <a className="market-register-button" href="#register">상품 등록하기</a>
              <div className={`market-sort-control ${isSortOpen ? 'is-open' : ''}`}>
                <button
                  className="market-sort-button"
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={isSortOpen}
                  onClick={() => setIsSortOpen((current) => !current)}
                >
                  <span className="market-sort-button__label">{ORDER_LABELS[orderBy]}</span>
                  <span className="market-sort-button__icon" aria-hidden="true" />
                </button>
                <ul className="market-sort-menu" role="listbox" tabIndex="-1">
                  {Object.entries(ORDER_LABELS).map(([value, label]) => (
                    <li key={value}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={orderBy === value}
                        onClick={() => selectOrder(value)}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <p className="market-product-status" aria-live="polite">{statusText}</p>
          {products.error ? (
            <p className="market-product-status">{products.error}</p>
          ) : (
            <ProductGrid products={products.list} pageSize={sizes.products} isLoading={products.isLoading} type="products" />
          )}
          <Pagination page={page} totalCount={products.totalCount} pageSize={sizes.products} onPageChange={setPage} />
        </section>
      </main>
      <ScrollTopButton />
      <MarketFooter />
    </div>
  );
}

export default MarketPage;
