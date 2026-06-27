import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard";
import "./ProductList.css";
import searchImg from "../assets/searchImg.svg";

function getPageSizeByWidth() {
  const width = window.innerWidth;

  if (width <= 767) {
    return 4;
  }

  if (width <= 1024) {
    return 6;
  }

  return 10;
}

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [orderBy, setOrderBy] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageGroup, setPageGroup] = useState(1);
  const [pageSize, setPageSize] = useState(getPageSizeByWidth);

  const pageGroupSize = 5;

  useEffect(() => {
    function handleResize() {
      const nextPageSize = getPageSizeByWidth();

      setPageSize((prevPageSize) => {
        if (prevPageSize === nextPageSize) {
          return prevPageSize;
        }

        setCurrentPage(1);
        setPageGroup(1);

        return nextPageSize;
      });
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    async function getProducts() {
      const offset = (currentPage - 1) * pageSize;

      const response = await axios.get(
        `http://localhost:3000/products?offset=${offset}&limit=${pageSize}&sort=${orderBy}`
      );

      setProducts(response.data.list);
      setTotalCount(response.data.totalCount);
    }

    getProducts();
  }, [orderBy, currentPage, pageSize]);

  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchText.toLowerCase());
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (orderBy === "favorite") {
      return b.favoriteCount - a.favoriteCount;
    }

    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const totalPages = Math.ceil(totalCount / pageSize);
  const totalPageGroups = Math.ceil(totalPages / pageGroupSize);

  const startPage = (pageGroup - 1) * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

  const pageNumbers = Array.from(
    { length: Math.max(endPage - startPage + 1, 0) },
    (_, index) => startPage + index
  );

  function handleOrderChange(e) {
    setOrderBy(e.target.value);
    setCurrentPage(1);
    setPageGroup(1);
  }

  function handleSearchChange(e) {
    setSearchText(e.target.value);
    setCurrentPage(1);
    setPageGroup(1);
  }

  function handlePrevPageGroup() {
    const nextPageGroup = pageGroup - 1;
    const nextPage = (nextPageGroup - 1) * pageGroupSize + 1;

    setPageGroup(nextPageGroup);
    setCurrentPage(nextPage);
  }

  function handleNextPageGroup() {
    const nextPageGroup = pageGroup + 1;
    const nextPage = (nextPageGroup - 1) * pageGroupSize + 1;

    setPageGroup(nextPageGroup);
    setCurrentPage(nextPage);
  }

  return (
    <>
      <div className="product-list-header">
        <h3 className="list-title">판매중인 상품</h3>

        <div className="product-list-controls">
          <div className="search-box">
            <img
              className="maginifier-img"
              src={searchImg}
              alt="돋보기 이미지"
            />

            <input
              className="search-input"
              placeholder="검색할 상품을 입력해주세요"
              value={searchText}
              onChange={handleSearchChange}
            />
          </div>

          <Link to='/registration' className="register-button">상품 등록하기</Link>

          <select
            className="order-select"
            value={orderBy}
            onChange={handleOrderChange}
          >
            <option value="recent">최신순</option>
            <option value="favorite">좋아요순</option>
          </select>
        </div>
      </div>

      <div className="items">
        {sortedProducts.map((product) => {
          return <ProductCard key={product._id || product.id} product={product} />;
        })}
      </div>

      <div className="pagination">
        <button
          className="button"
          onClick={handlePrevPageGroup}
          disabled={pageGroup === 1}
        >
          &lt;
        </button>

        {pageNumbers.map((pageNumber) => {
          return (
            <button
              className={`button ${
                currentPage === pageNumber ? "active" : ""
              }`}
              key={pageNumber}
              onClick={() => {
                setCurrentPage(pageNumber);
              }}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          className="button"
          onClick={handleNextPageGroup}
          disabled={pageGroup === totalPageGroups || totalPageGroups === 0}
        >
          &gt;
        </button>
      </div>
    </>
  );
}

export default ProductList;
