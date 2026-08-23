import Button from "@/components/Button/Button";
import Image from "next/image";
import styles from "./ConfirmModal.module.css";

export default function ConfirmModal({
  isOpen,
  message,
  onCancel,
  onConfirm,
  isPending = false,
}) {
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget && !isPending) {
      onCancel();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal} role="dialog" aria-modal="true">
        <span className={styles.icon} aria-hidden="true">
          <Image src="/images/ic_check.svg" alt="" width={12} height={12} />
        </span>

        <p className={styles.message}>{message}</p>

        <div className={styles.actions}>
          <Button
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
            disabled={isPending}
          >
            취소
          </Button>

          <Button
            type="button"
            className={styles.confirmButton}
            onClick={onConfirm}
            disabled={isPending}
          >
            {isPending ? "삭제 중..." : "네"}
          </Button>
        </div>
      </div>
    </div>
  );
}
