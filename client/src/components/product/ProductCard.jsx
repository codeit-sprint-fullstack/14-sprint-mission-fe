import Image from 'next/image';
import defaultImg from '@/assets/img_default.svg';
import heartIcon from '@/assets/ic_heart.png';

export default function ProductCard({ product }) {
  return (
    <div>
      <Image
        src={defaultImg}
        width={220}
        height={220}
        alt={product.name}
      />
      <p>
        {product.name}
      </p>
      <p>
        {product.price}원
      </p>
      <div>
        <Image
          src={heartIcon}
          width={16}
          height={16}
        />
        <p>
          {product.fav || 0}
        </p>
      </div>
    </div>
  )
}