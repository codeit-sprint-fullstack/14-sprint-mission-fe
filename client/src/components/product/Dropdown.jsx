import { useState } from 'react'
import caretIcon from '../../assets/ic_caret.png'
import sortIcon from '../../assets/ic_sort.png'

import styles from './Dropdown.module.css'

function Dropdown({ setOrderBy }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className={styles.wrapper}>
      <button 
        className={styles.sortBtn} 
        type='button'
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles.btnContent}>
          <p className={styles.btnText}>최신순</p>
          <img className={styles.caretIcon} src={caretIcon} alt="" />
        </div>
        <img className={styles.sortIcon} src={sortIcon} alt="정렬 아이콘" />
      </button>
      {isOpen && 
        <ul className={styles.sortMenu}>
          <li>
            <button 
              className={`${styles.sortItem} ${styles.firstItem}`}
              type='button'
              onClick={() => {
                setIsOpen(false)
                setOrderBy('recent')
              }}
            >
              최신순
            </button>
          </li>
          <li>
            <button 
              className={styles.sortItem}
              type='button'
              onClick={() => {
                setIsOpen(false)
              }}
            >
              좋아요순
            </button>
          </li>
        </ul>
      }
    </div>
  )
}

export default Dropdown