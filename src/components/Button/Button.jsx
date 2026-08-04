import Link from "next/link";
import styles from "./Button.module.css";

export default function Button({
  children,
  href,
  type = "button",
  disabled = false,
  className = "",
}) {
  const buttonClassName = `${styles.button} ${className}`;

  if (href) {
    return (
      <Link href={href} className={buttonClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} className={buttonClassName}>
      {children}
    </button>
  );
}
