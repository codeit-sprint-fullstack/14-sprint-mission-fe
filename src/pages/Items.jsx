import { useState } from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

import './Items.css'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import ProductList from '../components/ProductList.jsx'
import useSaleProducts from '../hooks/useSaleProducts.js'

function Items() {

  const PAGE_SIZE = 10

  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(1)

  const {
    products: saleProducts,
    totalCount,
    isLoading: isSaleLoading,
    error: saleError,
  } = useSaleProducts({
    page,
    pageSize: PAGE_SIZE,
    orderBy: 'recent',
    keyword,
  })

  const totalPages = Math.max(
    1,
    Math.ceil(totalCount / PAGE_SIZE),
  )

  const isFirstPage = page === 1
  const isLastPage = page >= totalPages

  const MAX_VISIBLE_PAGES = 5

  const startPage = Math.max(
    1,
    Math.min(
      page - 2,
      totalPages - MAX_VISIBLE_PAGES + 1,
    ),
  )

  const endPage = Math.min(
    totalPages,
    startPage + MAX_VISIBLE_PAGES - 1,
  )

  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  )

  return (
    <>
      <Header>
        <NavLink to="/" end className={({ isActive }) => `header-menu-link ${isActive ? 'nav-active' : 'nav-link'}`}>자유게시판</NavLink>
        <NavLink to="/items" className={({ isActive }) => `header-menu-link ${isActive ? 'nav-active' : 'nav-link'}`}>중고마켓</NavLink>
      </Header>

      <main className="flea-market">
        <div className="flea-market-container">

          <section className="product-section all-product-section">
            <div className="product-section-heading">
              <h2 className="product-section-title">
                판매 중인 상품
              </h2>

              <div className="product-toolbar">
                <input
                  type="search"
                  className="product-search-input"
                  placeholder="검색할 상품을 입력해주세요"
                  aria-label="상품 검색"
                  value={keyword}
                  onChange={(event) => {
                    setKeyword(event.target.value)
                    setPage(1)
                  }}
                />
                <Link to="/registration" className="product-register-button">상품 등록하기</Link>

                <span className="product-order-label">
                  최신순
                </span>
              </div>
            </div>

            {isSaleLoading && (
              <p className="product-status-message">
                판매 상품을 불러오는 중입니다.
              </p>
            )}

            {!isSaleLoading && saleError && (
              <p className="product-status-message product-error-message">
                판매 상품을 불러오지 못했습니다.
              </p>
            )}

            {!isSaleLoading && !saleError && (
              <>
                <ProductList
                  products={saleProducts}
                  list="all-product-list"
                />

                {totalCount > 0 && (
                  <div className="product-pagination">
                    <button
                      type="button"
                      className="product-page-arrow"
                      disabled={isFirstPage}
                      aria-label="이전 페이지"
                      onClick={() => {
                        setPage((previousPage) =>
                          Math.max(previousPage - 1, 1),
                        )
                      }}
                    >
                      ‹
                    </button>

                    {visiblePages.map((pageNumber) => {
                      return (
                        <button
                          type="button"
                          key={pageNumber}
                          className={`product-page-number ${page === pageNumber ? 'product-page-number-active' : ''
                            }`}
                          aria-current={page === pageNumber ? 'page' : undefined}
                          onClick={() => {
                            setPage(pageNumber)
                          }}
                        >
                          {pageNumber}
                        </button>
                      )
                    })}

                    <button
                      type="button"
                      className="product-page-arrow"
                      disabled={isLastPage}
                      aria-label="다음 페이지"
                      onClick={() => {
                        setPage((previousPage) =>
                          Math.min(previousPage + 1, totalPages),
                        )
                      }}
                    >
                      ›
                    </button>
                  </div>
                )}
              </>
            )}

          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default Items