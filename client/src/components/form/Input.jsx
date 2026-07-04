import styles from './Input.module.css'

function Input({ label, id, error, ...props }) {
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
        {...props}
      />
      {error && (
        <p className={styles.errorMsg}>{error}</p>
      )}
    </div>
  )
}

export default Input