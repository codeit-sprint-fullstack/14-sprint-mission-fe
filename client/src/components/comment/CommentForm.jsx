'use client';

import { useState } from 'react';
import Textarea from '../form/Textarea';
import SubmitButton from '../form/SubmitButton';
import styles from './CommentForm.module.css';

export default function CommentForm({ action }) {
  const [content, setContent] = useState('');

  // 인풋에 모든 값이 입력되었을 때만 등록 버튼 활성화
  const isFormEmpty = 
    content.trim() === ''
  
  // AI 도움으로 문제 해결: 댓글 생성하면 input value 초기화
  async function handleAction(formData) {
    await action(formData);

    setContent('');
  }

  return (
    <form action={handleAction}>
      <Textarea
        label='댓글 달기'
        type='text'
        id='content'
        placeholder='댓글을 입력해주세요'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        variant='comment'
      />
      <div className={styles.submitBtn}>
        <SubmitButton disabled={isFormEmpty}>
          등록
        </SubmitButton>
      </div>
    </form>
  )
}