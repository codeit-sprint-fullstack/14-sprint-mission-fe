import { useParams } from "react-router-dom";
import "./ProductDetailPage.css";

function ProductDetailPage() {
  const { id } = useParams();

  return (
    <main className="product-detail-page">
      <h1>상품 상세 페이지</h1>
      <p>상품 ID: {id}</p>
    </main>
  );
}

export default ProductDetailPage;