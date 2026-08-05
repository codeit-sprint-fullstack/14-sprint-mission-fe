import { useState } from 'react';
import { Link } from 'react-router-dom';
import useProductList from '../../models/useProductList.js';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import SortDropdown from '../components/SortDropdown';
import Pagination from '../components/Pagination';

function Items() {
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [orderBy, setOrderBy] = useState('recent');

  const { products, loading, totalPages } = useProductList(currentPage, keyword, orderBy);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setCurrentPage(1);
      setKeyword(searchInput);
    }
  };

  const handleSortChange = (value) => {
    setOrderBy(value);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="main">
        <div className="inner">

          <div className="sectionHeader">
            <h2 className="sectionTitle">판매 중인 상품</h2>
            <input
              className="searchInput"
              type="text"
              placeholder="검색할 상품을 입력하세요"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearch}
            />
            <Link to="/registration" className="addItemBtn">상품 등록하기</Link>
            <SortDropdown orderBy={orderBy} onChange={handleSortChange} />
          </div>

          {loading ? (
            <div>로딩 중...</div>
          ) : (
            <div className="itemsGrid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Items;
