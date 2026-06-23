import { useEffect, useState } from "react";
import { getProductList } from "../js/ProductService";

import "../styles/BestProducts.css";

function BestProducts() {
  const [products, setProducts] = useState([]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const pageSize = windowWidth < 768 ? 1 : windowWidth < 1024 ? 2 : 4;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function loadProducts() {
      const data = await getProductList({
        page: 1,
        pageSize,
        orderBy: "favorite",
        keyword: "",
      });

      console.log("전체 데이터", data);

      if (data) {
        console.log("첫 번째 상품", data.list?.[0]);
        setProducts(data.list);
      }
    }

    loadProducts();
  }, [pageSize]);

  return (
    <section className="best-products">
      <h2 className="best-title">베스트 상품</h2>

      <div className="best-product-grid">
        {products.map((product) => (
          <div key={product.id} className="best-product-card">
            <img
              className="best-product-image"
              src={product.images?.[0]}
              alt={product.name}
            />

            <div className="best-product-info">
              <p className="best-product-name">{product.name}</p>

              <strong className="best-product-price">
                {product.price.toLocaleString()}원
              </strong>

              <div className="best-product-favorite">
                <img src="/images/icons/ic_heart.svg" alt="좋아요" />
                <span>{product.favoriteCount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BestProducts;
