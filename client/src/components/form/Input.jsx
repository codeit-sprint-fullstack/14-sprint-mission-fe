import styles from './Input.module.css'

function Input({ label, id, type, placeholder, value, onChange }) {
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
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default Input