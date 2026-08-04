import Link from 'next/link';
import Image from 'next/image';
import defaultIcon from '@/assets/img_default.svg';
import heart from '@/assets/ic_heart.png'
import formatDate from '@/utils/formatDate';

export default function ArticleCard({ article }) {
  return (
    <Link href={`/articles/${article.id}`}>
      <p>{article.title}</p>
      <div>
        <Image
          src={defaultIcon} 
          width={72}
          height={72}
          loading='eager'
          alt={article.title}
        />
        <p>{article.nickname || '총명한 판다'}</p>
        <div>
          <Image 
            src={heart}
            width={20}
            height={17}
            loading='eager'
            alt='좋아요 수'
          />
          <p>{article.fav || 0}</p>
        </div>
        <p>{formatDate(article.createdAt)}</p>
      </div>
    </Link>
  )
}