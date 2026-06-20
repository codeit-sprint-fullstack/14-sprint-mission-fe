import Header from './components/Header.jsx'
import BestItemList from './components/BestItemList.jsx'
import Footer from './components/Footer.jsx'
import axios from './utils/axios.js'
import { useEffect, useState } from 'react'

function App() {
  const [bestItemList, setBestItemList] = useState([])
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

  useEffect(() => {
    getBestItemList()
  }, [])

  return (
    <>
      <Header />
      <BestItemList bestItems={bestItemList} />
      <Footer />
    </>
  )
}

export default App
