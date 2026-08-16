import styles from "./Modal.module.css";

export default function Modal({ message, onConfirm }) {
  return (
    <>
      <div className={styles.dim}>
        <div className={styles.modalBox}>
          <p>{message}</p>
          <button className="btStyle" type="button" onClick={onConfirm}>
            확인
          </button>
        </div>
      </div>
    </>
  );
}
