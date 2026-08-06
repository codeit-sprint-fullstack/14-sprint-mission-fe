'use client';

const ICONS = {
  danger: '!',
  success: '✓',
  info: 'i',
};

export default function AlertMessage({ message, variant = 'success', onClose }) {
  if (!message) return null;

  return (
    <div className={`alert-message alert-message--${variant}`} role="status">
      <span className="alert-message__icon" aria-hidden="true">{ICONS[variant] || ICONS.info}</span>
      <p>{message}</p>
      {onClose ? (
        <button type="button" aria-label="알림 닫기" onClick={onClose}>×</button>
      ) : null}
    </div>
  );
}
