import styles from "../AuthForm/AuthForm.module.css";

export default function AuthInput({
  label,
  id,
  placeholder,
  error,
  registration,
}) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>

      <input
        id={id}
        className={`${styles.input} ${error ? styles.inputError : ""}`}
        type="text"
        placeholder={placeholder}
        {...registration}
      />

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
