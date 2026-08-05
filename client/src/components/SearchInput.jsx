'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import searchIcon from '@/assets/ic_search.png';
import styles from './SearchInput.module.css';

export default function SearchInput({ type = 'text', placeholder}) {
  const router = useRouter();
  const [value, setValue] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (!value) {
      router.push('/articles')
      return;
    }

    const encodedValue = encodeURIComponent(value);
    router.push(`/articles?keyword=${encodedValue}`)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.inputForm}>
      <button className={styles.inputIcon}>
        <Image
          src={searchIcon}
          width={24}
          height={24}
          loading='eager'
          alt='검색 아이콘'
        />
      </button>
      <input
        className={styles.input}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder} />
    </form>
  )
}