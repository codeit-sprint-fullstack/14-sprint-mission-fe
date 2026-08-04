'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import kebabIcon from '@/assets/ic_kebab.png';

export default function ArticleMenu({ articleId }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button type='button' onClick={() => setIsOpen(!isOpen)}>
        <Image 
          src={kebabIcon}
          width={20}
          height={20}
          loading='eager'
          alt='게시글 설정'
        />
      </button>

      {isOpen &&
        <ul>
          <li>
            <Link href={`/articles/${articleId}/edit`}>수정하기</Link>
          </li>
          <li>삭제하기</li>
        </ul>
      }
    </div>
  )
}