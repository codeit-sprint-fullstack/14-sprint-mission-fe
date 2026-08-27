import React from "react";
import style from "./warningmodal.module.css";

function WarningModal({ message, onClose, onPermit }) {
    return (
        <div className={style.overlay}>
            <div className={style.modal}>
                <div className={style.top}>
                    <img src="/assets/ic_check.svg" alt="check"/>
                    <span>{message}</span>
                </div>
                <div className={style.button}>
                    <button className={style.close} onClick={onClose}>
                        <span>취소</span>
                    </button>
                    <button className={style.permit} onClick={onPermit}>
                        <span>확인</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WarningModal;