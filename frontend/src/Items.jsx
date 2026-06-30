import { useState, useEffect } from "react"
import axios from "axios"
import ItemCard from "./ItemCard"
import { Link } from "react-router-dom"
import './Items.css'

function Items() {
  const [keyword, setKeyword] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [order, setOrder] = useState('createdAt')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [sortedItems, setSortedItems] = useState([])

  const fetchItems = async () => {
    const res = await axios.get(`http://localhost:3001/products`, {
      params: {
        order: order,
        page: page
      }})
    setSortedItems(res.data.products)
    setTotalPages(res.data.totalPages)
  }

useEffect(() => {
  fetchItems()
}, [order, page])

  const handleSearch = () => { }
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <>
      <div className='selling-line'>
        <div className='title'>판매중인 상품</div>

        <div className='search-box'>
          <input
            type="text"
            placeholder='검색할 상품을 입력해주세요'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch()
              }
            }}
          />
        </div>

        <Link to="/registration">
          <button className='register-button'>
            상품 등록하기
          </button>
        </Link>

        <div className='dropdown'>
          <button
            className='dropdown-button'
            onClick={() => setIsOpen(!isOpen)}
          >
            {order === 'recent'
              ? '최신순'
              : '좋아요순'}
            ▼
          </button>

          {isOpen && (
            <div className="dropdown-menu">
              <button onClick={() => {
                setOrder('createdAt')
                setIsOpen(false)
              }}>
                최신순
              </button>

              <button onClick={() => {
                setOrder('favoriteCount')
                setIsOpen(false)
              }}>
                좋아요순
              </button>
            </div>
          )}
        </div>
      </div>
      <div className='general-items'>{sortedItems.map((item) => (
        <ItemCard
          type="general"
          key={item._id}
          images={item.images}
          name={item.name}
          price={item.price}
          favoriteCount={item.favoriteCount}
        />
      ))}
      </div>


      <div className='pagination'>
        <button
          onClick={() => setPage(page - 1)}>
          {'<'}
        </button>

        {pageNumbers.map((pageNumber) => (
          <button key={pageNumber}
            onClick={() => setPage(pageNumber)}>{pageNumber}
          </button>
        ))}

        <button
          onClick={() => setPage(page + 1)}>
          {'>'}
        </button>

      </div>
    </>
  )
}

export default Items 