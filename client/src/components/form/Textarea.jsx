import styles from './Textarea.module.css'

function Textarea({ label, id, error, ...props }) {
  return (
    <div className={styles.wrapper}>
      <label 
        className={styles.label}
        htmlFor={id}
      >
        {label}
      </label>
      <textarea 
       className={`${styles.textarea} ${error ? styles.errorTextarea : ''}`}
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

export default Textarea