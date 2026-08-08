import styles from "./Input.module.css";

export default function Input({
  label,
  type,
  id,
  placeholder,
  value,
  onChange,
  error,
}) {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        className={`${styles.input} ${error ? styles.error : ""}`}
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
}
