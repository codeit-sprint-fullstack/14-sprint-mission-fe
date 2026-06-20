function MessageModal({ message, onClose }) {
  if (!message) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" role="presentation">
      <button className="absolute inset-0 bg-gray-900/45" type="button" onClick={onClose} aria-label="닫기" />
      <section
        className="relative flex w-full max-w-sm flex-col items-center gap-6 rounded-2xl bg-white px-6 py-7 text-center shadow-modal"
        role="alertdialog"
        aria-modal="true"
      >
        <p className="text-base font-semibold leading-6 text-gray-800">{message}</p>
        <button className="primary-button h-11 px-10 text-base" type="button" onClick={onClose}>
          확인
        </button>
      </section>
    </div>
  );
}

export default MessageModal;
