'use client';

import { useState } from 'react';
import Textarea from '../form/Textarea';
import SubmitButton from '../form/SubmitButton';
import styles from './CommentForm.module.css';

export default function CommentForm({ 
  action, 
  initialContent = '', 
  label,
  submitBtnText = '등록',
  onSuccess,
  onCancel,
  variant,
}) {
  const [content, setContent] = useState(initialContent);

  // 인풋에 모든 값이 입력되었을 때만 등록 버튼 활성화
  const isFormEmpty = 
    content.trim() === '';
  
  // AI 도움으로 문제 해결: 댓글 생성하면 input value 초기화
  async function handleAction(formData) {
    await action(formData);

    setContent('');
    onSuccess?.();
  }

  return (
    <form action={handleAction} className={styles.wrapper}>
      <Textarea
        label={label}
        type='text'
        id='content'
        placeholder='댓글을 입력해주세요'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        variant={variant}
      />
      <div className={styles.btns}>
        {onCancel && (
          <button
            className={styles.cancelBtn}
            type='button'
            onClick={onCancel}
          >
            취소
          </button>
        )}
        <SubmitButton 
          disabled={isFormEmpty}
        >
          {submitBtnText}
        </SubmitButton>
      </div>
    </form>
  )
}