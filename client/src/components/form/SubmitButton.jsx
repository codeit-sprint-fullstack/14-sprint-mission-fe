'use client';

import { useFormStatus } from 'react-dom';
import styles from './SubmitButton.module.css';

export default function SubmitButton({ children = '등록', disabled }) {
  const { pending } = useFormStatus();

  return (
      <button
        className={styles.submitBtn}
        type='submit' 
        disabled={disabled|| pending}
      >
        {pending ? '등록 중' : children}
      </button>
  )
}