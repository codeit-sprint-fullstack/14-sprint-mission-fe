import styles from './Input.module.css';

export default function Input({ label, type, id, placeholder, value, onChange }) {
  return (
    <div className={styles.wrapper}>
      <label 
        htmlFor={id} 
        className={styles.label}
      >
        {label}
      </label>
      <input
        className={styles.input}
        type={type} 
        id={id} 
        name={id} 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}