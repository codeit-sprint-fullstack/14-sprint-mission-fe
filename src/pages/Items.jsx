import { useState, useEffect } from 'react';
import { getProductList } from '../../services/ProductService.js';

function Items() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProductList(1, 10, '')
      .then((data) => {
        setProducts(data.list);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <>
      <div className="hero">
        <div className="inner">
          <div>
            <h1>일상의 모든 물건을<br />거래해 보세요</h1>
            <button className="shopButton">구경해보러 가기</button>
          </div>
          <img className="heroImage" src="/img/panda_home.png" alt="판다 홈 이미지" />
        </div>
      </div>

      <div className="main">
        <div className="inner">
          <div className="featureSection">
            <h2>Hot Item</h2>
            <p>인기 상품을 확인해 보세요</p>
          </div>

          <div className="itemsGrid">
            {products.map((product) => (
              <div className="itemCard" key={product.id}>
                <img src={product.images?.[0] ?? '/img/panda_logo.png'} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="price">{product.price.toLocaleString()}원</p>
              </div>
            ))}
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