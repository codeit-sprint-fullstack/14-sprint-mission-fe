'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import searchIcon from '@/assets/ic_search.png'

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
    <form onSubmit={handleSubmit}>
      <button>
        <Image
          src={searchIcon}
          width={15}
          height={15}
          loading='eager'
          alt='검색 인풋'
        />
      </button>
      <input 
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder} />
    </form>
  )
}