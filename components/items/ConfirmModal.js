import styles from "./ConfirmModal.module.css";

export default function ConfirmModal({ title, description, confirmText = "확인", isPending, onConfirm, onClose }) {
  return (
    <div className={styles.backdrop} role="presentation" onMouseDown={onClose}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="confirm-title" onMouseDown={(event) => event.stopPropagation()}>
        <h2 id="confirm-title">{title}</h2>
        {description && <p>{description}</p>}
        <div className={styles.actions}>
          <button type="button" className={styles.cancel} onClick={onClose} disabled={isPending}>취소</button>
          <button type="button" className={styles.confirm} onClick={onConfirm} disabled={isPending}>
            {isPending ? "처리 중..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
