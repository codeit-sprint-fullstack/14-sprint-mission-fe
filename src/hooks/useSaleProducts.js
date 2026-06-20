import { useEffect, useState } from 'react'
import axios from 'axios'

const PRODUCT_API_URL =
  'https://panda-market-api.vercel.app/products'

function useSaleProducts({
  page = 1,
  pageSize = 10,
  orderBy = 'recent',
  keyword = '',
}) {
  const [products, setProducts] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function getSaleProducts() {
      setIsLoading(true)
      setError(null)

      try {
        const response = await axios.get(
          PRODUCT_API_URL,
          {
            params: {
              page,
              pageSize,
              orderBy,
              keyword: keyword || undefined,
            },
          },
        )

        console.log(
          'GET /products 응답:',
          response.data,
        )

        const { list, totalCount } = response.data

        setProducts(list ?? [])
        setTotalCount(totalCount ?? 0)
      } catch (requestError) {
        console.error(
          '상품 목록 요청 실패:',
          requestError,
        )

        setProducts([])
        setTotalCount(0)
        setError(requestError)
      } finally {
        setIsLoading(false)
      }
    }

    getSaleProducts()
  }, [page, pageSize, orderBy, keyword])

  return {
    products,
    totalCount,
    isLoading,
    error,
  }
}

export default useSaleProducts