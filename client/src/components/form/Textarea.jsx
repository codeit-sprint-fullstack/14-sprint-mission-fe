import styles from './Textarea.module.css';

export default function Textarea({ label, id, placeholder, value, onChange, variant = 'default' }) {
  const inputClassName = `
    ${styles.input}
    ${variant === 'comment' ? styles.commentInput : ''}
  `;

  return (
    <div className={styles.wrapper}>
      <label 
        htmlFor={id} 
        className={styles.label}
      >
        {label}
      </label>
      <textarea 
        className={inputClassName}
        id={id} 
        name={id} 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}