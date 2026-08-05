import Image from 'next/image';
import formatTime from '@/utils/formatTime';
import EditDeleteMenu from '../EditDeleteMenu';
import profileIcon from '@/assets/ic_profile.png';
import styles from './CommentCard.module.css';

export default function CommentCard({ comment }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <p className={styles.content}>
          {comment.content}
        </p>
        <EditDeleteMenu />
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