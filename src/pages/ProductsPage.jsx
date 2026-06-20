import { useEffect, useMemo, useState } from 'react';
import { getProductList } from '../services/pandaApi.js';

const fallbackProducts = [
  { id: 'fallback-1', name: '판다마켓 샘플 상품', price: 10000, description: '상품 API 연결 전에도 화면을 확인할 수 있는 샘플입니다.' },
  { id: 'fallback-2', name: '중고 거래 상품', price: 25000, description: '실제 API 응답이 오면 이 목록은 자동으로 교체됩니다.' },
];

function normalizeProducts(data) {
  if (Array.isArray(data)) {
    return data;
  }

  return data?.list || data?.products || data?.items || [];
}

function ProductsPage() {
  const [status, setStatus] = useState('loading');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    getProductList({ page: 1, pageSize: 8 })
      .then((data) => {
        if (ignore) {
          return;
        }

        const nextProducts = normalizeProducts(data);
        setProducts(nextProducts.length ? nextProducts : fallbackProducts);
        setStatus('ready');
      })
      .catch((requestError) => {
        if (ignore) {
          return;
        }

        setError(requestError.message);
        setProducts(fallbackProducts);
        setStatus('ready');
      });

    return () => {
      ignore = true;
    };
  }, []);

  const statusLabel = useMemo(() => {
    if (status === 'loading') {
      return '상품을 불러오는 중입니다.';
    }

    if (error) {
      return `API 연결 실패: ${error}`;
    }

    return `상품 ${products.length}개`;
  }, [error, products.length, status]);

  return (
    <section className="content-width min-h-[calc(100vh-70px)] py-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-lg font-bold text-primary">Products</p>
          <h1 className="mt-2 text-4xl font-bold leading-tight text-gray-800">상품 둘러보기</h1>
        </div>
        <p className={`text-sm font-medium ${error ? 'text-error' : 'text-gray-500'}`}>{statusLabel}</p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => {
          const image = product.images?.[0] || product.image || '/images/Img_home_01.png';
          const price = typeof product.price === 'number' ? product.price.toLocaleString('ko-KR') : product.price;

          return (
            <article key={product.id || product.name} className="overflow-hidden rounded-lg border border-gray-200 bg-white">
              <div className="aspect-square bg-gray-100">
                <img
                  className="h-full w-full object-cover"
                  src={image}
                  alt={product.name || '상품 이미지'}
                  onError={(event) => {
                    event.currentTarget.src = '/images/Img_home_01.png';
                  }}
                />
              </div>
              <div className="space-y-2 p-4">
                <h2 className="line-clamp-2 min-h-12 font-semibold leading-6 text-gray-800">
                  {product.name || product.title || '이름 없는 상품'}
                </h2>
                {price ? <p className="text-lg font-bold text-primary">{price}원</p> : null}
                {product.description ? (
                  <p className="line-clamp-2 text-sm leading-6 text-gray-500">{product.description}</p>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default ProductsPage;
