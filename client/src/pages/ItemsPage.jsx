import { useState } from 'react'
import { Link } from 'react-router-dom'
import useMediaQuery from '../hooks/useMediaQuery.jsx'
import useProducts from '../hooks/useProducts.jsx'

import SearchInput from "../components/product/SearchInput.jsx"
import Dropdown from '../components/product/Dropdown.jsx'
import ItemList from '../components/product/ItemList.jsx'
import Pagination from '../components/product/Pagination.jsx'

import styles from './ItemsPage.module.css'

function ItemsPage() {
  const [orderBy, setOrderBy] = useState('recent')
  const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState('')

  const { pageSize } = useMediaQuery()
  const {totalCount, itemList, isLoading, error} 
    = useProducts(page, pageSize, orderBy, keyword)

  const totalPages = Math.ceil(totalCount / pageSize)
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)

  if (isLoading) {
    return <div>로딩중...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h2 className={styles.title}>판매 중인 상품</h2>
        <div className={styles.headerRight}>
          <div className={styles.searchArea}>
            <SearchInput
              type='text'
              placeholder='검색할 상품을 입력해주세요'
              setKeyword={setKeyword} 
              setPage={setPage}
            />
          </div>
          <Link className={styles.linkBtn} to='/registration'>
            상품 등록하기
          </Link>
          <div className={styles.dropdownArea}>
            <Dropdown setOrderBy={setOrderBy}/>
          </div>
        </div>
      </header>
      <section className={styles.itemList}>
        <ItemList itemList={itemList}/>
      </section>
      <Pagination
        page={page}
        setPage={setPage}
        pageNumbers={pageNumbers} 
      />
    </div>
  )
}

export default ItemsPage