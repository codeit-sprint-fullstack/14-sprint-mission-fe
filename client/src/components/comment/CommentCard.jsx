'use client';

import Image from 'next/image';
import { useState } from 'react';
import { deleteComment, updateComment } from '@/actions/commentActions';
import formatTime from '@/utils/formatTime';
import EditDeleteMenu from '../EditDeleteMenu';
import profileIcon from '@/assets/ic_profile.png';
import styles from './CommentCard.module.css';
import CommentForm from './CommentForm';

export default function CommentCard({ articleId, comment }) {
  const [isEditing, setIsEditing] = useState(false);

  async function handleDeleteComment() {
    await deleteComment(articleId, comment.id);
  }

  // 수정할 댓글에 해당하는 게시글 ID, 댓글 ID 미리 전달
  const updateCommentWithIds =
    updateComment.bind(null, articleId, comment.id);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {isEditing ? (
          <CommentForm
            action={updateCommentWithIds}
            initialContent={comment.content}
            submitBtnText='수정 완료'
            onSuccess={() => setIsEditing(false)}
            onCancel={() => setIsEditing(false)}
            variant='editComment'
          />
        ) : (
          <p className={styles.content}>
            {comment.content}
          </p>
        )}
        {!isEditing && (
          <EditDeleteMenu
            onEdit={() => setIsEditing(true)}
            onDelete={handleDeleteComment}
          />
        )}
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