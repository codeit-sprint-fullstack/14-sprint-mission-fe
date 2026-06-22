import Header from './components/Header.jsx'
import BestItemList from './components/BestItemList.jsx'
import ItemList from './components/ItemList.jsx'
import Pagination from './components/Pagination.jsx'
import Footer from './components/Footer.jsx'

import searchIcon from './assets/ic_search.png'
import caretIcon from './assets/ic_caret.png'
import sortIcon from './assets/ic_sort.png'

import { useState } from 'react'
import styles from './App.module.css'

import useProducts from './hooks/useProducts.jsx'
import useMediaQuery from './hooks/useMediaQuery.jsx'

function App() {
  const [page, setPage] = useState(1)
  const [orderBy, setOrderBy] = useState('recent')
  const [keyword, setKeyword] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const { pageSize, bestPageSize } = useMediaQuery()
  const { 
    itemList, 
    bestItemList, 
    totalCount,
    isLoading,
    error,
   } = useProducts(page, pageSize, bestPageSize, orderBy, keyword)
  
  const totalPages = Math.ceil( totalCount / pageSize )
  const pages = Array.from({length: totalPages}).map((_, index) => index + 1)

  if (isLoading) {
    return <div>로딩중...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.bestItemSection}>
          <header className={styles.header}>
            <h2 className={styles.title}>베스트 상품</h2>
          </header>
          <BestItemList bestItems={bestItemList} />
        </section>
        <section className={styles.itemSection}>
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
                  <p className={styles.dropdownText}>
                    {orderBy === 'recent' ? '최신순' : '좋아요순'}
                    <img className={styles.caretIcon} src={caretIcon} alt="" />
                  </p>
                  <img className={styles.sortIcon} src={sortIcon} alt="" />
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
            <Pagination pages={pages} page={page} setPage={setPage}/>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App