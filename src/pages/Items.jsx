import { useState, useEffect } from 'react';
import { getProductList } from '../../services/ProductService.js';

function Items() {
  const [bestProducts, setBestProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductList(1, 4, 'favorite', '')
      .then((data) => setBestProducts(data.list))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    setLoading(true);
    getProductList(currentPage, 10, 'recent', '')
      .then((data) => {
        setProducts(data.list);
        setTotalPages(Math.ceil(data.totalCount / 10));
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [currentPage]);

  return (
    <>
      <div className="main">
        <div className="inner">

          <h2 className="sectionTitle">베스트 상품</h2>
          <div className="bestGrid">
            {bestProducts.map((product) => (
              <div className="itemCard" key={product.id}>
                <img src={product.images?.[0] ?? '/img/panda_logo.png'} alt={product.name} />
                <p className="itemName">{product.name}</p>
                <p className="itemPrice">{product.price.toLocaleString()}원</p>
                <p className="itemFavorite">♡ {product.favoriteCount}</p>
              </div>
            ))}
          </div>

          <h2 className="sectionTitle">판매 중인 상품</h2>
          {loading ? (
            <div>로딩 중...</div>
          ) : (
            <div className="itemsGrid">
              {products.map((product) => (
                <div className="itemCard" key={product.id}>
                  <img src={product.images?.[0] ?? '/img/panda_logo.png'} alt={product.name} />
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