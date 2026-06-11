export function showModal(message) {
  const modalOverlay =
    document.querySelector('#modal-overlay');

  const modalMessage =
    document.querySelector('#modal-message');

  modalMessage.textContent = message;
  modalOverlay.classList.add('show');
}

export function closeModal() {
  document
    .querySelector('#modal-overlay')
    .classList.remove('show');
}

export function initModal() {
  const modalConfirm =
    document.querySelector('#modal-confirm');

  modalConfirm.addEventListener(
    'click',
    closeModal
  );
}