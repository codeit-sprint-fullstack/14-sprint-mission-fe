import checkIcon from '@/assets/ic_check_red.png';
import Image from 'next/image';
import styles from './ConfirmModal.module.css';

export default function ConfirmModal({ message, onCancel, onDelete, isPending , isError}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Image
          src={checkIcon}
          width={24}
          height={24}
          alt=''
          loading='eager'
        />
        <p className={styles.message}>
          {message}
        </p>
        {isError ? (
          <button
            type='button'
            className={styles.cancelBtn}
            onClick={onCancel}
          >
            확인
          </button>
        ) : (
          <div className={styles.btns}>
            <button 
              type='button'
              className={styles.cancelBtn}
              onClick={onCancel}
              disabled={isPending}
            >
              취소
            </button>
            <button 
              type='button'
              className={styles.confirmBtn}
              onClick={onDelete}
              disabled={isPending}
            >
              {isPending ? '삭제 중...' : '네'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}