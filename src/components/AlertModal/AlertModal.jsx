import Button from "../Button/Button";
import styles from "./AlertModal.module.css";

export default function AlertModal({ isOpen, message, onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal} role="dialog" aria-modal="true">
        <p className={styles.message}>{message}</p>

        <Button
          type="button"
          className={styles.confirmButton}
          onClick={onClose}
        >
          확인
        </Button>
      </div>
    </div>
  );
}
