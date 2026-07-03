import styles from  './Input.module.css'

function TagInput({ label, id, type, placeholder }) {
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
      />
    </div>
  )
}

export default TagInput