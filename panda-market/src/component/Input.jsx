import styles from '../css/Input.module.css';

function Input({ className = '', variant = 'primary', ...props }) {
  return (
    <input
      className={`${styles.input} ${styles[variant]} ${className}`}
      {...props}
    />
  );
}
export default Input;