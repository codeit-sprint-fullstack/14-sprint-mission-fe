'use client';

import { useState } from 'react';
import SubmitButton from '@/components/form/SubmitButton';
import Input from '@/components/form/Input';
import Textarea from '@/components/form/Textarea';
import styles from './ArticleForm.module.css';

export default function ArticleForm({ action, initialTitle = '', initialContent = '', submitText = '등록' }) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  // 인풋에 모든 값이 입력되었을 때만 등록 버튼 활성화
  const isFormEmpty =
    title.trim() === '' || 
    content.trim() === '';

  return (
    <form action={action} className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          게시글 쓰기
        </h1>
        <SubmitButton disabled={isFormEmpty}>
          {submitText}
        </SubmitButton>
      </div>
      <div className={styles.formInput}>
        <Input 
          label='*제목' 
          type='text' 
          id='title' 
          placeholder='제목을 입력해주세요'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea 
          label='*내용' 
          id='content' 
          placeholder='내용을 입력해주세요'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </form>
  )
}