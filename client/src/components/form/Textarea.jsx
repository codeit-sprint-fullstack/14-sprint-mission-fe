import styles from './Textarea.module.css';

export default function Textarea({ label, id, placeholder, value, onChange }) {
  return (
    <div className={styles.wrapper}>
      <label 
        htmlFor={id} 
        className={styles.label}
      >
        {label}
      </label>
      <textarea 
        className={styles.input}
        id={id} 
        name={id} 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}