import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import ProductCard from '../components/ProductCard.jsx'
import Pagination from '../components/Pagination.jsx'
import useProducts from '../hooks/useProducts.js'
// import useBestProducts from '../hooks/useBestProducts.js'
import useResponsivePageSize from '../hooks/useResponsivePageSize.js'
// import useBestProductSize from '../hooks/useBestProductSize.js'
import styles from './MarketPage.module.css'

function MarketPage() {
  // 페이지당 표시할 상품 개수
  const pageSize = useResponsivePageSize()
  // const bestPageSize = useBestProductSize()

  const [orderBy, setOrderBy] = useState('recent') // 최신순으로 정렬
  const [keyword, setKeyword] = useState('') //검색어 상태 | 검색어에 '의자' 입력하면 setKeyworkd('의자)
  const [page, setPage] = useState(1) // 현재 페이지 상태 | setPage(2)

  // 페이지 크기에 따라 전체 페이지 개수가 달라서
  // 크기가 달라지면 페이지를 첫 페이지로 돌아가게끔
  useEffect(() => {
    setPage(1)
  }, [pageSize])

  //상품 가져오기 | 커스텀 Hook 호출 | API에 요쳥을 보내서 products에 상품 목록 저장
  const { products, totalCount, isLoading, error } = useProducts({
    orderBy,
    keyword,
    page,
    pageSize,
  })
  // 베스트 상품 가져오기 | 커스텀 Hook 호출 | API에 요청을 보내서 products에 상품 목록 저장 | pageSize=4개만 가져오기
  // const { bestProducts } = useBestProducts({
  //   pageSize: bestPageSize,
  // })

  // 전체 페이지 수 계산 | 올림.( 전체상품수 / 페이지당상품개수 )
  const totalPages = Math.ceil(totalCount / pageSize)

  const navigate = useNavigate()

  return (
    <>
      <Header />
      <main className={styles.main}>
        {/* <section className={styles.section}>
          <h2 className={styles.bestTitle}>베스트 상품</h2>

          <div className={styles.bestGrid}> */}
        {/* bestProducts = [상품1, 상품2, 상품3, 상품4] 를 map으로 쪼개서 
            ProductCard.jsx의 ProductCard 함수로 전달되서 <ProductCard>를 하나씩 만들고
              variant="best"가 들어가서 .best{} 스타일 적용 */}
        {/* {bestProducts.map((product) => (
              <ProductCard key={product.id} product={product} variant="best" />
            ))}
          </div>
        </section> */}

        <section className={styles.section}>
          <div className={styles.productHeader}>
            <h2 className={styles.title}>판매 중인 상품</h2>
            <div className={styles.controls}>
              <div className={styles.searchBox}>
                <svg
                  className={styles.searchIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                >
                  <path
                    d="M6.89655 12.2605C8.37803 12.2605 9.6424 11.7401 10.6897 10.6992C11.7369 9.65837 12.2605 8.3908 12.2605 6.89655C12.2605 5.41507 11.7369 4.1507 10.6897 3.10345C9.6424 2.05619 8.37803 1.53257 6.89655 1.53257C5.4023 1.53257 4.13474 2.05619 3.09387 3.10345C2.053 4.1507 1.53257 5.41507 1.53257 6.89655C1.53257 8.3908 2.053 9.65837 3.09387 10.6992C4.13474 11.7401 5.4023 12.2605 6.89655 12.2605ZM6.89655 13.7931C5.9387 13.7931 5.04151 13.6111 4.20498 13.2471C3.36845 12.8831 2.64049 12.3914 2.02107 11.772C1.40166 11.1526 0.909962 10.4246 0.545977 9.58812C0.181992 8.7516 0 7.85441 0 6.89655C0 5.95147 0.181992 5.06066 0.545977 4.22414C0.909962 3.38761 1.40166 2.65645 2.02107 2.03065C2.64049 1.40485 3.36845 0.909962 4.20498 0.545977C5.04151 0.181992 5.9387 0 6.89655 0C7.84164 0 8.73244 0.181992 9.56897 0.545977C10.4055 0.909962 11.1367 1.40485 11.7625 2.03065C12.3883 2.65645 12.8831 3.38761 13.2471 4.22414C13.6111 5.06066 13.7931 5.95147 13.7931 6.89655C13.7931 7.71392 13.659 8.48659 13.3908 9.21456C13.1226 9.94253 12.7522 10.6066 12.2797 11.2069L14.7893 13.7165C14.9425 13.8697 15.016 14.0485 15.0096 14.2529C15.0032 14.4572 14.9234 14.636 14.7701 14.7893C14.6169 14.9298 14.4381 15 14.2337 15C14.0294 15 13.8506 14.9298 13.6973 14.7893L11.1877 12.2989C10.5875 12.7714 9.92337 13.1386 9.1954 13.4004C8.46743 13.6622 7.70115 13.7931 6.89655 13.7931Z"
                    fill="#9CA3AF"
                  />
                </svg>
                <input
                  value={keyword}
                  onChange={(e) => {
                    setKeyword(e.target.value)
                    setPage(1)
                  }}
                  placeholder="검색할 상품을 입력해주세요"
                  className={styles.searchInput}
                />
              </div>
              <button
                className={styles.registerButton}
                onClick={() => navigate('/registration')}
              >
                상품 등록하기
              </button>
              <select
                className={styles.sortSelect}
                value={orderBy}
                onChange={(e) => {
                  setOrderBy(e.target.value)
                  setPage(1)
                }}
              >
                <option value="recent">최신순</option>
                <option value="favorite">좋아요순</option>
              </select>
              <button className={styles.mobileSortButton} type="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M15 6.5V17.5M18.5 14L15 17.5L11.5 14"
                    stroke="#1F2937"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.90002 15.5L9.50002 15.5"
                    stroke="#1F2937"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M5 7.5H10"
                    stroke="#1F2937"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M6.30005 11.5L9.50005 11.5"
                    stroke="#1F2937"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* 상품 카드 배치
          products=[상품,상품,...]을 map으로 쪼개서 ProductCard로 만들고, variant="default" */}
          {/* error===null ->안보여줌 / error !== null ->에러 발생 */}
          {/* error ? ... : ... -> error가 있으면 에러메시지 / error가 없으면 상품 목록 */}
          {error ? (
            <p>상품을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.</p>
          ) : (
            <>
              <div className={styles.productGrid}>
                {isLoading ? (
                  <p>상품을 불러오는 중입니다...</p>
                ) : (
                  products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))
                )}
              </div>
              {/* 현재 페이지 / 전체 페이지 수 / 페이지 변경 함수 전달
          ex) 5클릭 -> setPage(5) -> 재렌더링 -> API 재요청 -> 5페이지 상품 출력 */}
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}

export default MarketPage

// useProducts : API를 호출해서 get으로 상품 목록을 받아와서 배열에 저장
// useState([])를 만들고, axios.get('/products)로 받아온 데이터를 setProducts(response.data.list)에 저장
// useBestProducts : API에게 get을 보내서 베스트 상품 4개의 목록만 받아와서 배열에 저장
//orderBy: 'favorite'로 고정해서 좋아요 순 상품 4개만 가져온다
// ProductCard : MarketPage로부터 1개의 상품을 받아와서 카드 형태로 화면에 렌더링
// Pagination : MarketPage로부터 페이지번호/페이지수/페이지변경함수 를 받아와서 페이지를 이동하고 useProducts를 이용해
//상품 목록을 다시 가져온다
// MarketPage : products 배열을 map으로 순회해서 ProductCard와 Pagination에 필요한 값을 넘겨줌
// 검색어 상태 관리, 정렬 기준 상태 관리, 현재 페이지 상태 관리, 상품 데이터를 각 컴포넌트에 전달, 화면 전체 구조

// 검색/정렬/페이지 클릭 -> MarketPage의 state 변경 -> useProducts가 API 재요청 -> products 배열 갱신
// -> MarketPage가 products.map 실행 -> ProductCard 여러 개 생성 -> 화면에 렌더링
