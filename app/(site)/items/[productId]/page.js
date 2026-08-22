import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import SafeImage from '@/components/SafeImage';
import { getProduct } from '@/lib/external-api';

export const dynamic = 'force-dynamic';

const getCachedProduct = cache((productId) => getProduct(productId));

function formatPrice(price) {
  return `${Number(price || 0).toLocaleString('ko-KR')}원`;
}

function formatDate(value) {
  if (!value) return '';
  return new Date(value).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

export async function generateMetadata({ params }) {
  const { productId } = await params;
  const product = await getCachedProduct(productId);

  if (!product) return { title: '상품을 찾을 수 없습니다' };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }) {
  const { productId } = await params;
  const product = await getCachedProduct(productId);

  if (!product) notFound();

  return (
    <main className="product-detail-main">
      <article className="product-detail">
        <div className="product-detail__image-wrap">
          <SafeImage src={product.image} alt={product.name} />
        </div>
        <div className="product-detail__content">
          <p className="product-detail__date">{formatDate(product.createdAt)}</p>
          <h1>{product.name}</h1>
          <p className="product-detail__price">{formatPrice(product.price)}</p>
          <p className="product-detail__description">{product.description}</p>
          {product.tags.length ? (
            <div className="product-detail__tags" aria-label="상품 태그">
              {product.tags.map((tag) => <span key={tag}>#{tag}</span>)}
            </div>
          ) : null}
        </div>
      </article>
      <Link className="article-back-link" href="/items">목록으로 돌아가기 <span aria-hidden="true">↩</span></Link>
    </main>
  );
}
