import './FleaMarket.css'

import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import ProductList from '../components/ProductList.jsx'
import useSaleProducts from '../hooks/useSaleProducts.js'

function FleaMarket() {
  const {
    products: bestProducts,
    isLoading: isBestLoading,
    error: bestError,
  } = useSaleProducts({
    page: 1,
    pageSize: 4,
    orderBy: 'favorite',
    keyword: '',
  })

  const {
    products: saleProducts,
    isLoading: isSaleLoading,
    error: saleError,
  } = useSaleProducts({
    page: 1,
    pageSize: 10,
    orderBy: 'recent',
    keyword: '',
  })

  return (
    <>
      <Header>
        <a href="/-" className="header-menu-link">자유게시판</a>

        <a href="/-" className="header-menu-link">중고마켓</a>
      </Header>

      <main className="flea-market">
        <div className="flea-market-container">

          <section className="product-section">
            <h1 className="product-section-title">
              베스트 상품
            </h1>

            {isBestLoading && (
              <p className="product-status-message">
                베스트 상품을 불러오는 중입니다.
              </p>
            )}

            {!isBestLoading && bestError && (
              <p className="product-status-message product-error-message">
                베스트 상품을 불러오지 못했습니다.
              </p>
            )}

            {!isBestLoading && !bestError && (
              <ProductList
                products={bestProducts}
                list="best-product-list"
              />
            )}
          </section>

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
                />

                <button
                  type="button"
                  className="product-register-button"
                >
                  상품 등록하기
                </button>

                <select
                  className="product-order-select"
                  defaultValue="recent"
                  aria-label="상품 정렬 방식"
                >
                  <option value="recent">
                    최신순
                  </option>

                  <option value="favorite">
                    좋아요순
                  </option>
                </select>
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
              <ProductList
                products={saleProducts}
                list="all-product-list"
              />
            )}

          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default FleaMarket