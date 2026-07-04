import { useCallback, useEffect, useState } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import { PRODUCT_ORDER_BY } from '../../constants/product'
import { getProductList } from '../../services/ProductService'
import ProductCard from './components/ProductCard'
import ProductToolbar from './components/ProductToolbar'
import Pagination from './components/Pagination'
import useDebouncedValue from '../../hooks/useDebouncedValue'
import useProductPageSize from '../../hooks/useProductPageSize'
import './ItemsPage.css'

const ItemsPage = () => {
  const [products, setProducts] = useState([])
  const [keywordInput, setKeywordInput] = useState('')
  const [orderBy, setOrderBy] = useState(PRODUCT_ORDER_BY.RECENT)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const keyword = useDebouncedValue(keywordInput)

  const resetPage = useCallback(() => {
    setPage(1)
  }, [])

  const pageSize = useProductPageSize(resetPage)

  const handleKeywordChange = (nextKeyword) => {
    setKeywordInput(nextKeyword)
    setPage(1)
  }

  const handleOrderByChange = (nextOrderBy) => {
    setOrderBy(nextOrderBy)
    setPage(1)
  }

  useEffect(() => {
    let ignore = false

    const fetchProducts = async () => {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const offset = (page - 1) * pageSize.all

        const productData = await getProductList({
          offset,
          limit: pageSize.all,
          keyword,
          orderBy,
        })

        if (ignore) return

        setTotalPages(Math.ceil(productData.totalCount / pageSize.all))
        setProducts(productData.list)
      } catch (error) {
        if (ignore) return

        setErrorMessage(error.message)
        setProducts([])
        setTotalPages(1)
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    fetchProducts()

    return () => {
      ignore = true
    }
  }, [page, pageSize.all, keyword, orderBy])

  return (
    <MainLayout>
      <div className="items-page">
        <section className="items-section">
          <div className="items-section-header">
            <h2 className="items-section-title">판매 중인 상품</h2>
            <ProductToolbar
              keyword={keywordInput}
              orderBy={orderBy}
              onKeywordChange={handleKeywordChange}
              onOrderByChange={handleOrderByChange}
            />
          </div>
          {errorMessage ? (
            <p className="items-message">{errorMessage}</p>
          ) : isLoading ? (
            <p className="items-message">상품을 불러오는 중...</p>
          ) : (
            <div className="all-products-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </section>
      </div>
    </MainLayout>
  )
}

export default ItemsPage
