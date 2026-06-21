import styles from '../css/Button.module.css';

function Button({ className = '', variant = 'primary', ...props }) {
  return (
    <button className={`${styles.button} ${styles[variant]} ${className}`} {...props} />
  );
}

export default Button;