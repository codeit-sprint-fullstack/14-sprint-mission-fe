import React from "react";
import style from "./modal.module.css";

function Modal({ message, onClose }) {
  return (
    <div className={style.overlay}>
      <div className={style.modal}>
        <span>{message}</span>
        <button onClick={onClose}>
            <span>확인</span></button>
      </div>
    </div>
  );
}

export default Modal;
