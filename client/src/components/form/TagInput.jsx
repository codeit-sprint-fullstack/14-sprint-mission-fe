import { useState } from 'react'

import TagChip from './TagChip.jsx'

import styles from  './Input.module.css'

function TagInput({ label, id, type, placeholder, tags, setTags }) {
    const [inputValue, setInputValue] = useState('')

  const handleEnter = (e) => {
    if (e.nativeEvent.isComposing) {
      return
    }

    if (e.key === 'Enter') {
      e.preventDefault()
      setTags([...tags, inputValue])
    }
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
        className={styles.input}
        id={id} 
        name={id} 
        type={type} 
        placeholder={placeholder} 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleEnter}
      />
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