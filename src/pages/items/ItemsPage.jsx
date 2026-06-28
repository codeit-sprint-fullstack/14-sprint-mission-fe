import { useEffect, useState } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import { PRODUCT_ORDER_BY } from '../../constants/product'
import { getProductList } from '../../services/ProductService'
import ProductCard from './components/ProductCard'
import ProductToolbar from './components/ProductToolbar'
import Pagination from './components/Pagination'
import './ItemsPage.css'

const getProductPageSize = () => {
  if (window.innerWidth < 768) {
    return {
      type: 'mobile',
      best: 1,
      all: 4,
    }
  }

  if (window.innerWidth < 1200) {
    return {
      type: 'tablet',
      best: 2,
      all: 6,
    }
  }

  return {
    type: 'desktop',
    best: 4,
    all: 10,
  }
}

const ItemsPage = () => {
  const [pageSize, setPageSize] = useState(getProductPageSize)
  const [bestProducts, setBestProducts] = useState([])
  const [products, setProducts] = useState([])
  const [keyword, setKeyword] = useState('')
  const [orderBy, setOrderBy] = useState(PRODUCT_ORDER_BY.RECENT)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const handleKeywordChange = (nextKeyword) => {
    setKeyword(nextKeyword)
    setPage(1)
  }

  const handleOrderByChange = (nextOrderBy) => {
    setOrderBy(nextOrderBy)
    setPage(1)
  }

  useEffect(() => {
    const handleResize = () => {
      const nextPageSize = getProductPageSize()

      if (pageSize.type === nextPageSize.type) {
        return
      }

      setPageSize(nextPageSize)
      setPage(1)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [pageSize.type])

  useEffect(() => {
    const fetchProducts = async () => {
      const [bestData, productData] = await Promise.all([
        getProductList(1, pageSize.best, '', PRODUCT_ORDER_BY.FAVORITE),
        getProductList(page, pageSize.all, keyword, orderBy),
      ])

      setTotalPages(Math.ceil(productData.totalCount / pageSize.all))
      setBestProducts(bestData.list)
      setProducts(productData.list)
    }

    fetchProducts()
  }, [page, pageSize, keyword, orderBy])

  return (
    <MainLayout>
      <div className="items-page">
        <section className="items-section">
          <h2 className="items-section-title">베스트 상품</h2>
          <div className="best-products-grid">
            {bestProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="items-section">
          <div className="items-section-header">
            <h2 className="items-section-title">판매 중인 상품</h2>
            <ProductToolbar
              keyword={keyword}
              orderBy={orderBy}
              onKeywordChange={handleKeywordChange}
              onOrderByChange={handleOrderByChange}
            />
          </div>
          <div className="all-products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
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
