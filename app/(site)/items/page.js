import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import ScrollTopButton from '@/components/ScrollTopButton';
import { getProductList } from '@/lib/external-api';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: '중고마켓',
  description: '판다마켓에서 판매 중인 중고 상품을 검색해 보세요.',
};

const PAGE_SIZE = 15;

function toSingleValue(value) {
  return Array.isArray(value) ? value[0] : value;
}

function parsePage(value) {
  const parsed = Number(toSingleValue(value));
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

function formatPrice(price) {
  return `${Number(price || 0).toLocaleString('ko-KR')}원`;
}

function getPageNumbers(currentPage, totalPages) {
  const visibleCount = 5;
  const half = Math.floor(visibleCount / 2);
  let start = Math.max(1, currentPage - half);
  const end = Math.min(totalPages, start + visibleCount - 1);
  start = Math.max(1, end - visibleCount + 1);
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function ProductCard({ product }) {
  return (
    <article className="market-product-card">
      <SafeImage
        className="market-product-card__image"
        src={product.image}
        alt={product.name}
        loading="lazy"
      />
      <div className="market-product-card__body">
        <h3 className="market-product-card__name">{product.name}</h3>
        <p className="market-product-card__price">{formatPrice(product.price)}</p>
        {product.createdAt ? (
          <p className="market-product-card__date">
            {new Date(product.createdAt).toLocaleDateString('ko-KR')}
          </p>
        ) : null}
      </div>
    </article>
  );
}

function Pagination({ page, totalCount, keyword }) {
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const pages = getPageNumbers(Math.min(page, totalPages), totalPages);
  const hrefFor = (targetPage) => {
    const params = new URLSearchParams();
    if (keyword) params.set('q', keyword);
    if (targetPage > 1) params.set('page', String(targetPage));
    const query = params.toString();
    return query ? `/items?${query}` : '/items';
  };

  return (
    <nav className="market-pagination" aria-label="상품 목록 페이지">
      <Link
        className={`market-pagination__button ${page <= 1 ? 'is-disabled' : ''}`}
        href={hrefFor(Math.max(1, page - 1))}
        aria-disabled={page <= 1}
        aria-label="이전 페이지"
      >‹</Link>
      {pages.map((pageNumber) => (
        <Link
          key={pageNumber}
          className={`market-pagination__button ${pageNumber === page ? 'is-active' : ''}`}
          href={hrefFor(pageNumber)}
          aria-current={pageNumber === page ? 'page' : undefined}
        >{pageNumber}</Link>
      ))}
      <Link
        className={`market-pagination__button ${page >= totalPages ? 'is-disabled' : ''}`}
        href={hrefFor(Math.min(totalPages, page + 1))}
        aria-disabled={page >= totalPages}
        aria-label="다음 페이지"
      >›</Link>
    </nav>
  );
}

export default async function ItemsPage({ searchParams }) {
  const filters = await searchParams;
  const page = parsePage(filters.page);
  const keyword = String(toSingleValue(filters.q) || '').trim();
  const products = await getProductList({
    page,
    pageSize: PAGE_SIZE,
    keyword,
  });
  const statusText = products.totalCount
    ? `총 ${products.totalCount.toLocaleString('ko-KR')}개 상품`
    : '검색 결과가 없습니다.';

  return (
    <div className="market-page" id="top">
      <div className="market-floating-panel">
        <div className="market-floating-controls" aria-label="상품 검색, 정렬과 등록">
          <form className="market-search-form" role="search" action="/items">
            <label className="sr-only" htmlFor="product-search">상품 검색</label>
            <span className="market-search-form__icon" aria-hidden="true" />
            <input
              id="product-search"
              name="q"
              type="search"
              placeholder="검색할 상품을 입력해주세요"
              defaultValue={keyword}
              autoComplete="off"
            />
          </form>
          <div className="market-sort-control">
            <button className="market-sort-button" type="button" aria-label="상품 정렬 기준 최신순">
              <span className="market-sort-button__label">최신순</span>
              <span className="market-sort-button__icon" aria-hidden="true" />
            </button>
          </div>
          <Link className="market-register-button" href="/registration">상품 등록하기</Link>
        </div>
        <ScrollTopButton />
      </div>
      <div className="market-desktop-scroll-slot"><ScrollTopButton /></div>

      <main className="market-main">
        <section className="market-section market-sale-section" aria-labelledby="sale-title">
          <div className="market-sale-toolbar">
            <h1 id="sale-title" className="market-section-title">판매 중인 상품</h1>
          </div>
          <p className="market-product-status" aria-live="polite">{statusText}</p>
          <div className="market-product-grid market-products-grid">
            {products.list.map((product) => (
              <Link key={product.id} className="market-product-card-link" href={`/items/${product.id}`}>
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
          <Pagination page={page} totalCount={products.totalCount} keyword={keyword} />
        </section>
      </main>
    </div>
  );
}
