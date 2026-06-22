import { useEffect, useState } from 'react'
import axios from '../utils/axios.js'

function UseProducts(page, pageSize, bestPageSize, orderBy, keyword) {
  const [itemList, setItemList] = useState([])
  const [bestItemList, setBestItemList] = useState([])
  const [totalCount, setTotalCount] = useState(0)

  const getItemList = async () => {
    const res = await axios.get('/products', {
      params: {
        page,
        pageSize,
        orderBy,
        keyword,
      }
    })

    const { list, totalCount } = res.data
    setItemList(list)
    setTotalCount(totalCount)
  }

  const getBestItemList = async () => {
    const res = await axios.get('/products', {
      params: {
        pageSize: bestPageSize,
        orderBy: 'favorite',
      }
    })
    const { list } = res.data
    setBestItemList(list)
  }

  useEffect(() => {
    getItemList()
  }, [page, pageSize, orderBy, keyword])

  useEffect(() => {
      getBestItemList()
    }, [bestPageSize])

  return { itemList, bestItemList, totalCount }
}

export default UseProducts