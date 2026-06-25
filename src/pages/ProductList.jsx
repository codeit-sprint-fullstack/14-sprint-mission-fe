import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProductList } from "../js/ProductService";
import { useWindowWidth } from "../hooks/useWindowWidth";

import "../styles/ProductList.css";

export default function ProductList() {
  const [sort, setSort] = useState("최신순");
  const [orderBy, setOrderBy] = useState("recent");
  const windowWidth = useWindowWidth();

  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");

  const [page, setPage] = useState(1);
  const [totalCount, SetTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const pageSize = windowWidth < 768 ? 4 : windowWidth < 1024 ? 6 : 10;

  const totalPages = Math.ceil(totalCount / pageSize);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500);
    return () => clearTimeout(timer);
  }, [keyword]);

  useEffect(() => {
    async function loadProductLists() {
      setIsLoading(true);
      setError(null);
      try {
      const data = await getProductList({
        page,
        pageSize,
        orderBy,
        keyword: debouncedKeyword,
      });
      console.log(data.list);

      setProducts(data.list);
      SetTotalCount(data.totalCount);
    }catch (e) {
      setError("상품을 불러오는데 실패했습니다.");
    }
    finally {
      setIsLoading(false);
    }
  }
    loadProductLists();
  }, [orderBy, debouncedKeyword, pageSize, page]);

  useEffect(() => {
    setPage(1);
  }, [orderBy, debouncedKeyword, pageSize]);

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

            <button className="register-button" onClick={() => navigate("/registration")}>상품 등록하기</button>
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

      {isLoading && <p>로딩중 ...</p>}
      {error && <p>{error}</p>}
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
      <div className="pagenation">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).filter((p) => {
          const start = Math.floor((page - 1) / 5) * 5 + 1;
          return p >= start && p < start + 5;
        })
        .map((p) => (
          <button key={p} onClick={() => setPage(p)} className={p === page ? "active" : ""}>{p}</button>
        ))}
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          &gt;
        </button>
      </div>
    </section>
  );
}
