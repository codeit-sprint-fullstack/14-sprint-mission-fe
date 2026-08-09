import styles from "@/styles/Input.module.css";

export default function Input({
  className = "",
  variant = "primary",
  ...props
}) {
  return (
    <input
      className={`${styles.input} ${styles[variant]} ${className}`}
      {...props}
    />
  );
}