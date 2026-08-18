'use client'

import styles from './AlertModal.module.css'

function AlertModal({ message, onClose }) {
  return (
    <div className={styles.overlay}>
      <div
        className={styles.modal}
        role="alertdialog"
        aria-modal="true"
        aria-describedby="alert-modal-message"
      >
        <p id="alert-modal-message" className={styles.message}>
          {message}
        </p>
        <button
          type="button"
          className={styles.confirmButton}
          onClick={onClose}
        >
          확인
        </button>
      </div>
    </div>
  )
}

export default AlertModal
