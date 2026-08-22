'use client';

import AlertModal from './AlertModal';

export default function MessageModal({ message, onClose }) {
  return (
    <AlertModal
      isOpen={Boolean(message)}
      title="알림"
      message={message}
      variant="info"
      showCancel={false}
      onCancel={onClose}
      onConfirm={onClose}
    />
  );
}
