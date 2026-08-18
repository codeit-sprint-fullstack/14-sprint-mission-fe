import inquiryEmptyImg from '@/assets/img_inquiry_empty.png';
import Image from 'next/image';
import CommentCard from './CommentCard';
import styles from './CommentList.module.css';

export default function CommentList({ comments = [], currentUserId, onDelete, onUpdate, isPending }) {
  return (
    <>
      {comments.length === 0 ? (
        <div className={styles.inquriyEmpty}>
           <Image
            src={inquiryEmptyImg}
            width={169}
            height={169}
            alt=''
            loading='eager'
          />
          <p className={styles.emptyMessage}>
            아직 문의가 없어요
          </p>
        </div>
      ) : (
        <ul className={styles.commentList}>
          {comments.map((comment) => {
            const isWriter =
              currentUserId === comment.writer.id;

            return (
              <li key={comment.id}>
                <CommentCard
                  comment={comment}
                  isWriter={isWriter}
                  onDelete={() => onDelete(comment.id)}
                  onUpdate={(content) => onUpdate(comment.id, content)}
                  isPending={isPending}
                />
              </li>
            );
          })}
        </ul>
      )}
    </>
  )
}
