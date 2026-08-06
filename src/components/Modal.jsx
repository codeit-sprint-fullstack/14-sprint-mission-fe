function Modal({ message, onClose }) {
  return (
    <div
      className="modal show"
      onClick={(e) => {
        if (e.target.classList.contains('modal')) onClose();
      }}
    >
      <div className="modal-content">
        <p>{message}</p>
        <button className="modal-btn" onClick={onClose}>확인</button>
      </div>
    </div>
  );
}

export default Modal;
