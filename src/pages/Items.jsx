import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useProductList from '../../models/useProductList.js';

function Items() {
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [orderBy, setOrderBy] = useState('recent');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { products, loading, totalPages } = useProductList(currentPage, keyword, orderBy);


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
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setCurrentPage(1);
                  setKeyword(searchInput);
                }
              }}
            />
            <Link to="/registration" className="addItemBtn">상품 등록하기</Link>

            <div className="dropdown">
  <button className="dropdownBtn" onClick={() => setIsDropdownOpen((prev) => !prev)}>
    {orderBy === 'recent' ? '최신순' : '좋아요순'} ▼
  </button>
  {isDropdownOpen && (
    <ul className="dropdownMenu">
      <li onClick={() => { setOrderBy('recent'); setCurrentPage(1); setIsDropdownOpen(false); }}>최신순</li>
      <li onClick={() => { setOrderBy('favorite'); setCurrentPage(1); setIsDropdownOpen(false); }}>좋아요순</li>
    </ul>
  )}
</div>
          </div>

          {loading ? (
            <div>로딩 중...</div>
          ) : (
            <div className="itemsGrid">
              {products.map((product) => (
                <div className="itemCard" key={product.id}>
                  <img src="/img/default_items_img.png"/>
                  <p className="itemName">{product.name}</p>
                  <p className="itemPrice">{product.price.toLocaleString()}원</p>
                  <p className="itemFavorite">♡ {product.favoriteCount}</p>
                </div>
              ))}
            </div>
          )}

          <div className="pagination">
            <button
              className="pageBtn"
              onClick={() => setCurrentPage((p) => Math.max(p - 5, 1))}
              disabled={currentPage === 1}
            >
              &laquo;
            </button>
            <button
              className="pageBtn"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => page >= currentPage - 0 && page <= currentPage + 4)
              .map((page) => (
                <button
                  key={page}
                  className={`pageBtn${currentPage === page ? ' active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
            <button
              className="pageBtn"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
            <button
              className="pageBtn"
              onClick={() => setCurrentPage((p) => Math.min(p + 5, totalPages))}
              disabled={currentPage === totalPages}
            >
              &raquo;
            </button>
          </div>

        </div>
      </div>

      <div className="footer">
        <div className="inner">
          <div className="footerLeft">codeit-2024</div>
          <div className="footerCenter">
            <a className="footerLink" href="/privacy">Privacy Policy</a>
            <a className="footerLink" href="/faq">FAQ</a>
          </div>
          <div className="footerRight">
            <a className="snsLink" href="https://www.facebook.com" target="_blank" rel="noreferrer">
              <img src="/img/ic_facebook.png" alt="페이스북" />
            </a>
            <a className="snsLink" href="https://www.twitter.com" target="_blank" rel="noreferrer">
              <img src="/img/ic_twitter.png" alt="트위터" />
            </a>
            <a className="snsLink" href="https://www.youtube.com" target="_blank" rel="noreferrer">
              <img src="/img/ic_youtube.png" alt="유튜브" />
            </a>
            <a className="snsLink" href="https://www.instagram.com" target="_blank" rel="noreferrer">
              <img src="/img/ic_instagram.png" alt="인스타그램" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Items;