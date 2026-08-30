import styles from "@/styles/Modal.module.css";
import { useEffect } from "react";
export default function Modal({ message, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return()=>{
      document.body.style.overflow = "";
    }
  }, [])
  return (
    <>
      <div className={styles.dim}></div>
      <div className={styles.modalWrap}>
        <div className={styles.modalCont}>
          <div className={styles.modalTxt}>
            <p>{message}</p>
          </div>
          <button className={styles.btnModal} onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    </>
  )
}