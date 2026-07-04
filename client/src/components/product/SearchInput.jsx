import { useState } from 'react'
import searchIcon from '../../assets/ic_search.png'

import styles from './SearchInput.module.css'

function SearchInput({type, placeholder, setKeyword, setPage}) {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setKeyword(inputValue)
    setPage(1)
  }

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <button className={styles.searchBtn} type='submit'>
        <img className={styles.seachIcon} src={searchIcon} alt="검색 아이콘" />
      </button>
      <input 
        className={styles.searchInput} 
        type={type}
        value={inputValue}
        placeholder={placeholder}
        onChange={(e) => {setInputValue(e.target.value)}}
      />
    </form>
  )
}

export default SearchInput