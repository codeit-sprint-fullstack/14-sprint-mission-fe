import styles from "./ConfirmDeleteModal.module.css";

export default function ConfirmDeleteModal({ isOpen, onCancel, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.iconWrapper}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="12" fill="#F74747" />
            <path
              d="M8 12L11 15L16 9"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p className={styles.message}>정말로 상품을 삭제하시겠어요?</p>

        <div className={styles.buttonGroup}>
          <button className={styles.cancelButton} onClick={onCancel}>
            취소
          </button>
          <button className={styles.confirmButton} onClick={onConfirm}>
            네
          </button>
        </div>
      </div>
    </div>
  );
}