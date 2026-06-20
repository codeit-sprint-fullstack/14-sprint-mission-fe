import Header from './components/Header.jsx'
import BestItemList from './components/BestItemList.jsx'
import ItemList from './components/ItemList.jsx'
import Pagination from './components/Pagination.jsx'
import Footer from './components/Footer.jsx'
import searchIcon from './assets/ic_search.png'
import caretIcon from './assets/ic_caret.png'
import axios from './utils/axios.js'
import { useEffect, useState } from 'react'
import styles from './App.module.css'

function App() {
  const [bestItemList, setBestItemList] = useState([])
  const [itemList, setItemList] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [page, setPage] = useState(1)
  const [orderBy, setOrderBy] = useState('recent')
  const [keyword, setKeyword] = useState('')

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

  const getItemList = async () => {
    const res = await axios.get('/products', {
      params: {
        page,
        pageSize: 10,
        orderBy,
        keyword,
      }
    })
    const { totalCount ,list } = res.data
    setItemList(list)
    setTotalCount(totalCount)
  }

  useEffect(() => {
    getItemList()
  },[page, orderBy, keyword])

  const pages = [1, 2, 3, 4, 5]

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.bestItemSection}>
          <header>
            <h2 className={styles.title}>베스트 상품</h2>
          </header>
          <BestItemList bestItems={bestItemList} />
        </section>
        <section>
          <header className={styles.header}>
            <h2 className={styles.title}>판매 중인 상품</h2>
            <div className={styles.headerRight}>
              <div className={styles.searchBox}>
                <img className={styles.searchIcon} src={searchIcon} alt="" />
                <input 
                  className={styles.searchInput} 
                  type="text" 
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="검색할 상품을 입력해주세요"
                />
              </div>
              <a className={styles.registerLink} href="/">상품 등록하기</a>
              <div className={styles.dropdownBox}>
                <button className={styles.dropdownBtn} onClick={() => setIsOpen(!isOpen)}>
                  {orderBy === 'recent' ? '최신순' : '좋아요순'}
                  <img className={styles.caretIcon} src={caretIcon} alt="" />
                </button>
                {isOpen && 
                  <ul className={styles.dropdownMenu} >
                    <li>
                      <button onClick={(e) => {
                        setOrderBy('recent') 
                        setIsOpen(false)
                      }}>
                        최신순
                      </button>
                    </li>
                    <li>
                      <button onClick={(e) => {
                        setOrderBy('favorite')
                        setIsOpen(false)
                      }}>
                        좋아요순
                      </button>
                    </li>
                  </ul>
                }
              </div>
            </div>
          </header>
          <ItemList items={itemList}/>
          <div className={styles.pagination}>
            <Pagination pages={pages}/>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App