import { useParams } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';

function ProductDetailPage() {
  const { productId } = useParams();

  return (
    <div className="product-detail-page">
      <Header logoMode="market" />
      <main className="product-detail-main" aria-label="상품 상세">
        <span className="sr-only">상품 상세 페이지 {productId}</span>
      </main>
      <Footer />
    </div>
  );
}

export default ProductDetailPage;
