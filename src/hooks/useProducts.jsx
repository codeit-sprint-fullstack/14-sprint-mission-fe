import { useEffect, useState } from 'react'
import axios from '../utils/axios.js'

function useProducts(page, pageSize, bestPageSize, orderBy, keyword) {
  const [itemList, setItemList] = useState([])
  const [bestItemList, setBestItemList] = useState([])
  const [totalCount, setTotalCount] = useState(0)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const getItemList = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await axios.get('/products', {
        params: {
          page,
          pageSize,
          orderBy,
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

  const getBestItemList = async () => {
    try {
      const res = await axios.get('/products', {
        params: {
          pageSize: bestPageSize,
          orderBy: 'favorite',
        }
      })
      const { list } = res.data
      setBestItemList(list)
    } catch (err) {
      setError('베스트 상품을 불러오지 못했습니다')
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
    bestItemList, 
    totalCount, 
    isLoading, 
    error 
  }
}

export default useProducts