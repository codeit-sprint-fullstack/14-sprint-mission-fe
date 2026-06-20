import Header from './components/Header.jsx'
import BestItemList from './components/BestItemList.jsx'
import ItemList from './components/ItemList.jsx'
import Footer from './components/Footer.jsx'
import axios from './utils/axios.js'
import { useEffect, useState } from 'react'

function App() {
  const [bestItemList, setBestItemList] = useState([])
  const [itemList, setItemList] = useState([])

  const getBestItemList = async () => {
    const res = await axios.get('/products', {
      params: {
        pageSize: 4,
        orderBy: 'favorite',
      }
    })
    const { list } = res.data
    setBestItemList(list)
  }

  const getItemList = async () => {
    const res = await axios.get('/products', {
      params: {
        pageSize: 10,
      }
    })
    const { list } = res.data
    setItemList(list)
  }

  useEffect(() => {
    getBestItemList()
    getItemList()
  }, [])

  return (
    <>
      <Header />
      <BestItemList bestItems={bestItemList} />
      <ItemList items={itemList}/>
      <Footer />
    </>
  )
}

export default App
