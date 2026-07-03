import { useEffect, useState } from 'react'
import axios from '../utils/axios.js'

function useProducts(page, pageSize, orderBy, keyword) {
  const [itemList, setItemList] = useState([])
  const [totalCount, setTotalCount] = useState(0)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const getItemList = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await axios.get('/products', {
        params: {
          sort: orderBy,
          limit: pageSize,
          offset: (page - 1) * pageSize,
          keyword,
        }
      })

      const {list, totalCount } = res.data

      setItemList(list)
      setTotalCount(totalCount)
    } catch (err) {
      setError('상품 데이터를 불러오지 못했습니다')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getItemList()
  }, [page, pageSize, orderBy, keyword])

  useEffect(() => {
      getBestItemList()
    }, [bestPageSize])

  return { 
    itemList, 
    totalCount, 
    isLoading, 
    error 
  }
}

export default useProducts