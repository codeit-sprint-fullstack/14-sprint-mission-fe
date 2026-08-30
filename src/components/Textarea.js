import styles from "@/styles/Textarea.module.css";

export default function Textarea({
  className = "",
  variant = "primary",
  ...props
}) {
  return (
    <textarea
      className={`${styles.textarea} ${styles[variant]} ${className}`}
      {...props}
    />
  );
}