'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import kebabIcon from '@/assets/ic_kebab.png';
import styles from './EditDeleteMenu.module.css';

export default function EditDeleteMenu({ articleId }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.menuBtn} 
        type='button' 
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image 
          src={kebabIcon}
          width={24}
          height={24}
          loading='eager'
          alt='게시글 설정'
        />
      </button>

      {isOpen &&
        <ul className={styles.menu}>
          <li className={styles.menuList}>
            <Link href={`/articles/${articleId}/edit`} className={styles.editLink}>
              수정하기
            </Link>
          </li>
          <li className={styles.menuList}>
            삭제하기
          </li>
        </ul>
      }
    </div>
  )
}