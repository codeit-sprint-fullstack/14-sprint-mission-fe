import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import searchIcon from "../../assets/ic_search.png";
import arrowDownIcon from "../../assets/ic_arrow_down.png";
import sortIcon from "../../assets/ic_sort.png";
import "./MarketPage.css";

function MarketPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [productPageSize, setProductPageSize] = useState(10);

  useEffect(() => {
    function updatePageSize() {
      const width = window.innerWidth;

      if (width <= 480) {
        setProductPageSize(4);
      } else if (width <= 768) {
        setProductPageSize(6);
      } else {
        setProductPageSize(10);
      }

      setPage(1);
    }

    updatePageSize();

    window.addEventListener("resize", updatePageSize);

    return () => {
      window.removeEventListener("resize", updatePageSize);
    };
  }, []);

  useEffect(() => {
    async function getProducts() {
      setIsLoading(true);
      setError(null);

      try {
        const offset = (page - 1) * productPageSize;

        let keywordQuery = "";

        if (keyword) {
          keywordQuery = `&keyword=${encodeURIComponent(keyword)}`;
        }

        const productRes = await fetch(
          `http://localhost:3000/products?offset=${offset}&limit=${productPageSize}${keywordQuery}`
        );

        if (!productRes.ok) {
          throw new Error('상품 목록을 불러오지 못했습니다.');
        }

        const productData = await productRes.json();

        setProducts(productData.list);
        setTotalCount(productData.totalCount);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getProducts();
  }, [page, keyword, productPageSize]);

  return (
    <main className="market-page">
      <div className="market-content">
        <section className="all-section">
          <div className="all-section-header">
            <h2 className="section-title">판매 중인 상품</h2>

            <div className="search-box">
              <img
                className="search-icon"
                src={searchIcon}
                alt="검색 아이콘"
              />

              <input
                className="search-input"
                type="text"
                placeholder="검색할 상품을 입력해주세요"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setKeyword(searchInput.trim());
                    setPage(1);
                  }
                }}
              />
            </div>

            <button
              className="add-product-button"
              onClick={() => navigate("/registration")}
            >
              상품 등록하기
            </button>

            <div className="sort-select-box">
              <select
                className="sort-select"
                value="recent"
                onChange={() => { }}
              >
                <option value="recent">최신순</option>
              </select>

              <img
                className="select-arrow-icon"
                src={arrowDownIcon}
                alt="화살표 아이콘"
              />

              <img
                className="sort-mobile-icon"
                src={sortIcon}
                alt="정렬 아이콘"
              />
            </div>
          </div>

          {isLoading && (
            <p className="product-status-text">
              상품을 불러오는 중입니다...
            </p>
          )}

          {error && (
            <p className="product-status-text">
              {error}
            </p>
          )}

          {!isLoading && !error && (
            <div className="all-product-list">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      <Pagination
        page={page}
        totalCount={totalCount}
        pageSize={productPageSize}
        onPageChange={setPage}
      />
    </main>
  );
}

export default MarketPage;