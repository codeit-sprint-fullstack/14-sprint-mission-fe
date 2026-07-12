import { useState } from 'react'

import TagChip from './TagChip.jsx'

import styles from  './Input.module.css'

function TagInput({ label, id, tags, setTags, error, ...props }) {
    const [inputValue, setInputValue] = useState('')

  const handleEnter = (e) => {
    if (e.nativeEvent.isComposing) return
    if (e.key !== 'Enter') return
    e.preventDefault()

    const value = inputValue.trim()  // 공백 제거 
    if(!value) return  // 빈 문자열 추가되지 않도록 처리
    if (value.length > 5) return  // 5글자 초과 제한 - UX 향상
    if (tags.includes(value)) return  // 태그 중복 추가 제한

    setTags([...tags, value])
    setInputValue('')
  }

  const handleTagDelete = (deleteIndex) => {
    setTags(tags.filter((_, index) => index !== deleteIndex))
  }

  return (
    <div className={styles.wrapper}>
      <label 
        className={styles.label} 
        htmlFor={id}
      >
        {label}
      </label>
      <input 
        className={`${styles.input} ${error ? styles.errorInput : ''}`}
        id={id} 
        name={id} 
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleEnter}
        {...props}
      />
      {error && (
        <p className={styles.errorMsg}>{error}</p>
      )}
      <div>
        {tags.map((tag, index) => (
          <TagChip 
            key={tag} 
            tag={tag}
            onClick={() => handleTagDelete(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default TagInput