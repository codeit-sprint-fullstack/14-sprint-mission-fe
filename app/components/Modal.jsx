import styles from "./Modal.module.css";

export default function Modal({
  message,
  onConfirm,
  onCancel,
  confirmLabel = "확인",
}) {
  return (
    <div className={styles.dim}>
      <div className={styles.modalBox}>
        <p>{message}</p>
        <div>
          {onCancel && (
            <button className="btStyle" type="button" onClick={onCancel}>
              취소
            </button>
          )}
          <button className="btStyle" type="button" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
