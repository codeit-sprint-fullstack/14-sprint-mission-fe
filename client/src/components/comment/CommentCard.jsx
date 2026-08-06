'use client';

import Image from 'next/image';
import { useState } from 'react';
import { deleteComment, updateComment } from '@/actions/commentActions';
import formatTime from '@/utils/formatTime';
import EditDeleteMenu from '../EditDeleteMenu';
import profileIcon from '@/assets/ic_profile.png';
import styles from './CommentCard.module.css';

export default function CommentCard({ articleId, comment }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.content);
  const updateCommentWithIds =
    updateComment.bind(null, articleId, comment.id);

  async function handleDeleteComment() {
    await deleteComment(articleId, comment.id);
  }

  async function handleUpdateComment(formData) {
    await updateCommentWithIds(formData);
    setIsEditing(false);
  }

  function handleEditCancle() {
    setEditedComment(comment.content);
    setIsEditing(false);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {isEditing ? (
          <form action={handleUpdateComment}>
            <textarea 
              name='content'
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
            />
            <button 
              type='button'
              onClick={handleEditCancle}
            >
              취소
            </button>
            <button 
              type='submit'
              disabled={!editedComment.trim()}
            >
              등록
            </button>
          </form>
        ) : (
          <p className={styles.content}>
            {comment.content}
          </p>
        )}
        <EditDeleteMenu
          onEdit={() => setIsEditing(true)}
          onDelete={handleDeleteComment}
        />
      </div>
      <div className={styles.info}>
        <Image
          src={profileIcon} 
          width={32}
          height={32}
          loading='eager'
          alt='프로필 아이콘'
        />
        <div className={styles.infoRight}>
          <p className={styles.nickname}>
            {comment.nickname || '똑똑한판다'}
          </p>
          <p className={styles.date}>
            {formatTime(comment.createdAt)}
          </p>
        </div>
      </div>
    </div>
  )
}