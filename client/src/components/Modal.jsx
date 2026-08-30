import styles from './Modal.module.css';

export default function Modal({ onClose, message }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <p className={styles.message}>
          {message}
        </p>
        <button 
          className={styles.closeBtn}
          type='button' 
          onClick={onClose}
        >
          확인
        </button>
      </div>
    </div>
  )
}