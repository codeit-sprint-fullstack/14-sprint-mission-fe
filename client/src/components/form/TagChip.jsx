import xIcon from '../../assets/ic_X.png'

import styles from './TagChip.module.css'

function TagChip({ tag, onClick }) {
  return (
    <div className={styles.tagChip}>
      <p>#{tag}</p>
      <button 
        className={styles.xBtn}
        type='button'
        onClick={onClick}
      >
        <img 
          className={styles.xIcon}
          src={xIcon} 
          alt='태그 삭제 아이콘' 
        />
      </button>
    </div>
  )
}

export default TagChip