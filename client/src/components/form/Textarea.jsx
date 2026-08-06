import styles from './Textarea.module.css';

export default function Textarea({ label, id, placeholder, value, onChange, variant = 'default' }) {
  const labelClassName = `
   ${styles.label}
   ${variant === 'editComment' ? styles.editLabel : ''}
  `;
  
  const inputClassName = `
    ${styles.input}
    ${variant === 'createComment' ? styles.createComment : '' }
    ${variant === 'editComment' ? styles.editComment : '' }
  `;

  return (
    <div className={styles.wrapper}>
      <label 
        htmlFor={id} 
        className={labelClassName}
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