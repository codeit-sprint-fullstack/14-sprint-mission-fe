'use client';

import { useFormStatus } from 'react-dom';

export default function SubmitButton({ children = '등록', disabled }) {
  const { pending } = useFormStatus();

  return (
      <button type='submit' disabled={disabled|| pending}>
        {pending ? '등록 중' : children}
      </button>
  )
}