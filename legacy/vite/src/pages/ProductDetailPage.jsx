import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';
import { getProduct } from '../services/pandaApi.js';

const FALLBACK_IMAGE = '/images/Img_home_01.png';

function formatPrice(price) {
  return `${Number(price || 0).toLocaleString('ko-KR')}원`;
}

function formatDate(value) {
  if (!value) {
    return '';
  }

  return new Date(value).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    setError('');
    getProduct(productId)
      .then((response) => {
        if (!ignore) {
          setProduct(response);
        }
      })
      .catch((requestError) => {
        if (!ignore) {
          setError(requestError.message || '상품을 불러오지 못했습니다.');
        }
      });

    return () => {
      ignore = true;
    };
  }, [productId]);

  return (
    <div className="product-detail-page">
      <Header logoMode="market" />
      <main className="product-detail-main">
        {error ? <p className="board-status">{error}</p> : null}
        {product ? (
          <article className="product-detail">
            <div className="product-detail__image-wrap">
              <img
                src={product.image || FALLBACK_IMAGE}
                alt={product.name}
                onError={(event) => {
                  event.currentTarget.src = FALLBACK_IMAGE;
                }}
              />
            </div>
            <div className="product-detail__content">
              <p className="product-detail__date">{formatDate(product.createdAt)}</p>
              <h1>{product.name}</h1>
              <p className="product-detail__price">{formatPrice(product.price)}</p>
              <p className="product-detail__description">{product.description}</p>
              {product.tags?.length ? (
                <div className="product-detail__tags" aria-label="상품 태그">
                  {product.tags.map((tag) => <span key={tag}>#{tag}</span>)}
                </div>
              ) : null}
            </div>
          </article>
        ) : null}
        <Link className="article-back-link" to="/items">목록으로 돌아가기 <span aria-hidden="true">↩</span></Link>
      </main>
      <Footer />
    </div>
  );
}

export default ProductDetailPage;
