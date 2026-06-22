import { useState, useEffect } from "react";
import { getProductList } from "../js/ProductService";

import "../styles/ProductList.css";

export default function ProductList() {
  const [sort, setSort] = useState("최신순");
  const [orderBy, setOrderBy] = useState("recent");

  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const pageSize = windowWidth < 768 ? 4 : windowWidth < 1024 ? 6 : 10;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function loadProductLists() {
      const data = await getProductList({
        page: 1,
        pageSize,
        orderBy,
        keyword,
      });
      console.log(data.list);

      setProducts(data.list);
    }
    loadProductLists();
  }, [orderBy, keyword, pageSize]);

  return (
    <section className="products-list">
      <div className="products-header">
        <h2 className="products-title">판매 중인 상품</h2>

        <div className="products-controls">
          <div className="search-register-group">
            <div className="search-box">
              <img
                src="/images/icons/ic_search.svg"
                alt=""
                className="search-icon"
              />
              <input
                type="text"
                placeholder="검색할 상품을 입력해주세요"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>

            <button className="register-button">상품 등록하기</button>
          </div>

          <div className="sort-wrapper">
            <button className="sort-button" onClick={() => setIsOpen(!isOpen)}>
              {sort}
              <img src="/images/icons/ic_arrow_down.svg" alt="" />
            </button>

            {isOpen && (
              <ul className="sort-dropdown">
                <li
                  onClick={() => {
                    setSort("최신순");
                    setOrderBy("recent");
                    setIsOpen(false);
                  }}
                >
                  최신순
                </li>

                <li
                  onClick={() => {
                    setSort("좋아요순");
                    setOrderBy("favorite");
                    setIsOpen(false);
                  }}
                >
                  좋아요순
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="product-image"
            />

            <div className="product-info">
              <p className="product-name">{product.name}</p>

              <strong className="product-price">
                {product.price.toLocaleString()}원
              </strong>

              <div className="product-favorite">
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
