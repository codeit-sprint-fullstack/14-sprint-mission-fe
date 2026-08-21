"use client";

import { useEffect } from "react";
import styles from "./ErrorModal.module.css";

export default function ErrorModal({ message, onClose }) {
  useEffect(() => {
    if (!message) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      className={styles.overlay}
      role="presentation"
      onClick={onClose}
    >
      <div
        className={styles.modal}
        role="alertdialog"
        aria-modal="true"
        aria-describedby="error-modal-message"
        onClick={(e) => e.stopPropagation()}
      >
        <p id="error-modal-message" className={styles.message}>
          {message}
        </p>
        <button
          type="button"
          className={styles.confirmButton}
          onClick={onClose}
          autoFocus
        >
          확인
        </button>
      </div>
    </div>
  );
}