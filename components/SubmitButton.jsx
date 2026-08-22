'use client';

import { useFormStatus } from 'react-dom';

export default function SubmitButton({ children, pendingLabel = '등록 중', className, disabled = false }) {
  const { pending } = useFormStatus();

  return (
    <button className={className} type="submit" disabled={disabled || pending}>
      {pending ? pendingLabel : children}
    </button>
  );
}
