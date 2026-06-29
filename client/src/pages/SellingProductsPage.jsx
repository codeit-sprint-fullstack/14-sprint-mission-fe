import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProducts } from '../api/productApi'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'
import Dropdown from '../components/Dropdown'
import searchIcon from '../assets/ic_search.svg'
import './MarketPage.css'

function SellingProductsPage() {
  // useNavigate() : 페이지를 코드로 이동시키는 React Router Hook
  const navigate = useNavigate()

  const [products, setProducts] = useState([])
  const [sort, setSort] = useState('recent')
  const [searchInput, setSearchInput] = useState('')
  const [keyword, setKeyword] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  const pageGroupSize = 5
  const totalPages = Math.ceil(totalCount / pageSize)

  const currentGroup = Math.ceil(currentPage / pageGroupSize)
  const startPage = (currentGroup - 1) * pageGroupSize + 1
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages)

  const pageNumbers = []

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i)
  }

  const updatePageSize = () => {
    const width = window.innerWidth

    if (width >= 1200) {
      setPageSize(10)
    } else if (width >= 768) {
      setPageSize(6)
    } else {
      setPageSize(4)
    }

    setCurrentPage(1)
  }

  const fetchProducts = async () => {
    const offset = (currentPage - 1) * pageSize
    const data = await getProducts({
      sort,
      offset,
      pageSize,
      keyword,
    })
    console.log('API 응답:', data)
    setProducts(data.list)
    setTotalCount(data.totalCount)
  }

  useEffect(() => {
    updatePageSize()

    window.addEventListener('resize', updatePageSize)

    return () => {
      window.removeEventListener('resize', updatePageSize)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [keyword, currentPage, pageSize, sort])

  return (
    <main className="market-background">
      <div className="market-page">
        <section className="products">
          <div className="products-function">
            <h2>판매 중인 상품</h2>

            <div className="products-function-right">
              <div className="search-box">
                <img src={searchIcon} alt="" className="search-icon" />
                <input
                  className="search-input"
                  value={searchInput}
                  placeholder="검색할 상품을 입력해주세요"
                  onChange={(e) => {
                    setSearchInput(e.target.value)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setKeyword(searchInput)
                      setCurrentPage(1)
                    }
                  }}
                />
              </div>

              <button
                className="btn-register"
                onClick={() => {
                  navigate('/registration')
                }}
              >
                상품 등록하기
              </button>

              <Dropdown
                orderBy={sort}
                onChangeOrderBy={(nextSort) => {
                  setSort(nextSort)
                  setCurrentPage(1)
                }}
              />
            </div>
          </div>

          <div className="products-cards">
            {products.length === 0 ? (
              <p>검색 결과가 없습니다.</p>
            ) : (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            )}
          </div>

          <Pagination
            page={currentPage}
            totalPages={totalPages}
            pageNumbers={pageNumbers}
            onChangePage={setCurrentPage}
          />
        </section>
      </div>
    </main>
  )
}

export default SellingProductsPage
