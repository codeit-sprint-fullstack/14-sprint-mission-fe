'use client';

import { useEffect, useId } from 'react';

const ICONS = {
  danger: '!',
  success: '✓',
  info: 'i',
};

export default function AlertModal({
  isOpen,
  title,
  message,
  variant = 'info',
  confirmLabel = '확인',
  cancelLabel = '취소',
  showCancel = true,
  isPending = false,
  onCancel,
  onConfirm,
}) {
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return undefined;

    function closeOnEscape(event) {
      if (event.key === 'Escape' && !isPending) onCancel?.();
    }

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen, isPending, onCancel]);

  if (!isOpen) return null;

  return (
    <div className={`alert-modal alert-modal--${variant}`} role="presentation">
      <button
        className="alert-modal__backdrop"
        type="button"
        aria-label="알림창 닫기"
        disabled={isPending}
        onClick={onCancel}
      />
      <section className="alert-modal__dialog" role="alertdialog" aria-modal="true" aria-labelledby={titleId}>
        <span className="alert-modal__icon" aria-hidden="true">{ICONS[variant] || ICONS.info}</span>
        <h2 id={titleId}>{title}</h2>
        {message ? <p>{message}</p> : null}
        <div className={`alert-modal__actions ${showCancel ? '' : 'is-single'}`}>
          {showCancel ? (
            <button type="button" disabled={isPending} onClick={onCancel}>{cancelLabel}</button>
          ) : null}
          <button className="is-confirm" type="button" disabled={isPending} onClick={onConfirm}>
            {isPending ? '처리 중' : confirmLabel}
          </button>
        </div>
      </section>
    </div>
  );
}
