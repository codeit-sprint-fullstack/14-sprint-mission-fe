'use client';

import kebabIcon from '@/assets/ic_kebab.png';
import profileIcon from '@/assets/ic_profile.png';
import formatDate from '@/utils/formatDate';
import Image from 'next/image';
import { useState } from 'react';
import styles from './CommentCard.module.css';

export default function CommentCard({ comment, isWriter, onDelete, onUpdate, isPending }) {
  const [content, setContent] = useState(comment.content);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  function handelSumbit(e) {
    e.preventDefault();

    const nextContent = content.trim(); // 빈 값이면 수정 취소
    if (!nextContent) return;

    onUpdate(content);
    setIsEditing(false);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {isEditing ? (
          <form 
            className={styles.editForm} 
            onSubmit={handelSumbit}
          >
            <input 
              className={styles.editInput}
              type='text'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className={styles.formBtns}>
              <button
                className={styles.cancelBtn}
                type='button'
                onClick={() => {
                  setIsEditing(false)
                  setContent(comment.content)
                }}
              >
                취소
              </button>
              <button
                className={styles.confirmBtn}
                disabled={!content.trim() || isPending}
              >
                {isPending ? '수정 중...' : '수정 완료'}
              </button>
            </div>
          </form>
        ) : (
          <p className={styles.comment}>
            {content}
          </p>
        )}

        {isWriter && !isEditing && (
          <div className={styles.menuWrapper}>
          <button 
            type='button'
            className={styles.menuBtn}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Image
              src={kebabIcon}
              width={24}
              height={24}
              alt='수정 및 삭제'
              loading='eager'
            />
          </button>
          {isMenuOpen && (
            <ul className={styles.menuList}>
              <li>
                <button
                  type='button' 
                  className={styles.menuBtn}
                  onClick={() => {
                    setIsMenuOpen(false)
                    setIsEditing(true)
                  }}
                >
                  수정하기
                </button>
              </li>
              <li>
                <button 
                  type='button'
                  className={styles.menuBtn}
                  onClick={onDelete}
                >
                  삭제하기
                </button>
              </li>
            </ul>
          )}
        </div>
        )}
      </div>
      <div className={styles.info}>
        <Image
          src={profileIcon}
          width={32}
          height={32}
          alt=''
          loading='eager'
        />
        <div>
          <p className={styles.nickname}>
            {comment.writer.nickname}
          </p>
          <p className={styles.date}>
            {formatDate(comment.createdAt)}
          </p>
        </div>
      </div>
    </div>
  )
}