import styles from './Textarea.module.css'

function Textarea({ label, id, placeholder }) {
  return (
    <div className={styles.wrapper}>
      <label 
        className={styles.label}
        htmlFor={id}
      >
        {label}
      </label>
      <textarea 
       className={styles.textarea}
        id={id} 
        name={id} 
        placeholder={placeholder}
      >
      </textarea>
    </div>
  )
}

export default Textarea